export const generateHMACSHA256 = async (key: string | ArrayBuffer, message: string) => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    typeof key === 'string' ? new TextEncoder().encode(key) : key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message));
};

export const convertArrayBufferToHex = (arrayBuffer: ArrayBuffer) => {
  const hashArray = Array.from(new Uint8Array(arrayBuffer));

  return hashArray.map((item) => item.toString(16).padStart(2, '0')).join('');
};
