from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class UserRegisterForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Username'
    , 'class':'form-control p-3'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder':'Email',
     'class':'form-control p-3'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Password'
    , 'class':'form-control p-3'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Confirm Password'
    , 'class':'form-control p-3'}))
    
    class Meta:
        model = User
        fields = ['email' , 'username']
