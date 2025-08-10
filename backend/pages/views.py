# pages/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class PagesView(APIView):
    def get(self, request):
        return Response({
            "home": "Welcome to the Travel Journal!",
            "about": {
                "title": "About Us",
                "description": "Travel Journal is your digital companion for capturing and sharing your travel adventures. Whether you're exploring bustling cities, hiking mountain trails, or enjoying quiet sunsets, we make it easy to document your journey and connect with fellow travelers."
            },
            "contact": {
                "title": "Contact Us",
                "email": "contact@traveljournal.com",
                "instagram": "@traveljournal",
                "twitter": "@traveljournal"
            }
        })
