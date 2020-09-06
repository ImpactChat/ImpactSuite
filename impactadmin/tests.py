import json

import django
from django.test import TestCase
from django.test import Client
from django.test.utils import setup_test_environment
from django.urls import reverse

from impactadmin.models import User, Student, Teacher, Staff

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

class TestLogin(TestCase):
    def setUp(self):
        User.objects.create_user('user', '', 'password')
    
    def _login(self, username, password):
        return self.client.post(reverse('impactadmin:login'), {"username": username, "password": password})

    def test_views_are_protected(self):
        response = self.client.get(reverse('impactadmin:profile'))
        self.assertEqual(response.status_code, 302)  # 302, redirect to login
        self.assertEqual(response.url, "/login/?next=/profile/")  
    
    def test_can_login(self):
        self._login('user', 'password')
        response = self.client.get(reverse('impactadmin:profile'))
        self.assertEqual(response.status_code, 200)  # 200 OK
    
    def test_login_fails(self):
        res = self._login('user', 'wrong password')
        self.assertEqual(res.url, "/login/")


    def test_can_logout(self):
        self._login('user', 'password')
        self.client.get(reverse('impactadmin:logout'))
        response = self.client.get(reverse('impactadmin:profile'))
        self.assertEqual(response.url, "/login/?next=/profile/")
    
    def test_logged_in_dont_see_login_page(self):
        self._login('user', 'password')
        res = self.client.get(reverse('impactadmin:login'))
        self.assertEqual(res.status_code, 302)

class TestAuthorizations(TestCase):
    def setUp(self):
        u1 = User.objects.create_user('teacher', '', 'password')
        u2 = User.objects.create_user('student', '', 'password')

        t = Teacher.objects.create()
        s = Student.objects.create()

        u1.role_data = t
        u2.role_data = s

        u1.save()
        u2.save()
    
    def _login(self, username, password):
        self.client.post(reverse('impactadmin:login'), {"username": username, "password": password})

    def test_can_administer(self):
        t = User.objects.get(username='teacher')
        s = User.objects.get(username='student')
        self.assertTrue(t.can_administer())
        self.assertFalse(s.can_administer())