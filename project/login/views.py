from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core import serializers
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import logout as django_logout
import json
# Create your views here.
from login.forms import RegisterForm, LoginForm


def index(request):
    return render(request, "pins/home.html")


def logout(request):
    if request.method == 'POST':
        django_logout(request)
    return HttpResponseRedirect('/home')


def login(request):
    template = 'login/login.html'

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                auth_login(request, user)
                return HttpResponseRedirect('/home')
            else:
                return render(request, template, {
                    'form': form,
                    'error_message': 'Invalid username or password.'
                })

    # No post data available, let's just show the page.
    else:
        print("first visit")
        form = LoginForm()
        return render(request, template, {'form': form})


def signup(request):
    # if this is a POST request we need to process the form data
    template = 'login/signup.html'

    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = RegisterForm(request.POST)
        print(form)
        print("--------------------")
        print(form.errors)
        # check whether it's valid:
        if form.is_valid():
            print("the form is valid")
            if User.objects.filter(username=form.cleaned_data['username']).exists():
                return render(request, template, {
                    'form': form,
                    'error_message': 'Username already exists.'
                })
            elif User.objects.filter(email=form.cleaned_data['email']).exists():
                return render(request, template, {
                    'form': form,
                    'error_message': 'Email already exists.'
                })
            elif form.cleaned_data['password'] != form.cleaned_data['password_repeat']:
                return render(request, template, {
                    'form': form,
                    'error_message': 'Passwords do not match.'
                })
            else:
                # Create the user:
                user = User.objects.create_user(
                    form.cleaned_data['username'],
                    form.cleaned_data['email'],
                    form.cleaned_data['password']
                )
                # user.first_name = form.cleaned_data['first_name']
                # user.last_name = form.cleaned_data['last_name']
                user.save()

                # Login the user
                auth_login(request, user)

                # redirect to accounts page:
                return HttpResponseRedirect('/home')
        else:
            print("not valid")
            return render(request, template, {'form': form})

    # No post data available, let's just show the page.
    else:
        print("first visit")
        form = RegisterForm()
        return render(request, template, {'form': form})



