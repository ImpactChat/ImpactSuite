from django import template
from django.apps import apps
from django.forms import Select
# from django.conf import settings


register = template.Library()


@register.filter
def number_objects(model, app):
    ModelObj = apps.get_model(app_label=app['app_label'],
                              model_name=model['object_name'])
    return ModelObj.objects.all().count()

@register.filter
def is_select(field):
    print(dir(field.field))
    print(field.field.widget_type)
    return field.field.widget_type == 'select'
