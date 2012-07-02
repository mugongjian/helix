# Create your views here.
#coding:utf-8

from django.shotcuts import render

from note.mod import mods


def home(request):
    home_mods = (mods["basic"] + mods["head"])

    mod_template = home_mods.to_template({
                    "title":u"秦木工的页面",
                    "menu":[(u"笔记","/note/",),(u"问答","/ask/")],
                    "person_info":[("qinmugong","#"),(u"消息","#"),(u"设置","#"),],
                    })

    return render(request, 'home.html', {"mods": mod_template})

