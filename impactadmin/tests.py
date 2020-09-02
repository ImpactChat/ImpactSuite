import json

from django.test import TestCase
from django.test import Client
from django.test.utils import setup_test_environment
from django.urls import reverse

from impactadmin.models import User

client = Client()


# pylint: disable=no-member
class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user('user', '', 'password')

    def test_user_serialize(self):
        """User is serialized properly"""
        u = User.objects.get(username="user")

        self.assertJSONEqual(json.dumps(u.getJSON()), {
            "username": 'user',
            "avatar": "U",
            "pk": u.pk
        })

class TestProfile(TestCase):
    def setUp(self):
        pass

    def test_view_renders(self):
        response = self.client.get(reverse('impactadmin:profile'))
        self.assertIn(response.status_code, [200, 302])  # 200 OK or 302 Moved Temporarily
