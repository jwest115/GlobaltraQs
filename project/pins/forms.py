from django import forms

class DropPinForm(forms.Form):
    title = forms.CharField(label='title', widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Event title', 'style': 'width: 100%;'}))
    description = forms.CharField(label='description', widget=forms.Textarea(
        attrs={'class': 'form-control', 'placeholder': 'Event description', 'style': 'width:100%'}))
    latitude = forms.CharField(widget=forms.HiddenInput())
    longitude = forms.CharField(widget=forms.HiddenInput())