# chat/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

ChatMessage = apps.get_model('chat', 'ChatMessage')

@receiver(post_save, sender=ChatMessage)
def on_chat_message_saved(sender, instance, created, **kwargs):
    if created:
        print(f"New chat message: {instance.message}")
