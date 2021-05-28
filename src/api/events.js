import { io } from 'socket.io-client';

const ENDPOINT = 'kd-delta.herokuapp.com';

const EVENTS = {
  match: 'match',
  stopMatch: 'stop_match',
  isTyping: 'is_typing',
  sendMessage: 'message',
  leaveChat: 'leave_chat',
  warning: 'warning',
};

export const socket = io(ENDPOINT);

// Emitters

export const emitMatch = () => socket.emit(EVENTS.match);

export const emitStopMatch = () => socket.emit(EVENTS.stopMatch);

export const emitIsTyping = () => socket.emit(EVENTS.isTyping);

export const emitMessageSend = (message) => socket.emit(EVENTS.sendMessage, message);

export const emitLeaveChat = (strangerId) => socket.emit(EVENTS.leaveChat, strangerId);

// Handlers
export const onIsTyping = (callback) => socket.on(EVENTS.isTyping, callback);

export const onStrangerFound = (callback) => socket.on(EVENTS.match, callback);

export const onLeaveChat = (callback) => socket.on(EVENTS.leaveChat, callback);

export const onMessageReceived = (callback) => socket.on(EVENTS.sendMessage, callback);

export const onWarning = (callback) => socket.on(EVENTS.warning, callback);

// Unsubscribers
export const offIsTyping = () => socket.off(EVENTS.isTyping);

export const offStrangerFound = () => socket.off(EVENTS.match);

export const offLeaveChat = () => socket.off(EVENTS.leaveChat);

export const offMessageReceived = () => socket.off(EVENTS.sendMessage);

export const offWarning = (callback) => socket.on(EVENTS.warning, callback);
