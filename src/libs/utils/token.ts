export const generateToken = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
