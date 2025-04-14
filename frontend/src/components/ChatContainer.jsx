import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'

const ChatContainer = () => {
  const { messages, getMessage, isMessagesLoading, selectedUser } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
    }
  }, [selectedUser?._id]);

  if (isMessagesLoading) return <div>Loading...</div>;

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <p>messages...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
