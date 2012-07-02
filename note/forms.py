#coding=utf-8
from django import forms


class NoteForm(forms.Form):
    topic = forms.CharField()
