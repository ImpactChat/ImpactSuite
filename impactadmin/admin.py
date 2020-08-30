from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import *
from .forms import UserChangeForm

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
        (_("Information"), {"fields": ("avatar", "locale")}),
    )

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
    pass

@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    pass







admin.site.register(User, UserAdminOver)
