// Utility functions for client-side encryption using Web Crypto API

export async function generateEncryptionKey(password) {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("ally_static_salt"), // For demo only. Use a random salt per user in production.
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

export async function encryptData(key, data) {
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedData = encoder.encode(JSON.stringify(data));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedData
  );
  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  };
}

export async function decryptData(key, encryptedData) {
  const { iv, data } = encryptedData;
  const ivArray = new Uint8Array(iv);
  const dataArray = new Uint8Array(data);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivArray },
    key,
    dataArray
  );
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decrypted));
}
