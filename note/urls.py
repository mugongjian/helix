#coding=utf-8
from django.conf.urls.defaults import patterns
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import CreateView

from note.models import Note
from note.views import TryView


urlpatterns = patterns(
    'note.views',
    (r'^$', ListView.as_view(model=Note,\
    queryset=Note.objects.order_by("-id")[:10],\
    context_object_name="notes",\
    template_name="note/note_list.html")),
    (r'^add$', 'add_note'),
    (r'^(?P<pk>\d+)/$', DetailView.as_view(\
    template_name='note_detail_text.html',\
    model=Note,\
    context_object_name='note')),
    (r'^(?P<pk>\d+)/edit$', 'edit_note'),

    (r'^topic/(?P<topic>\w+)/$', 'note_topic'),
    (r'^topic$', 'query_topic'),
    (r'^sync/$', 'save_note'),
    (r'^json/$', 'list_note'),
    (r'^q/$', 'query_micro'),
    (r'^a/$', 'add_micro'),
    (r'^t/(?P<topic>[\w\-]+)/$', 'topic_micro'),
    (r'^d/$', 'date_micro'),
    (r'^doudou$', 'doudou'),
    (r'^try/$', TryView.as_view()),
    (r'^new$', CreateView.as_view())

)
