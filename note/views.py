#coding:utf-8
from cgi import escape
from django.core import serializers
from django.http import Http404, HttpResponse
from django.shortcuts import render
from django.template import loader, Context, RequestContext
from django.views.generic import DetailView, ListView
from django.views.generic.simple import redirect_to
from note.mod import mods, mod_sum, Mod
from note.models import Note, Piece
import json
import logging as log
 
log.basicConfig(level=log.INFO)

#  decorators  begin
#--- login-check---
def login_check(func):
    def wrapper(request):
        print(func)
        return func(request)

    return wrapper
#--- headers ---
def headers(conf):
    def wrap_response(func):
        print(str(conf))
        def wrapper(request):
            print(func)
            return func(request)
        return wrapper
    return wrap_response

# decorator 
def add_with_preprocess(template_url, detail_url_template):
    """
	add 操作 post 和 get
    """
    def decorator(func):
        def wrapper(request, *args):
            template = template_url
            if 'request' in request.GET:
                if 'ajax' == request.GET['request']:
                    #template_url = template_url
                    template = 'json.html'
                    ajax = True
            if request.method == 'GET':
                blank_note = {'topic':"新主题", 'note_type':'0', 'content':'编辑内容'}
                return render(request, template, {'note':blank_note})
            if request.method == 'POST':
                obj = func(request, *args)
                if ajax:
                    return render(request,template,{'data':obj,'status':'ok'})
                return redirect_to(request, detail_url_template.replace('{id}', str(obj.id)))
        return wrapper
    return decorator

def edit_with_preprocess(before_template_url, detail_url_template):
    """
    
    """
    def decorator(func):
        def wrapper(request, pk):
            if request.method == 'GET':
                obj = Note.objects.get(id=pk)
                return render(request, before_template_url, {'note':obj})
            elif request.method == 'POST':
                func(request, pk)
                return redirect_to(request, detail_url_template.replace('{id}', str(pk)))
        return wrapper
    return decorator


#decorators end

def doudou(request):
    return HttpResponse([i for i in request.GET.iteritems()])

# 定位笔记
def note_id(request,note_id):
    note = Note.objects.filter(id=note_id)
    c = {}
    if len(note)==0:
        tpl = "note_404.html"
        c["note"] = { "id":note_id }
    else:
        tpl = "note_detail_text.html"
        c["note"] = note[0]
        
    
    t = loader.get_template( tpl  )
    req_c = RequestContext( request , c )
    req_c.autoescape=False
    return HttpResponse( t.render(req_c))
# 查询主题 笔记主页
""" 被 generic view 代替，但是当需要其他逻辑的时候还是需要generic view的实例
@login_check
@headers({'name':'jianpugang'})
def note_home(request):
    
    t = loader.get_template("note-list.html")
    notes = Note.objects.order_by("-id")[:10]
    c = RequestContext(
        request,  
        { 
            'notes':notes,
            }
        )
    return HttpResponse( t.render(c))
"""
def list_note(request):
    notes = Note.objects.order_by("-id")[:10]
    return HttpResponse( 
        json.dumps(
            list( notes ),
            default=lambda o :[o.id,o.topic] 
            ),
        mimetype='text/json'
        )

# 查询主题 json
def query_topic(request):
    q = request.POST if request.POST else request.GET
    notes = Note.objects.filter(topic__contains=q['name']).order_by("-id")[:10]
    notes_list = list(notes)
    json_str = escape( json.dumps( notes_list,default=lambda o:[o.id,o.topic]))
    return HttpResponse( 
        json_str,
        mimetype='text/json'
        )
# 查询笔记
def note_topic(request,topic):
    notes = Note.objects.filter(topic=topic).order_by("-id")[:10]
    t = loader.get_template("notes.html")
    c = RequestContext(request,{ 'notes':notes})
    return HttpResponse( t.render(c))
# 保存笔记 add or update
def save_note(request):
    q  = request.POST if request.POST else request.GET
    resp  = {}
        
    if 'id' in q:
        note =  Note.objects.filter(id=q['id'])[0]
        for f in ['content','topic']:
            if f in q:
                setattr(note,f,q[f])
        note.save()
    else :
        note = Note.objects.create(
            content = q['content'],
            topic = q['topic'],
            note_type="0" );
        resp['id'] = note.id
    return HttpResponse( json.dumps(resp) )
#创建新笔记
@add_with_preprocess('note_detail_text.html','/note/{id}/')
def add_note(request):
    note = Note.objects.create(
            content = request.POST['content'],
            topic = request.POST['topic'],
            note_type="0" );
    return note

@edit_with_preprocess('note_detail_text.html','/note/{id}/')
def edit_note(request, pk):
    note = Note.objects.get(id=pk)
    for i in ['topic', 'content']:
        setattr(note, i, request.POST[i])
    note.save()
    return note
 
def query_micro(request):
    pieces = Piece.objects.all().order_by("-id")[:10]
    pieces_list = list(pieces)
    json_str = ( 
        json.dumps(
            pieces_list,
            default=lambda o :[o.id,o.topic,o.word] 
            ))
    return HttpResponse( 
        escape(json_str),
        mimetype="text/json"
        )

def add_micro(request):
    q = request.POST
    piece = Piece(
        topic = q["topic"],
        word = q["word"]
        )
    piece.save()
    return HttpResponse("{}")

def topic_micro( request,**kw ):
    topic_name = kw["topic"]
    pieces  = Piece.objects.filter( topic = topic_name)
    json_str = json.dumps( 
        list(pieces),
        default = lambda o : [o.id,o.topic,o.word,str(o.ptime)]
        )
    
    t = loader.get_template("micro-topic.html")
    note_mods = ( mods['basic']+mods['head'] + mods["footer"]) 
    c = RequestContext(
        request,  
        { 
            "mods":note_mods.to_template(
                {
                    "title":"秦木工的微笔记",
                    "menu":[("笔记","/note/")],
                    "person_info":[("qinmugong","#"),("消息","#"),("设置","#"),]
                    }) ,
            "micro":escape(json_str)
            } )
    return HttpResponse( t.render(c) )


def date_micro(request, **kw):
    return HttpResponse("yy")


class TryView(ListView):
    
    model = Piece
    def get_queryset(self):
        return ListView.get_queryset(self)
    
    def get_context_data(self, **kwargs):
        context = super(TryView, self).get_context_data(**kwargs)
        context['micros'] = Piece.objects.order_by('-id')[:10]
        return context
