import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import "../PageStyles/chatPageCSS.css";

function ChatPage() {
  const [messages, setMessages] = useState<{ type: 'user' | 'assistant', text: string }[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userQuery = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userQuery }]);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ query: userQuery }),
      });
      const data = await response.json();
      if (data && data.answer) {
        setMessages(prev => [
          ...prev,
          { type: 'assistant', text: data.answer }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { type: 'assistant', text: 'Sorry, there was an error processing your request.' }
      ]);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <div className="navbarContainer">
        <Navbar />
      </div>
      <div className="container">
        <div className="chatContainer">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`testcomponent ${msg.type === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type your message..."
          />
          <button className="chat-send-btn" onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  )
}

export default ChatPage