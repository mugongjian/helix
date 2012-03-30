# Create your views here.
#coding:utf-8
from django.http import HttpResponse
from django.shortcuts import render_to_response as r2r
from django.template import (loader,Context,RequestContext)
from note.mod import (mod_sum,mods)
def home(request):
    home_mods = (mods["basic"] + mods["head"] )
    t = loader.get_template("home.html")
    c = RequestContext(
        request,  
        { 
            "mods":home_mods.to_template(
                {
                    "title":"秦木工的页面",
                    "menu":[("笔记","/note/",),("问答","/ask/")],
                    "person_info":[("qinmugong","#"),("消息","#"),("设置","#"),],
                    }
                ) 
            } )
    return HttpResponse( t.render(c))

