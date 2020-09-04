import codecs
import csv
from json import loads
import traceback

import django
from django.apps import apps
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.paginator import Paginator
from django.contrib.contenttypes.models import ContentType
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils import translation
from django.utils.decorators import method_decorator
from django.utils import translation
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import View

from django_react_views.views import ReactTemplateView

from .models import Student, User

# pylint: disable=no-member
student_type = ContentType.objects.get(app_label="impactadmin", model="student")
teacher_type = ContentType.objects.get(app_label="impactadmin", model="teacher")
staff_type = ContentType.objects.get(app_label="impactadmin", model="staff")
parent_type = ContentType.objects.get(app_label="impactadmin", model="parent")
class_type = ContentType.objects.get(app_label="impactadmin", model="class")

types = {
    "student": student_type,
    "teacher": teacher_type,
    "staff": staff_type,
    "parent": parent_type,
    "class": class_type,
}

# Note: Table headers are rewritten here to prevent accidental data leakage
relevant_models = {
    "models": [
        {
            "name": _("students"),
            "api-name": "student",
            "count": User.objects.filter(user_role=student_type).count(),
            "api-link:get": reverse_lazy("impactadmin-api:get"),
            "download-link": "/administration/download/student",
            "headers": [
                {
                    "actual": "username",
                    "display": "Username"
                },
                {
                    "actual": "name",
                    "display": "Full name"
                },
                {
                    "actual": "avatar",
                    "display": "Avatar"
                },
            ]
        },
        {
            "name": _("teachers"),
            "api-name": "teacher",
            "count": User.objects.filter(user_role=teacher_type).count(),
            "api-link:get": reverse_lazy("impactadmin-api:get"),
            "download-link": "/administration/download/teacher",
            "headers": [
                {
                    "actual": "username",
                    "display": "Username"
                },
                {
                    "actual": "avatar",
                    "display": "Avatar"
                },
            ]

        },
        {
            "name": _("classes"),
            "api-name": "class",
            "count": User.objects.filter(user_role=class_type).count(),
            "api-link:get": reverse_lazy("impactadmin-api:get"),
            "download-link": "/administration/download/class",
            "headers": [
                {
                    "actual": "name",
                    "display": "Name"
                },
                {
                    "actual": "student-count",
                    "display": "Student Count"
                },
                {
                    "actual": "teacher-count",
                    "display": "Teacher Count"
                },
            ]
        },
        {
            "name": _("parents"),
            "api-name": "parent",
            "count": User.objects.filter(user_role=parent_type).count(),
            "api-link:get": reverse_lazy("impactadmin-api:get"),
            "download-link": "/administration/download/parent",
            "headers": [
                {
                    "actual": "username",
                    "display": "Username"
                },
                {
                    "actual": "avatar",
                    "display": "Avatar"
                },
            ]
        },
        {
            "name": _("staff"),
            "api-name": "staff",
            "count": User.objects.filter(user_role=staff_type).count(),
            "api-link:get": reverse_lazy("impactadmin-api:get"),
            "download-link": "/administration/download/staff",
            "headers": [
                {
                    "actual": "username",
                    "display": "Username"
                },
                {
                    "actual": "avatar",
                    "display": "Avatar"
                },
            ]
        },
    ]
}

class CannotSaveUser(Exception):
    pass

def can_administer(request):
    teacher_type = ContentType.objects.get(app_label="impactadmin", model="teacher")
    staff_type = ContentType.objects.get(app_label="impactadmin", model="staff")
    return (
        request.user.user_role == teacher_type or request.user.user_role == staff_type
    )


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LoginView(ReactTemplateView, UserPassesTestMixin):
    """
    Present the user with a login screen and authenticate him
    """

    react_component = "login.jsx"
    template_name = "impactadmin/login.html"

    # redirect to dashboard if user is already authed
    @method_decorator(
        user_passes_test(
            lambda u: not u.is_authenticated,
            login_url=reverse_lazy("impactadmin:dashboard"),
            redirect_field_name=None,
        )
    )
    def dispatch(self, *args, **kwargs):
        return super(LoginView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        user = authenticate(
            username=request.POST.get("username"), password=request.POST.get("password")
        )
        if user is not None:
            login(request, user)
            redirect_url = request.GET.get("next", None)
            if redirect_url is not None:
                return redirect(redirect_url)
            return redirect("impactadmin:dashboard")
        else:
            messages.warning(request, "Incorrect username or password")
            return redirect("impactadmin:login")


class LogoutView(View):
    """
    Logs out the logged in users if any and redirects to the login page
    """

    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect("impactadmin:login")


class DashboardView(LoginRequiredMixin, ReactTemplateView):
    """
    Present the logged in user with their dashboard, and redirect to the login
    page if they're not logged in
    """

    template_name = "impactadmin/dashboard.html"
    react_component = "dashboard.jsx"

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()
        return context


@method_decorator(ensure_csrf_cookie, name="dispatch")
class ProfileView(LoginRequiredMixin, ReactTemplateView):
    """
    Present the logged in user with their dashboard, and redirect to the login
    page if they're not logged in
    """

    template_name = "impactadmin/dashboard.html"
    react_component = "profile.jsx"

    def post(self, request):
        data = loads(request.body.decode("UTF-8"))
        try:
            request.user.locale = data["language"]
            request.user.save()
        except Exception as e:
            raise e
        # request.user.locale
        return JsonResponse(data)

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()
        translation.activate(self.request.user.locale)
        context["props"] = {
            "curlang": translation.get_language(),
            "availableLang": settings.LANGUAGES,
        }
        return context


@method_decorator(ensure_csrf_cookie, name="dispatch")
class AdministrationView(LoginRequiredMixin, UserPassesTestMixin, ReactTemplateView):
    """
    Display the administration interface to the user given they are in the
    a group with the correct permissions to access it
    """

    template_name = "impactadmin/administration.html"
    react_component = "administration.jsx"

    def test_func(self):
        return can_administer(self.request)

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()
        translation.activate(self.request.user.locale)
        context["props"] = relevant_models
        return context

@method_decorator(ensure_csrf_cookie, name="dispatch")
class AdministrationAdvancedView(LoginRequiredMixin, UserPassesTestMixin, ReactTemplateView):
    """
    Display the administration interface to the user given they are in the
    a group with the correct permissions to access it
    """

    template_name = "impactadmin/administration.html"
    react_component = "advanced.jsx"

    def test_func(self):
        return can_administer(self.request)

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()
        translation.activate(self.request.user.locale)
        context["props"] = relevant_models
        return context


@method_decorator(ensure_csrf_cookie, name="dispatch")
class AdministrationAPIView(LoginRequiredMixin, UserPassesTestMixin, View):
    """
    Return students as a JSON response, supports pagination
    """
    def get(self, request):
        qs = User.objects.filter(user_role=types[request.GET.get("type")])
        p = Paginator(qs, request.GET.get("max", 10))
        objects = []
        count = qs.count()
        try:
            page = p.page(request.GET.get("page", 1))
            for role in page.object_list:
                # try to get the more customized serializer, else fallback 
                # on default one
                try:
                    objects.append(role.role_data.getJSON())
                except AttributeError:
                    objects.append(role.getJSON())
        except django.core.paginator.EmptyPage:
            objects = [None]

        data = {
            "items": objects,
            "count": count,
            "min_page": 1,
            "max_page": p.num_pages,
        }

        return JsonResponse(data)


    def post(self, request):
        f = request.FILES.get("fileupload")
        t = request.POST.get("type")

        if t == "student":
            csvfile = csv.DictReader(codecs.iterdecode(f, 'utf-8'))
            first_name = ['First Name', 'First name', 'first_name']
            last_name = ['Last Name', 'Last name', 'last_name']
            
            for line in csvfile:
                u = User.objects.create_user(line.get('Username', line.get('username')), line.get('Email', line.get('email')), "hello")
                s = Student.objects.create()


                try:
                    for key in line:
                        if key is None:
                            continue
                        if key.lstrip('\ufeff') in first_name:
                            fname = line[key]
                            u.first_name = fname
                        elif key.lstrip('\ufeff') in last_name:
                            lname = line[key]
                            u.last_name = lname
                except Exception as e:
                    u.delete()
                    s.delete()
                    traceback.print_exc()
                    return JsonResponse({
                            "sucess": "no"
                    })
 
                u.role_data = s
                u.save()
                

        return JsonResponse({
            "sucess": "yes"
        })


    def test_func(self):
        return can_administer(self.request)


class DownloadModelsView(LoginRequiredMixin, UserPassesTestMixin, View):
    def test_func(self):
        return can_administer(self.request)


    def get(self, request, model):
        model_class = apps.get_model(app_label="impactadmin",
                                     model_name=model)

        meta = model_class._meta
        field_names = [field.name for field in meta.fields]
        temp = [field.name for field in meta.fields]

        user_meta = User._meta
        user_field_names = [field.name for field in user_meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta)
        writer = csv.writer(response)

        temp.extend(user_field_names)
        temp.pop(0)
        writer.writerow(temp)
        for obj in model_class.objects.all():
            if obj.user is None:
                continue

            temp = [getattr(obj.user, field) for field in user_field_names]
            temp.extend([getattr(obj, field) for field in field_names])
            row = writer.writerow(temp)

        return response
