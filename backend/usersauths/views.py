from django.shortcuts import render , redirect
from .forms import UserRegisterForm
from django.contrib import messages
from django.contrib.auth import login , authenticate , logout
from django.conf import settings
from .models import User
from django.http import Http404
#function for register user
def register_user(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST or None)
        if form.is_valid():
            new_user = form.save()
            username = form.cleaned_data['username']
            messages.success(request , f"Pensez a vous connectez a votre compte")
            new_user = authenticate(username = form.cleaned_data['username'],
                                    email = form.cleaned_data['email'],
                                    password = form.cleaned_data['password1'],
                                    confirm = form.cleaned_data['password2'])
            # login(request , new_user)
            print('save with succes')
            return redirect('usersauths:login')
        else: 
            messages.warning(request , 'Please verify your email or password ')   
    else:
        form = UserRegisterForm()
        print('user cannot be registered')
    context ={
        'form' : form,
    }
    return render(request , 'usersauths/register.html' , context)
#functionn for login
def login_user(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")
        try:
            user = User.objects.get(email = email)
            user = authenticate(request , email = email, password = password)
            if user is not None:
                login(request , user)
                messages.success(request , f" Welcome {email} you logged in successfully")
                return redirect('apps:index')
            else:
                messages.warning(request , f'User with  does not exist Create on account')
        except:
            messages.warning(request , f"Oups impossible try again please! ")
    context = {
    }
    return render(request , 'usersauths/login.html' , context)
#function for logout a user
def logout_user(request):
    logout(request)
    messages.success(request , f'User disconnected with sucessfully')
    return redirect('usersauths:login')