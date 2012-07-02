#coding=utf-8
from django import forms


class NoteForm(forms.Form):
    title = forms.CharField(max_length=50)
    content = forms.CharField(max_length=300)
