# chat/models.py
from django.db import models

class Conversation(models.Model):
    user_identifier = models.CharField(max_length=255)

class ChatMessage(models.Model):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    username = models.CharField(max_length=255)
    message = models.TextField()
    sender = models.CharField(
        max_length=10,
        choices=(("user", "User"), ("admin", "Admin"))
    )
    timestamp = models.DateTimeField(auto_now_add=True)
