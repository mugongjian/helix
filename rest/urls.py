from django.conf.urls.defaults import(patterns,include,url)
from django.views.generic.simple import direct_to_template as dtt
from django.views.generic.simple import redirect_to as rt
from django.views.generic import (DetailView, ListView)

from rest.models import Bookmark

urlpatterns = patterns(
    "rest.views",
    (r"^user/$",dtt,{"template":"user_index.html"}),
    (r'^images/$',dtt,{'template':'images.html'}),
    (r"^user/(?P<id>\d+)/$",dtt,{ "template":"user_detail.html"} ),
    (r"^user/goto/(?P<id>\d+)/$",rt,{ "url":"/rest/user/%(id)s/","permanent":False} ),
    (r"^user/none/$",rt,{"url":None} ),
    (r"^user/quote/$",rt,{"url":"%%%%%%7ejab"} ),
    (r"^user/list/$",
     ListView.as_view(
            queryset = Bookmark.objects.order_by("-id")[:5],
            context_object_name = "bookmark",
            template_name = "rest_user_index.html"
            )
     ),
    url(r'^model/$','model_test'),
    (r'^menus$',dtt,{ 'template':'menus.html' }),

)
