import { useState, useEffect, useRef } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null); // for smooth scroll

  // TEMP: Hardcoded conversation ID for now (replace with dynamic logic if needed)
  const conversationId = 1;

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${conversationId}/`);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.history) {
        setChat(data.history);
      } else if (data.message) {
        setChat((prev) => [
          ...prev,
          { username: data.username, message: data.message }
        ]);
      }
    };

    setWs(socket);

    return () => socket.close();
  }, [conversationId]);

  // Smooth scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && message.trim()) {
      ws.send(JSON.stringify({ username: "User", message }));
      setMessage("");
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Info Section */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> 123 Travel Road, Wanderlust City</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Email:</strong> info@traveljournal.com</p>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        <h3 className="chat-header">Live Chat</h3>
        <div className="chat-box">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`chat-message ${c.username === "User" ? "user" : "admin"}`}
            >
              <strong>{c.username}:</strong> {c.message}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
