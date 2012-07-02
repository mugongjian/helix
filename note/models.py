from django.db import models


class Note(models.Model):
    topic = models.CharField(max_length=500)
    note_type = models.CharField(max_length=1)
    content = models.CharField(max_length=5000)

    def __unicode__(self):
        return self.topic


class Piece(models.Model):
    topic = models.CharField(max_length=10)
    word = models.CharField(max_length=140)
    ptime = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return str(self.ptime)



