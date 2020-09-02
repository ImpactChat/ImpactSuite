"""impact URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.views.generic.base import RedirectView
from django.urls import reverse_lazy

from .views import AdministrationAdvancedView, AdministrationView, DashboardView, LoginView, LogoutView, ProfileView

urlpatterns = [
    path('',            RedirectView.as_view(
        url=reverse_lazy('impactadmin:login')),     name="redirect-login"),

    path('login/',     LoginView.as_view(),     name="login"),
    path('logout/',    LogoutView.as_view(),    name="logout"),

    path('dashboard/', DashboardView.as_view(), name="dashboard"),
    path('profile/',   ProfileView.as_view(), name="profile"),

    path('administration/detail/',   AdministrationAdvancedView.as_view(), name="detail-admin"),
    path('administration/',   AdministrationView.as_view(), name="administration"),
]
