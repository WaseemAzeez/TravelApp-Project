# chat/views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class ChatMessageList(APIView):
    def get(self, request):
        return Response({"messages": []})  # Replace with real DB later
