from django.conf.urls.defaults import patterns, include, url
from django.views.generic.base import TemplateView
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
import settings
urlpatterns = patterns(
    '',
    # Examples:
        
    url(r'^$', TemplateView.as_view( template_name="base_home.html")),
    url(r'^topic/',include('topic.urls')),                   
    url(r'^note/', include('note.urls')),
    url(r'^note-micro/',include('note.urls')),                   
    url(r"^rest/",include("rest.urls")),
    url(r"^ask/",include("ask.urls")),
    # Uncomment the admin/doc line below to enable admin documentation:
        
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    
    # Uncomment the next line to enable the admin:

    url(r'^admin/', include(admin.site.urls)),
#    url(r'^cms/',include('cms.urls') )
    )

