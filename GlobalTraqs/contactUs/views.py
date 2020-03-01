from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.context_processors import csrf


def email(request):
    arr = ["resetglobaltraqs@noreply.com"]
    context = {
        'message': request.message,
        'email': request.email
    }

    email_html_message = render_to_string('email/email_plaintext_message.html', context)
    email_plaintext_message = render_to_string('email/email_plaintext_message.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Contact us",
        # message:
        email_plaintext_message,
        # from:
        "resetglobaltraqs@noreply.com",
        # to:
        arr
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()

# Create your views here.
