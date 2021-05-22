import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import {
  emitSearch,
  onLeaveChat,
  onStrangerFound,
  emitLeaveChat,
  offStrangerFound,
  offLeaveChat,
} from './api/events';

const App = () => {
  const [stranger, setStranger] = useState(null);

  useEffect(() => {
    onStrangerFound(setStranger);
    onLeaveChat(() => setStranger(null));

    return () => {
      offStrangerFound();
      offLeaveChat();
    };
  }, [setStranger]);

  if (!stranger) return <button onClick={emitSearch}>Find stranger</button>;

  return (
    <>
      <button onClick={() => emitLeaveChat(stranger)}>Leave chat</button>
      <Chat stranger={stranger} />
    </>
  );
};

export default App;
