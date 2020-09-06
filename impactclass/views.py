from django.contrib.auth.mixins import LoginRequiredMixin

from django_react_views.views import ReactTemplateView

# Create your views here.
class HomeView(LoginRequiredMixin, ReactTemplateView):
    template_name = "impactclass/index.html"
    react_component = "home.jsx"

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data()


        # if request.user is a student
        classes = self.request.user.role_data.class_set.all()

        # epic list comprehension
        context['props'] = {
            "classes": [
                {
                    "name": sel_class.name,
                    "teachers": [
                        teacher.user.get_full_name() if teacher.user.get_full_name() != "" else teacher.user.username # get teacher display name
                        for teacher in sel_class.teachers.all() # for each teacher in the selected class teacher set
                    ],
                    "pk": sel_class.pk
                } for sel_class in classes # for class in classes the student is in
            ],
        }

        return context

