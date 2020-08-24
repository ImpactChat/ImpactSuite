import json

from django.test import TestCase

from impactadmin.models import User


# pylint: disable=no-member
class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user('user', '', 'password')

    def test_user_serialize(self):
        """User is serialized properly"""
        u = User.objects.get(username="user")

        self.assertJSONEqual(json.dumps(u.getJSON()), {
            "username": 'user',
            "avatar": "U"
        })
