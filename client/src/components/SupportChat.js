import React, { useState } from 'react';
import API from '../api/axios';

const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await API.post(
        'https://programming0595.app.n8n.cloud/webhook/cf311870-e2c7-4e19-8c46-880faaaddf46/chat',
        {
          chatInput: userMessage.text
        }
      );

      const botReply =
        typeof res.data === 'string'
          ? res.data
          : res.data.text || 'Sorry, I could not understand that.';

      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '❌ Support is currently unavailable.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#ffc107',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 320,
            height: 420,
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999
          }}
        >
          <div
            style={{
              padding: 10,
              background: '#ffc107',
              fontWeight: 'bold'
            }}
          >
            Customer Support
          </div>

          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: 'auto'
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  textAlign: msg.from === 'user' ? 'right' : 'left'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 10px',
                    borderRadius: 8,
                    background:
                      msg.from === 'user' ? '#007bff' : '#f1f1f1',
                    color: msg.from === 'user' ? '#fff' : '#000'
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div>Typing…</div>}
          </div>

          <div style={{ display: 'flex', padding: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Write a message..."
              style={{ flex: 1, padding: 6 }}
            />
            <button onClick={sendMessage} style={{ marginLeft: 6 }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;
