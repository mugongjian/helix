from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.forms import ModelForm

class Tag(models.Model):
    name = models.SlugField( max_length=100,primary_key = True )

class Bookmark(models.Model):
    
    user  = models.ForeignKey(User)
    url = models.URLField(db_index = True)
    short_description = models.CharField(max_length=225)
    long_description = models.TextField(blank = True)
    timestamp = models.DateTimeField( default = datetime.now)
    public = models.BooleanField()
    tags = models.ManyToManyField(Tag)


