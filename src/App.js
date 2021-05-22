import React, { useState } from 'react';
import Message from './components/Message';

const isEmpty = (value) => value.length === 0;

const App = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      setMessages([
        ...messages,
        { id: Date.now(), content: currentMessage, sent: true },
      ]);
      setCurrentMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div style={{ flexGrow: '1', height: '100%' }}>
        {messages.map(({ id, content, sent }) => (
          <Message sent={sent} key={id}>
            {content}
          </Message>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <button type="submit">&rarr;</button>
      </form>
    </div>
  );
};

export default App;
