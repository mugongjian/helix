from django.conf.urls.defaults import ( patterns, include , url )
from django.views.generic import ( ListView,DetailView )
from ask.models import Ask

urlpatterns = patterns(
 "ask.views",
 (r"^$",
  ListView.as_view (
            queryset = Ask.objects.order_by("-id")[:7],
            context_object_name = "asks",
            template_name = "ask_list.html"
            )
  ),
 url(r'^(?P<pk>\d+)/$',
  DetailView.as_view (
            model = Ask,
            template_name = "ask_detail.html",
            )
  )
)
