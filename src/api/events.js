import { io } from 'socket.io-client';

const ENDPOINT = 'kd-alfa.herokuapp.com';

const EVENTS = {
  enterQueue: 'enter_queue',
  leaveQueue: 'leave_queue',
  match: 'match',
  isTyping: 'is_typing',
  sendMessage: 'send_message',
  leaveChat: 'leave_chat',
};

export const socket = io(ENDPOINT);

// Emitters
export const emitSearch = () => {
  socket.emit(EVENTS.enterQueue);
  socket.emit(EVENTS.match);
};

export const emitIsTyping = () => socket.emit(EVENTS.isTyping);

export const emitMessageSend = (message) => socket.emit(EVENTS.sendMessage, message);

export const emitLeaveChat = (strangerId) => socket.emit(EVENTS.leaveChat, strangerId);

// Handlers
export const onIsTyping = (callback) => socket.on(EVENTS.isTyping, callback);

export const onStrangerFound = (callback) => socket.on(EVENTS.match, callback);

export const onLeaveChat = (callback) => socket.on(EVENTS.leaveChat, callback);

export const onMessageReceived = (callback) => socket.on(EVENTS.sendMessage, callback);

// Unsubscribers
export const offIsTyping = () => socket.off(EVENTS.isTyping);

export const offStrangerFound = () => socket.off(EVENTS.match);

export const offLeaveChat = () => socket.off(EVENTS.leaveChat);

export const offMessageReceived = () => socket.off(EVENTS.sendMessage);
