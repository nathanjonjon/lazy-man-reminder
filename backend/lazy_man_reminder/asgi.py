"""
ASGI config for lazy_man_reminder project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

"""
For implementation of websocket using django-channel, see
https://github.com/ranjanmp/django-channels2-notifications
"""
import os

import django
from channels.routing import get_default_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lazy_man_reminder.settings')

django.setup()
application = get_default_application()
