# Create your views here.
from rest.models import (Bookmark,BookmarkForm)

from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.shortcuts import render_to_response as r2r
from django.template import(loader,Context,RequestContext)
import os

from djangomako.shortcuts import (render_to_response,render_to_string)
def mako_test(request):
    return render_to_response('mako.html',{'user':'paul'})
def model_test(request):
    form = BookmarkForm()
    #return r2r("bookmark-form.html",
     #          RequestContext(request,{"form":form }) )
    
    return HttpResponse(os.popen('ls'))

def bookmark_list(request,username):
    u,created = Bookmark.objects.get_or_create(url="baidu.com")
    u["user_id"] = "jpg"
    u["show_description"]="aa"
    u["long_description"] = "long"
    u["timestamp"] = datetime.now()
    u["public"] = True
    u.save()
    return HttpResponse("{}")
    u = get_object_or_404(User,username=username)
    marks = Bookmark.objects.filter( user = u,public=True)
    json = serializers.serialize("json",marks)
    resp = HttpResponse( json,mimetype="application/json")
    resp["pc"]="imax"
    return resp

class BookmarkDetail:
    def __call__(self,request,username,bookmark_url):
        self.request = request
        self.bookmark_url = bookmark_url

        self.user = get_object_or_404(User,username=usernmae)
        try:
            callback = getattr(self,"do_%s" % request.method)
            
        except AttributeError:
            allowed_methods = [m.lstrip("do_") for m in dir(self)
                               if m.startswith("do_")]
            return HttpResponseNotAllow(allowed_methods)
        #self.authenticate()
        return callback()
    def do_GET(self):
        bookmark = get_object_or_404(
            Bookmark,
            user= self.user,
            url = self.bookmark_url
            )
        if bookmark.public == False and self.user != self.authenticated_user:
            return self.forbidden()
        json = serializers.serialize("json",[bookmark])
        return HttpResponse( json,mimetype="application/json")
        
