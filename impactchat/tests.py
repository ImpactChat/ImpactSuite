import json

from django.test import TestCase
from impactchat.models import Channel, Message

from impactadmin.models import User


# pylint: disable=no-member
class MessageTestCase(TestCase):
    def setUp(self):
        Channel.objects.create(name="Channel1")
        User.objects.create_user('user', '', 'password')

    def test_messages_link_to_user(self):
        """Messages link correctly to the user"""
        c = Channel.objects.get(name="Channel1")
        u = User.objects.get(username="user")

        Message.objects.create(channel=c, content="Message1", author=u)
        Message.objects.create(channel=c, content="Message2", author=u)

        self.assertEqual(len(u.message_set.all()), 2)

    def test_message_serialize(self):
        """Messages are serialized properly by the model"""
        c = Channel.objects.get(name="Channel1")
        u = User.objects.get(username="user")

        m1 = Message.objects.create(channel=c, content="Message1", author=u)
        m2 = Message.objects.create(channel=c, content="Message2", author=u)

        timestamp1 = m1.timestamp
        pk1 = m1.pk

        timestamp2 = m2.timestamp
        pk2 = m2.pk

        self.assertJSONEqual(json.dumps(m1.getJSON()), {
                    'content': "Message1",
                    'author': {
                        "username": "user",
                        "avatar": "U"
                    },
                    'timestamp': str(timestamp1),
                    'pk': pk1
        })

        self.assertJSONEqual(json.dumps(m2.getJSON()), {
                    'content': "Message2",
                    'author': {
                        "username": "user",
                        "avatar": "U"
                    },
                    'timestamp': str(timestamp2),
                    'pk': pk2
        })


class ChannelTestCase(TestCase):
    def setUp(self):
        Channel.objects.create(name="Channel1")
        User.objects.create_user('user', '', 'password')

    def test_channel_serialize(self):
        """Test channel serializes"""
        c = Channel.objects.get(name="Channel1")
        ser = json.dumps(c.getJSON())
        self.assertJSONEqual(ser, {
                    'name': "Channel1",
                    'pk': c.pk,
        })

    def test_channel_serialize_empty(self):
        """Test channel serializes when empty"""
        c = Channel.objects.get(name="Channel1")
        ser = json.dumps(c.getMessagesJSON())
        self.assertJSONEqual(ser, {
                    'channel': "Channel1",
                    'pk': c.pk,
                    "messages": []
        })

    def test_channel_serialize_messages(self):
        """Channel serialize properly when messages are stored"""
        c = Channel.objects.get(name="Channel1")
        u = User.objects.get(username="user")

        m1 = Message.objects.create(channel=c, content="Message1", author=u)
        m2 = Message.objects.create(channel=c, content="Message2", author=u)

        ser = json.dumps(c.getMessagesJSON())

        self.assertJSONEqual(ser, {
            'channel': "Channel1",
            'pk': c.pk,
            'messages': [
                m1.getJSON(),
                m2.getJSON()
            ]
        })

    def test_multiple_channels(self):
        c1 = Channel.objects.create(name="Channel1")
        c2 = Channel.objects.create(name="Channel2")

        u = User.objects.get(username="user")

        m1 = Message.objects.create(channel=c1, content="Message1", author=u)
        m2 = Message.objects.create(channel=c2, content="Message2", author=u)

        ser = json.dumps(c1.getMessagesJSON())
        self.assertJSONEqual(ser, {
            'channel': "Channel1",
            'pk': c1.pk,
            'messages': [
                m1.getJSON(),
            ]
        })

        ser = json.dumps(c2.getMessagesJSON())
        self.assertJSONEqual(ser, {
            'channel': "Channel2",
            'pk': c2.pk,
            'messages': [
                m2.getJSON(),
            ]
        })
