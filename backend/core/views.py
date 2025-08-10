from rest_framework import viewsets
from .models import TravelData
from .serializers import TravelDataSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class TravelDataViewSet(viewsets.ModelViewSet):
    queryset = TravelData.objects.all()
    serializer_class = TravelDataSerializer

@api_view(['GET'])
def page_data(request):
    return Response({
        "home": {
            "title": "Welcome to My Travel Journal",
            "description": "Discover breathtaking destinations from around the world."
        },
        "about": {
            "title": "About Us",
            "description": "We are passionate travelers sharing our experiences and inspiring others to explore the world."
        },
        "contact": {
            "title": "Contact Us",
            "email": "info@traveljournal.com",
            "instagram": "@traveljournal",
            "twitter": "@traveljournal"
        }
    })
