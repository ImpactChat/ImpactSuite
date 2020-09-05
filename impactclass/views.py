from django.contrib.auth.mixins import LoginRequiredMixin

from django_react_views.views import ReactTemplateView

# Create your views here.
class HomeView(LoginRequiredMixin, ReactTemplateView):
    template_name = "impactclass/index.html"
    react_component = "home.jsx"
