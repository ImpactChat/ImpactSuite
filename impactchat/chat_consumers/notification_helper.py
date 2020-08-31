from enum import Enum
from json import dumps
import logging

from django.utils.translation import gettext_lazy as _
from django.utils import translation

# print(translation.get_language())
# user_language = 'fr'
# translation.activate(user_language)
# print(translation.get_language())


log = logging.getLogger(__name__)


class NotificationLevel(str, Enum):
    DEFAULT = "default"
    SUCCESS = "success"
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"


messages = {
    "channel.new.error.name_taken": {
        "message": _("You can not use this name to create a new channel"),
        "severity": NotificationLevel.ERROR
    },
    "channel.new.success": {
        "message": _("Channel successfuly created"),
        "severity": NotificationLevel.SUCCESS
    },

    "channel.remove.error": {
        "message": _("An error occured when deleting one or more channels"),
        "severity": NotificationLevel.ERROR
    },
    "channel.remove.success": {
        "message": _("Channel(s) successfuly deleted"),
        "severity": NotificationLevel.SUCCESS
    }
}


class NotificationProvider:
    def __init__(self):
        self.messages = messages

    async def send(self, channel, data):
        log.info(f"Sending notification {data} to channels")
        print(f"Lang: {translation.get_language()}")
        data['message'] = str(data['message'])
        await channel.send(text_data=dumps(data))

    async def send_message(self, channel, message,
                           severity=NotificationLevel.DEFAULT):
        send = {
            "message": message,
            "severity": severity
        }
        await channel.send(text_data=dumps(send))
