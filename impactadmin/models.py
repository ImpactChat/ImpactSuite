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



class Student(models.Model):
    """
    Represents a student in the school
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Teacher(models.Model):
    """
    Represents a teacher in the school
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Staff(models.Model):
    """
    Represents a staff in the school
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Parent(models.Model):
    """
    Represents a parent in the school
    """
    students = models.ManyToManyField(Student)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Class(models.Model):
    """
    Represents a class in the school  
    Each class can have multiple students and teachers
    """
    class Meta:
        verbose_name_plural = "Classes"

    name = models.CharField(max_length=32, help_text="Name of the class (ex: French, Math ...)")
    students = models.ManyToManyField(Student)
    teachers = models.ManyToManyField(Teacher)


class Classroom(models.Model):
    """
    Represents a physical classroom in the school
    """
    room_name = models.CharField(max_length=128, 
                                 verbose_name="Room name",
                                 help_text="The name of the room, this is commonly the room number (ex: 216) or name (ex: Entrance)")
