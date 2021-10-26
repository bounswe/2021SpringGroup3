const tokenTypes = {
  ACCESS: 'ACCESS',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

const emailTypes = {
  CONFIRMATION: 'CONFIRMATION',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

const enhancementStatuses = {
  WAITING: 'WAITING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REJECTED: 'REJECTED',
  ERROR: 'ERROR',
};

module.exports = {
  tokenTypes,
  emailTypes,
  enhancementStatuses,
};
