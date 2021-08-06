from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
import datetime
import logging

logger = logging.getLogger(__name__)


def one_hour_later():
    return timezone.now() + datetime.timedelta(hours=1)


class Item(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User, related_name='item_set', on_delete=models.CASCADE, null=False
    )
    title = models.CharField(blank=True, default='Untitled', max_length=128)
    due_time = models.DateTimeField(default=one_hour_later, blank=False)
    status = models.CharField(max_length=10, default='UNDONE')

    class Meta:
        ordering = ['created']

    def __str__(self) -> str:
        return "Item: {} at {} (id: {}, status: {}, created at {} by {})".format(
            self.title,
            self.due_time,
            self.id,
            self.status,
            self.created,
            self.owner.username,
        )


from django_q.tasks import schedule
from django_q.models import Schedule


@receiver(post_save, sender=Item)
def set_timer(sender, instance, created, **kwargs):
    """
    a post-save func that schedule a task to remind the user
    """
    if created:
        ## don't pass model instance to task queue
        schedule(
            'todolist.tasks.timer',
            instance.owner.username,
            instance.pk,
            schedule_type=Schedule.ONCE,
            next_run=instance.due_time,
        )
