import json

from channels.db import database_sync_to_async

from ..models import Message, Channel

# pylint: disable=no-member

class ChatConsumerMethods():
    async def chat_new(self, event):
        m = event['m']
        await self.send(text_data=json.dumps({
            'new_message': m
        }))

    async def chat_channel_new_success(self, event):
        c = event['c']
        await self.send(text_data=json.dumps({
            'new_channel': c
        }))

    async def chat_channel_delete_success(self, event):
        cs = event['cs']
        await self.send(text_data=json.dumps({
            'channels_deleted': cs
        }))

    @database_sync_to_async
    def createMessage(self, channel_pk, message, author):
        channel_obj = Channel.objects.get(pk=channel_pk)  # get_or_create?
        m = Message.objects.create(channel=channel_obj,
                                   content=message,
                                   author=author)
        return m

    @database_sync_to_async
    def createChannel(self, channel):
        c = Channel.objects.create(name=channel)
        return c

    @database_sync_to_async
    def deleteChannels(self, channels):
        cs = Channel.objects.filter(pk__in=channels)
        cs.update(visible=False)
        return [i.getJSON() for i in cs]
