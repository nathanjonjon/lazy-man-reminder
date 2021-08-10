from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator, OriginValidator
from django.core.asgi import get_asgi_application
from todolist.consumers import NotificationConsumer
from .channelsmiddleware import TokenAuthMiddleware

application = ProtocolTypeRouter(
    {
        # Websocket chat handler
        'http': get_asgi_application(),
        'websocket': AllowedHostsOriginValidator(  # Only allow socket connections from the Allowed hosts in the settings.py file
            TokenAuthMiddleware(  # Session Authentication, required to use if we want to access the user details in the consumer
                URLRouter(
                    [
                        path(
                            "notifications/", NotificationConsumer.as_asgi()
                        ),  # Url path for connecting to the websocket to send notifications.
                    ]
                )
            ),
        ),
    }
)
