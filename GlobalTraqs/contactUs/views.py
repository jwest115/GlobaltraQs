from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect

# def send_email(request):
#     subject = request.POST.get('subject', '')
#     message = request.POST.get('message', '')
#     from_email = request.POST.get('from_email', '')
#     if subject and message and from_email:
#         try:
#             send_mail(subject, message, from_email, ['admin@example.com'])
#         except BadHeaderError:
#             return HttpResponse('Invalid header found.')
#         return HttpResponseRedirect('/contact/thanks/')
#     else:
#         # In reality we'd use a form class
#         # to get proper validation errors.
#         return HttpResponse('Make sure all fields are entered and valid.')
@api_view(('POST',))
def email(config):
    data = config.data
    print (data)
    message = data['message']
    email = data['email']
    if message:
        if (email == ''):
            email = 'anonymous@anon.com'
        
        context = {
            'message': message,
            'email': email
        }
        email_html_message = render_to_string('email/email_plaintext_message.html', context)
        email_plaintext_message = render_to_string('email/email_plaintext_message.txt', context)
        try:
            msg = EmailMultiAlternatives(
                # title:
                "Contact us",
                # message:
                email_plaintext_message,
                # from:
                email,
                #   to:
                ["resetglobaltraqs@gmail.com"]
            )
            msg.attach_alternative(email_html_message, "text/html")
            msg.send()
        except BadHeaderError:
            return HttpResponse('Invalid header found.') 
        return HttpResponse('email should\'ve send')
    else:
        # In reality we'd use a form class
        # to get proper validation errors.
        return HttpResponse('Make sure all fields are entered and valid.')

    
@api_view(('POST',))
def supportEmail(config):
    data = config.data
    print (data)
    email = data['email']
    name = data['name']    
    context = {
        'name': name,
        'email': email
    }
    email_html_message = render_to_string('email/supportEmail_plaintext_message.html', context)
    email_plaintext_message = render_to_string('email/supportEmail_plaintext_message.txt', context)
    try:
        msg = EmailMultiAlternatives(
            # title:
            "Support us",
            # message:
            email_plaintext_message,
            # from:
            "globaltraqsNoReply@gmail.com",
            #   to:
            [email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
    except BadHeaderError:
        return HttpResponse('Invalid header found.') 
    return HttpResponse('email should\'ve send')

@api_view(('POST',))
def FAQEmail(config):
    data = config.data
    print (data)
    email = data['email']
    question = data['question']
    context = {
        'email': email,
        'question': question
    }
    email_html_message = render_to_string('email/FAQplaintext_message.html', context)
    email_plaintext_message = render_to_string('email/FAQEmail_plaintext_message.txt', context)
    try:
        msg = EmailMultiAlternatives(
            # title:
            "FAQ",
            # message:
            email_plaintext_message,
            # from:
            email,
            #   to:
            ["globaltraqsNoReply@gmail.com"]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
    except BadHeaderError:
        return HttpResponse('Invalid header found.') 
    return HttpResponse('email should\'ve send')