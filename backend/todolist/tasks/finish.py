from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)


def finish(user, item_id):
    """send message to frontend when an item is done"""
    item_instance = user.item_set.get(pk=item_id)

    try:
        channel_layer = get_channel_layer()

        # Trigger message sent to group
        async_to_sync(channel_layer.group_send)(
            str(user.pk),  # Group Name, Should always be string
            {
                "type": "notify",  # Custom Function written in the consumers.py
                "id": item_id,
                "title": item_instance.title,
                "status": "DONE",
                "message": "Finished an item in todo list",
                "time": str(timezone.now()),
            },
        )
        logger.info(
            f"Item (id: {item_id}, title: {item_instance.title}) has been done in time. Message sent."
        )
    except Exception as e:
        raise e
