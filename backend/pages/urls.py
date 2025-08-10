from django.urls import path
from .views import PagesView

urlpatterns = [
    path('', PagesView.as_view())
]