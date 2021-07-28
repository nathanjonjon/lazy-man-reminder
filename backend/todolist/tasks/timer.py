from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)


def timer(user, item_id):
    item_instance = user.item_set.get(pk=item_id)
    if item_instance.status == 'UNDONE':
        item_instance.status = 'FAILED'
        item_instance.save()

        try:
            channel_layer = get_channel_layer()

            # Trigger message sent to group
            async_to_sync(channel_layer.group_send)(
                str(user.pk),  # Group Name, Should always be string
                {
                    "type": "notify",  # Custom Function written in the consumers.py
                    "id": item_id,
                    "title": item_instance.title,
                    "status": "FAILED",
                    "message": "Failed to complete an item in time",
                    "time": str(timezone.now()),
                },
            )
            logger.info(
                f"Item (id: {item_id}, title: {item_instance.title}) has not been done in time. Message sent."
            )
        except Exception as e:
            raise e
    else:
        logger.info(
            f"Item (id: {item_id}, title: {item_instance.title}) has been done."
        )
