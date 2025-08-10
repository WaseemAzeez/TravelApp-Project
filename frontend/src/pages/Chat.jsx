import { useState, useEffect } from 'react'
import '../styles/Chat.css'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
  const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/')

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    if (data.history) {
      // Load chat history
      setChat(data.history)
    } else if (data.message) {
      setChat(prev => [...prev, { username: data.username, message: data.message }])
    }
  }

  setWs(socket)

  return () => socket.close()
  }, [])

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ username: "User", message }))
      setMessage('')
   }
  }

  return (
    <div className="chat-box">
      <h2>Chat</h2>
      <div className="chat-messages">
        {chat.map((msg, i) => (
          <p key={i}><strong>{msg.user}:</strong> {msg.message}</p>
        ))}
      </div>
      <div className="chat-input">
        <input 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
