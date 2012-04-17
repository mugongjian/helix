#coding:utf-8
from django.http import HttpResponse
from note.models import (Note,Piece)
from django.template import (loader,Context,RequestContext)

from django.shortcuts import render_to_response as r2r
from django.http import Http404
from note.mod import (mods,mod_sum,Mod)
import json
from django.core import serializers 
from cgi import escape
import pdb
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
#decorators end

def doudou(request):
    return HttpResponse(
        r2r('doudou.html',
            {'doudou':'田慧娟'}
            ))

# 定位笔记
def note_id(request,note_id):
#    pdb.set_trace()
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
def note_add(request):
    t = loader.get_template('note_detail_text.html')
    c = {}
    c['note'] = {
        'topic':"新主题",
        'note_type':'0',
        'content':'编辑内容',
        }
    c = RequestContext(
        request,  c)
     
    '''
    note_mods.to_template(
    {
    "title":"秦木工的笔记",
    "menu":[("主页","/"),("木工的笔记","/note/"),("新笔记","/note/add",)],
    "person_info":[("qinmugong","#"),("消息","#"),("设置","#"),]
    }) ,
    '''
    return HttpResponse( t.render(c) )

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


def date_micro(req1uest,**kw):
    return HttpResponse("yy")
def try__(request):
    '''
    dir_request = str( dir(request) )+"<br>";
    dir_cookies = str(dir(request.COOKIES))+"<br>";
    dir_files = str(dir(request.FILES))+"<br>";
    dir_meta = str(dir(request.META.keys()))+"<br>";
    dir_request_request = str(dir(request.REQUEST))+"<br>";
    '''
    print("try views")
    return HttpResponse( r2r("doudou.html",{'doudou':'doudou'}) )

