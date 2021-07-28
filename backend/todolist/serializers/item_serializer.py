from rest_framework import serializers
from todolist.models import Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['created', 'modified', 'id', 'owner', 'title', 'due_time', 'status']
        read_only_fields = ('created', 'modified', 'id', 'owner', 'status')
