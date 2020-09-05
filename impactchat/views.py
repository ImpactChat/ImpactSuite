from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

# from django.urls import reverse_lazy
# from django.utils import translation
from django.views.generic import View

from django_react_views.views import ReactTemplateView

from .models import Channel


# pylint: disable=no-member
# Create your views here.
class HomeView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):  # Temp redirect to a channel  
        try:  
            return redirect("impactchat:channel",
                            channelpk=Channel.objects.filter(visible=True)
                            .first().pk)
        except AttributeError:
            return redirect("impactchat:channel",
                            channelpk=0)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class MessageView(LoginRequiredMixin, ReactTemplateView):
    template_name = "impactchat/home.html"
    react_component = 'chatpage.jsx'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()
        if kwargs['channelpk'] == 0:
            try:  
                kwargs['channelpk'] = Channel.objects.filter(visible=True).first().pk
            except AttributeError:  # No channel visible
                context['props'] = {
                    "selected": -1,
                    "channels": [],
                    "messages": [],
                    "channel_pk": -1,
                    "can_manage": self.request.user.has_perm(
                                    'impactchat.manage_channels'
                                )
                }
                return context



        selected = None
        pk = None
        channels = Channel.objects.filter(visible=True)
        channelsJSON = [i.getJSON() for i in channels]
        for idx, i in enumerate(channels):
            if i.pk == kwargs['channelpk']:
                selected = idx
                pk = i.pk
                break

        messages = Channel.objects.filter(pk=pk).first()
        if messages is not None:
            messages = messages.getMessagesJSON(limit=50)['messages']

        context['props'] = {
            "selected": selected,
            "channels": channelsJSON,
            "messages": messages,
            "channel_pk": pk,
            "can_manage": self.request.user.has_perm(
                            'impactchat.manage_channels'
                         )
        }

        return context
