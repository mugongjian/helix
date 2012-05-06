from django.conf.urls.defaults import (patterns, include, url)
from django.views.generic import (DetailView,ListView)
from note.models import Note,Piece
from note.views import TryView
urlpatterns = patterns(
    'note.views',
    url(r'^$', ListView.as_view(
          model=Note,
          queryset = Note.objects.order_by("-id")[:10],
          context_object_name ="notes",
          template_name ="note-list.html"
            )),
    (r'^add$','add_note'),
    (r'^(?P<pk>\d+)/$',DetailView.as_view(template_name='note_detail_text.html',
                                          model=Note,
                                          context_object_name='note'
                                          )),
    (r'^(?P<pk>\d+)/edit$','edit_note'),
    
    url(r'^topic/(?P<topic>\w+)/$', 'note_topic'),
    url(r'^topic$','query_topic'),
    url(r'^sync/$','save_note'),
    url(r'^json/$','list_note'),
    url(r'^q/$','query_micro'),
    url(r'^a/$','add_micro'),
    url(r'^t/(?P<topic>[\w\-]+)/$','topic_micro'),
    url(r'^d/$','date_micro'),
    url(r'^doudou$', 'doudou'),
    url(r'^try/$', TryView.as_view()),
)
