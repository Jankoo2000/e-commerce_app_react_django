from django.contrib.auth.models import User
from django.db.models.signals import pre_save


# signals it's mechanism like listening to events


# making email address also username
# if email is changed also username is changed
def update_user(sender, instance, **kwargs):
    # print('Signals Triggered')
    user = instance
    if user.email != '':
        user.username = user.email


# Publisher-Subscriber Pattern:
# pre_save.connect(event_function, sender=Listned_obj)
pre_save.connect(update_user, sender=User)
# register signal in apps.py
