from django.db import models
from django.conf import settings


# pylint: disable=no-member
# Create your models here.
class Channel(models.Model):
    class Meta:
        permissions = [
            ("manage_channels", "Can add a channel using the view"), # noqa
        ]

    name = models.CharField(max_length=32, unique=True)
    visible = models.BooleanField(default=True)

    def getJSON(self):
        return {
            "name": self.name,
            "pk": self.pk
        }

    def getMessagesJSON(self, limit=50):
        messages = self.message_set.all().order_by('-timestamp')[:limit]
        messages = reversed(messages)
        return {
            'channel': self.name,
            'pk': self.pk,
            'messages': [
                message.getJSON() for message in messages
            ]
        }

    def __str__(self):
        return self.name


class Message(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    content = models.CharField(max_length=2000)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def getJSON(self):
        return {
            'content': self.content,
            'author': self.author.getJSON(),
            'timestamp': str(self.timestamp),
            'pk': self.pk
        }

    def __str__(self):
        return f"{self.author}:{self.channel.name}/{self.pk}"
