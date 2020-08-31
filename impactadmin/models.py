from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

USER_ROLE_CHOICES = [
    ('student', 'Student'),
    ('teacher', 'Teacher'),
    ('staff', 'Staff'),
    ('parent', 'Parent'),
]

# pylint: disable=no-member

class Role(models.Model):
    STUDENT = 1
    PARENT = 2
    TEACHER = 3
    STAFF = 4
    ROLE_CHOICES = (
        (STUDENT, 'student'),
        (PARENT, 'parent'),
        (TEACHER, 'teacher'),
        (STAFF, 'staff'),
    )

    id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)


class User(AbstractUser):
    avatar = models.CharField(max_length=1,
                              default="U")
    locale = models.CharField(max_length=2,
                              default="en",
                              choices=settings.LANGUAGES)

    user_role = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    role_data = GenericForeignKey('user_role', 'object_id')


    def getJSON(self):
        return {"username": self.username, "avatar": "U"}



class Student(models.Model):
    """
    Represents a student in the school
    """

    def __str__(self):
        return f"student-{self.pk}"


class Teacher(models.Model):
    """
    Represents a teacher in the school
    """

    def __str__(self):
        return f"teacher-{self.pk}"



class Staff(models.Model):
    """
    Represents a staff in the school
    """

    def __str__(self):
        return f"staff-{self.pk}"



class Parent(models.Model):
    """
    Represents a parent in the school
    """
    students = models.ManyToManyField(Student)

    def __str__(self):
        return f"parent-{self.pk}"



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
