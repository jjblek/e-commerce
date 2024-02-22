import Commerce from '@chec/commerce.js';
// key located in hidden file .env
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);