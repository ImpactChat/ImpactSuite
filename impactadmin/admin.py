from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db import models
from django.contrib.contenttypes.admin import GenericTabularInline
from django.utils.translation import gettext_lazy as _

from .models import *
from .forms import UserChangeForm

class UserInline(GenericTabularInline):
    model = User
    extra = 1
    ct_field = "user_role"

class UserAdminOver(UserAdmin):
    fieldsets = (
        (None, 
            {
                "fields": (
                    "username", 
                    "password"
                ),
            }
        ),
        (_("Personal info"), 
            {
                "fields": (
                    "first_name", 
                    "last_name", 
                    "email"
                ),
            }
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
        (_("Information"), {"fields": ("avatar", "locale", "user_role")}),
    )
    list_display = ("username", "is_staff", "user_role")
    # readonly_fields = ("user_role",)
    form = UserChangeForm


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    pass


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    pass


@admin.register(Classroom)
class ClassroomAdmin(admin.ModelAdmin):
    pass

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    pass

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.ManyToManyField: {'widget': forms.CheckboxSelectMultiple},
    }


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    pass







admin.site.register(User, UserAdminOver)
