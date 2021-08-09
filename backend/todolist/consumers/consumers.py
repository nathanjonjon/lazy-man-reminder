from channels.generic.websocket import AsyncWebsocketConsumer
import json, logging
from asgiref.sync import async_to_sync

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class NotificationConsumer(AsyncWebsocketConsumer):
    # Function to connect to the websocket
    async def connect(self):
        # Checking if the User is logged in
        if self.scope["user"].is_anonymous:
            # Reject the connection
            logger.warning('-------------websocket-connection-rejected--------------')
            logger.warning(f'user: {self.scope["user"]} is not logged in.')
            self.close()
        else:
            self.group_name = str(
                self.scope["user"].pk
            )  # Setting the group name as the pk of the user primary key as it is unique to each user. The group name is used to communicate with the user.
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            logger.info('-------------websocket-connection-accpeted--------------')
            await self.accept("subprotocol")

    # Function to disconnet the Socket
    async def disconnect(self, close_code):
        logger.info('-------------websocket-disonnected--------------')
        await self.close()
        # pass

    # Custom Notify Function which can be called from Views or api to send message to the frontend
    # async def notify(self, event):
    #     logger.info('-------------websocket-message-sent--------------')
    #     await self.send(text_data=json.dumps(event))
