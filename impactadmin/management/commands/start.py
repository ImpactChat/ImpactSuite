import sys

from django.core.management import execute_from_command_line
from ...models import User
from impactchat.models import Channel
from django.core.management.base import BaseCommand, CommandError

#pylint: disable=no-member

class Command(BaseCommand):
    help = 'Migrate then start the server'

    def handle(self, *args, **options):
        execute_from_command_line(('manage.py', 'migrate'))

        if User.objects.count() == 0:
            User.objects.create_superuser(
                                username='admin',
                                password='admin',)
            self.stdout.write(self.style.WARNING('Warning: Automatically created a superuser with credentials admin:admin, it is highly recommended you change these credentials in the admin interface'))


        if Channel.objects.count() == 0:
            Channel.objects.create(name='Channel1')




        execute_from_command_line(('manage.py', 'runserver', '0.0.0.0:8000'))
