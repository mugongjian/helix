from django.conf.urls.defaults import patterns, include
from django.views.generic.base import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    (r'^$', TemplateView.as_view(template_name="base_home.html")),
    (r'^topic/', include('topic.urls')),
    (r'^note/', include('note.urls')),
    (r'^note-micro/', include('note.urls')),
    (r"^rest/", include("rest.urls")),
    (r"^ask/", include("ask.urls")),

    (r'^admin/doc/', include('django.contrib.admindocs.urls')),
    (r'^admin/', include(admin.site.urls)),
)

