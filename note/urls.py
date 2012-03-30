from django.conf.urls.defaults import (patterns, include, url)
from django.views.generic import DetailView
urlpatterns = patterns(
    'note.views',
    url(r'^$','note_home'),
    url(r'^topic/(?P<topic>\w+)/$', 'note_topic'),
    url(r'^id/(?P<note_id>\d+)/$', 'note_id'),
    
    url(r'^add$','note_add'),
    url(r'^topic$','query_topic'),
    url(r'^sync/$','save_note'),
    url(r'^list$','list_note'),
    url(r'^q/$','query_micro'),
    url(r'^a/$','add_micro'),
    url(r'^t/(?P<topic>[\w\-]+)/$','topic_micro'),
    url(r'^d/$','date_micro'),
    url(r'^doudou$','doudou'),
    url(r'^try/$','try__'),
)
