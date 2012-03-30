from django.db import models

# Create your models here.
"""
class topic(models.Model):
    name=models.CharField(max_length=200)
    link=models.CharField(max_length=500)
    date=models.DateTimeField('date published')
    
    def __unicode__(self):
        return self.name
"""
class Note(models.Model):
    topic=models.CharField(max_length=500)
    note_type=models.CharField(max_length=1)
    content=models.CharField(max_length=5000)
    
    def __unicode__(self):
        return self.topic

class Piece(models.Model):
    topic = models.CharField( max_length=10 )
    word = models.CharField( max_length=140 )
    ptime = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return str( self.ptime );
    
    
    
