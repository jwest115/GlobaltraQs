from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
#from .signals import reset_password_token_created
import django.dispatch

__all__ = [
    'reset_password_token_created',
    'pre_password_reset',
    'post_password_reset',
]

reset_password_token_created = django.dispatch.Signal(
    providing_args=["instance", "reset_password_token"],
)

pre_password_reset = django.dispatch.Signal(providing_args=["user"])

post_password_reset = django.dispatch.Signal(providing_args=["user"])


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "/resetPassword?token={1}".format(reverse('password_reset:reset-password-request'),
                                                   reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password reset for {title}".format(title="The arqive account"),
        # message:
        email_plaintext_message,
        # from:
        "thearqive.reset@gmail.com",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
