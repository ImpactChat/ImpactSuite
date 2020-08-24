from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.CharField(max_length=1,
                              default="U")
    locale = models.CharField(max_length=2,
                              default="en",
                              choices=settings.LANGUAGES)

    def getJSON(self):
        return {"username": self.username, "avatar": "U"}
