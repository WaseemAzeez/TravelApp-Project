from django.contrib import admin
from django.utils.safestring import mark_safe
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import ChatMessage


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("username", "message", "sender", "timestamp")
    readonly_fields = ("chat_history",)

    def chat_history(self, obj=None):
        """Show messages + reply form + auto-refresh via WebSocket"""
        messages = ChatMessage.objects.order_by("timestamp")
        html = """
        <div id='chat-box' style='max-height:300px; overflow:auto; border:1px solid #ccc; padding:10px; background:#fafafa;'>
        """
        for msg in messages:
            color = "#d1ffd6" if msg.sender == "user" else "#e8e8ff"
            html += f"<p style='background:{color}; padding:5px; border-radius:5px;'><b>{msg.username}:</b> {msg.message}</p>"
        html += "</div>"

        html += """
        <form method='post' style='margin-top:10px;'>
            <input type='text' name='reply' style='width:80%; padding:5px;' placeholder='Type reply...'/>
            <button type='submit' style='padding:5px 10px; background:#0077cc; color:white;'>Send</button>
        </form>
        """

        # JS WebSocket script
        html += """
        <script>
        const chatBox = document.getElementById("chat-box");
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.message) {
                const msgDiv = document.createElement("p");
                msgDiv.style.background = data.username === "User" ? "#d1ffd6" : "#e8e8ff";
                msgDiv.style.padding = "5px";
                msgDiv.style.borderRadius = "5px";
                msgDiv.innerHTML = "<b>" + data.username + ":</b> " + data.message;
                chatBox.appendChild(msgDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
            }
        };
        </script>
        """
        return mark_safe(html)

    def change_view(self, request, object_id, form_url='', extra_context=None):
        if request.method == "POST" and "reply" in request.POST:
            reply_text = request.POST.get("reply").strip()
            if reply_text:
                ChatMessage.objects.create(username="Admin", message=reply_text, sender="admin")
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    "chat",
                    {
                        "type": "chat_message",
                        "message": reply_text,
                        "username": "Admin"
                    }
                )
        return super().change_view(request, object_id, form_url, extra_context)
