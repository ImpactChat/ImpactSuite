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
from django.contrib import admin
from django.urls import include, path

urlpatterns = []
try:
    urlpatterns = [
        path('admin/doc/', include('django.contrib.admindocs.urls')),
        path('admin/', admin.site.urls),

        # path('i18n/', include('django.conf.urls.i18n')),


        path('chat/', include(('impactchat.urls', 'impactchat'),
                            namespace='impactchat')),
        
        path('api/impactadmin/', include(('impactadmin.urls-api', 'impactadmin'),
                        namespace='impactadmin-api')),

        path('', include(('impactadmin.urls', 'impactadmin'),
                        namespace='impactadmin'))
    ]
except Exception as e:
    print(e)
