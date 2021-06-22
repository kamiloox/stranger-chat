import { io } from 'socket.io-client';
import { emitterTemplate, emitterType } from '../helpers/emitterTemplate';

const ENDPOINT = '192.168.0.8:8080';

const EVENTS = {
  match: 'match',
  stopMatch: 'stop_match',
  isTyping: 'is_typing',
  message: 'message',
  leaveChat: 'leave_chat',
  warning: 'warning',
  question: 'question',
  userId: 'user_id',
};

export const socket = io(ENDPOINT);

// Emitters

export const emitMatch = () => socket.emit(EVENTS.match);

export const emitStopMatch = () => socket.emit(EVENTS.stopMatch);

export const emitIsTyping = () => socket.emit(EVENTS.isTyping);

export const emitGetUserId = () => socket.emit(EVENTS.userId);

export const emitAskQuestion = (askedQuestions) =>
  socket.emit(EVENTS.question, emitterTemplate(askedQuestions, emitterType.question));

export const emitMessage = (message, type) =>
  socket.emit(EVENTS.message, emitterTemplate(message, type));

export const emitLeaveChat = () => socket.emit(EVENTS.leaveChat);

// Handlers
export const onAskQuestion = (callback) => socket.on(EVENTS.question, callback);

export const onIsTyping = (callback) => socket.on(EVENTS.isTyping, callback);

export const onGetUserId = (callback) => socket.on(EVENTS.userId, callback);

export const onStrangerFound = (callback) => socket.on(EVENTS.match, callback);

export const onLeaveChat = (callback) => socket.on(EVENTS.leaveChat, callback);

export const onMessage = (callback) => socket.on(EVENTS.message, callback);

export const onWarning = (callback) => socket.on(EVENTS.warning, callback);

// Unsubscribers
export const offAskQuestion = () => socket.off(EVENTS.question);

export const offIsTyping = () => socket.off(EVENTS.isTyping);

export const offGetUserId = () => socket.off(EVENTS.userId);

export const offStrangerFound = () => socket.off(EVENTS.match);

export const offLeaveChat = () => socket.off(EVENTS.leaveChat);

export const offMessage = () => socket.off(EVENTS.message);

export const offWarning = (callback) => socket.on(EVENTS.warning, callback);
