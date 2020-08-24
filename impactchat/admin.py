from django.contrib import admin
from .models import Channel, Message


def makeVisible(modeladmin, request, queryset):
    queryset.update(visible=True)
makeVisible.short_description = "Make channels visible"  # noqa


def makeInvisible(modeladmin, request, queryset):
    queryset.update(visible=False)
makeInvisible.short_description = "Make channels invisible"  # noqa


# Register your models here.
@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'visible')
    list_filter = ('visible',)
    actions = [makeVisible, makeInvisible]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    pass


admin.site.site_header = "Administration Interface"
