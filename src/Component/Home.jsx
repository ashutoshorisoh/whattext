import React from 'react';
import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';

function Home() {
  return (
    <main className='w-full h-screen'>
      <div className="flex h-full">
        <ChatPanel />
        <ChatWindow />
      </div>
    </main>
  );
}

export default Home;
