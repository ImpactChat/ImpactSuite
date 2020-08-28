from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User
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


admin.site.register(User, UserAdminOver)
