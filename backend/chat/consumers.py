# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        conv = self.scope['url_route']['kwargs'].get('conversation_id')
        if not conv:
            await self.close()
            return

        try:
            self.conversation_id = int(conv)
        except (TypeError, ValueError):
            await self.close()
            return

        # Ensure conversation exists (create if not)
        await self.ensure_conversation(self.conversation_id)

        self.room_group_name = f"chat_{self.conversation_id}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Send conversation history
        messages = await self.get_conversation_history(self.conversation_id)
        await self.send(text_data=json.dumps({"history": messages}))

    async def disconnect(self, close_code):
        try:
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        except Exception:
            pass

    async def receive(self, text_data=None, bytes_data=None):
        if not text_data:
            return

        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            return

        message = data.get("message")
        username = data.get("username", "Anonymous")
        sender = data.get("sender", "user")

        if not message:
            return

        await self.save_message(self.conversation_id, username, message, sender)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "username": username,
                "sender": sender,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event.get("message"),
            "username": event.get("username"),
            "sender": event.get("sender"),
        }))

    @database_sync_to_async
    def ensure_conversation(self, conversation_id):
        from .models import Conversation
        Conversation.objects.get_or_create(id=conversation_id, defaults={
            "user_identifier": f"user_{conversation_id}"
        })

    @database_sync_to_async
    def get_conversation_history(self, conversation_id):
        from .models import ChatMessage
        qs = ChatMessage.objects.filter(conversation_id=conversation_id).order_by("timestamp")
        return [
            {
                "id": m.id,
                "username": m.username,
                "message": m.message,
                "sender": m.sender,
                "timestamp": m.timestamp.isoformat()
            }
            for m in qs
        ]

    @database_sync_to_async
    def save_message(self, conversation_id, username, message, sender):
        from .models import ChatMessage
        return ChatMessage.objects.create(
            conversation_id=conversation_id,
            username=username,
            message=message,
            sender=sender
        )
