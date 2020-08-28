from django import forms
from django.contrib.auth import forms as auth_forms
from .models import User


class UserChangeForm(forms.ModelForm):
    password = auth_forms.ReadOnlyPasswordHashField(label="Password",
        help_text="Raw passwords are not stored, so there is no way to see "
                  "the user's password, but you can change the password "
                  "using <a href=\"password/\">this form</a>.")

    class Meta:
        model = User
        fields = '__all__'
        widgets = {
            'locale': forms.RadioSelect()
            # 'user_permissions': forms.SelectMultiple(),
            # 'groups': forms.SelectMultiple(),
        }


    def __init__(self, *args, **kwargs):
        super(UserChangeForm, self).__init__(*args, **kwargs)
        f = self.fields.get('user_permissions', None)
        if f is not None:
            f.queryset = f.queryset.select_related('content_type')

    def clean_password(self):
        return self.initial["password"]
