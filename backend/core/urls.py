# core/urls.py
from rest_framework.routers import DefaultRouter
from .views import TravelDataViewSet

router = DefaultRouter()
router.register(r'', TravelDataViewSet, basename='traveldata')

urlpatterns = router.urls
