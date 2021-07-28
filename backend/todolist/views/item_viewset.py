from django.db import transaction
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from todolist.models import Item
from django.contrib.auth.models import User
from todolist.serializers import ItemSerializer
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    model = Item
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def _get_user(self, request):
        if not request.user or not request.user.username:
            raise Exception("User not logged in")

        return get_object_or_404(User, username=request.user.username)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self._get_user(request))
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def get_queryset(self):
        """
        Returns a list of items of a user.
        """
        return self._get_user(self.request).item_set.all()

    def get_object(self):
        item_id = self.kwargs.get('item_id', None)
        object = get_object_or_404(self._get_user(self.request).item_set, pk=item_id)
        self.check_object_permissions(self.request, object)
        return object
