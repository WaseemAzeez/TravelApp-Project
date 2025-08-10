from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Your apps
    path('api/core/', include('core.urls')),
    path('api/pages/', include('pages.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/users/', include('users.urls')),  # Auth routes

]
