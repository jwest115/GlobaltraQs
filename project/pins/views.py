from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views import View
# Create your views here.
from pins.forms import DropPinForm
from pins.models import Pin


def display_map(request):
    template = 'pins/map.html'
    if request.method == 'POST':
        form = DropPinForm(request.POST)
        print("here now")
        # print(form)
        if form.is_valid():
            print("form is valid")
            print(form)
            title = form.cleaned_data['title']
            description = form.cleaned_data['description']
            latitude = form.cleaned_data['latitude']
            longitude = form.cleaned_data['longitude']
            if title is None:
                print("error in title")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please enter a title.'
                })
            elif description is None:
                print("error in description")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please enter a description.'
                })
            elif latitude and longitude is None:
                print("error in lat lon")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please click a location on the map.'
                })
            else:
                print("it worked")
                current_user = request.user
                pin = Pin(user=current_user, title=title, description=description, latitude=latitude,
                          longitude=longitude)
                pin.save()
                pin_list = serializers.serialize('json', Pin.objects.all())
                form = DropPinForm()
                return render(request, template, context={'form': form, 'pin_list': pin_list, 'latitude': latitude,
                                                          'longitude': longitude})
                # return HttpResponseRedirect('/map')

        else:
            pins = Pin.objects.all()
            print(pins)
            form = DropPinForm()
            pin_list = serializers.serialize('json', Pin.objects.all())
            return render(request, template,
                          context={'form': form, 'pin_list': pin_list, 'latitude': -1, 'longitude': -1})

    # No post data available, let's just show the page.
    else:
        form = DropPinForm()
        pin_list = serializers.serialize('json', Pin.objects.all())
        print(pin_list)
        return render(request, template, context={'form': form, 'pin_list': pin_list, 'latitude': -1, 'longitude': -1})


def display_map2(request):
    template = 'pins/freemap.html'
    if request.method == 'POST':
        form = DropPinForm(request.POST)
        print("here now")
        # print(form)
        if form.is_valid():
            print("form is valid")
            print(form)
            title = form.cleaned_data['title']
            description = form.cleaned_data['description']
            latitude = form.cleaned_data['latitude']
            longitude = form.cleaned_data['longitude']
            if title is None:
                print("error in title")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please enter a title.'
                })
            elif description is None:
                print("error in description")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please enter a description.'
                })
            elif latitude and longitude is None:
                print("error in lat lon")
                return render(request, template, {
                    'form': form,
                    'error_message': 'Please click a location on the map.'
                })
            else:
                print("it worked")
                current_user = request.user
                pin = Pin(user=current_user, title=title, description=description, latitude=latitude,
                          longitude=longitude)
                pin.save()
                pin_list = serializers.serialize('json', Pin.objects.all())
                form = DropPinForm()
                return render(request, template, context={'form': form, 'pin_list': pin_list, 'latitude': latitude,
                                                          'longitude': longitude})
                # return HttpResponseRedirect('/freemap')

        else:
            pins = Pin.objects.all()
            print(pins)
            form = DropPinForm()
            pin_list = serializers.serialize('json', Pin.objects.all())
            return render(request, template,
                          context={'form': form, 'pin_list': pin_list, 'latitude': -1, 'longitude': -1})

    # No post data available, let's just show the page.
    else:
        form = DropPinForm()
        pin_list = serializers.serialize('json', Pin.objects.all())
        print(pin_list)
        return render(request, template, context={'form': form, 'pin_list': pin_list, 'latitude': -1, 'longitude': -1})


def stories(request):
    pins = Pin.objects.all()
    return render(request, 'pins/stories.html', {'pins': pins})


def detail(request, pin_id):
    story = get_object_or_404(Pin, pk=pin_id)
    user_id = story.user_id
    print("user id " + str(user_id))
    user = User.objects.get(id=user_id)
    # latitude = serializers.serialize('json', story.latitude)
    # longitude = serializers.serialize('json', story.longitude)

    pin_list = serializers.serialize('json', Pin.objects.all())
    return render(request, 'pins/detail.html',
                  context={'story': story, 'author': user, 'pin_list': pin_list, 'latitude': story.latitude,
                           'longitude': story.longitude})


def test(request):
    return render(request, 'pins/test.html')
