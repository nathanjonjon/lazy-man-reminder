from todolist.models import Item
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django_q.tasks import async_task
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
def item_finish(request: Request) -> Response:
    item_id = request.data.get('item_id', None)
    item_instance = get_object_or_404(Item, pk=item_id)
    if item_instance.status == 'UNDONE':
        item_instance.status = 'DONE'
    else:
        logger.error(
            f'Item status: {item_instance.status}; cannot be done anymore. (id: {item_id}, title: {item_instance.title})'
        )
        return Response(
            {
                'message': f'Item status: {item_instance.status}; cannot be done anymore. (id: {item_id}, title: {item_instance.title})'
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    user = item_instance.owner

    async_task('tasks.finish', user, item_id)

    logger.info(f'Item finished. (id: {item_id}, title: {item_instance.title})')
    return Response(
        {'message': f'Item finished. (id: {item_id}, title: {item_instance.title})'}
    )
