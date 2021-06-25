export const emitterType = {
  plain: 'plain',
  gif: 'gif',
  question: 'question',
  info: 'info',
};

export const emitterTemplate = (content, type = emitterType.plain) => ({
  content,
  tail: { type },
});
