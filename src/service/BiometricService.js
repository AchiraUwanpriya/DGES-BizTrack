const BIOMETRIC_CREDENTIALS_KEY = "biometric_credentials";
const BIOMETRIC_CRYPTO_KEY = "biometric_crypto_key";
const BIOMETRIC_ENROLLED_KEY = "biometric_enrolled";
const BIOMETRIC_CREDENTIAL_ID_KEY = "biometric_credential_id";

/**
 * Check if the device supports biometric authentication via WebAuthn
 */
const isBiometricAvailable = async () => {
  try {
    if (
      !window.PublicKeyCredential ||
      !navigator.credentials ||
      !window.crypto?.subtle
    ) {
      return false;
    }

    const available =
      await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return available;
  } catch (error) {
    console.error("Biometric availability check failed:", error);
    return false;
  }
};

/**
 * Check if biometric credentials have been enrolled for this device
 */
const hasEnrolledCredentials = () => {
  try {
    return (
      localStorage.getItem(BIOMETRIC_ENROLLED_KEY) === "true" &&
      localStorage.getItem(BIOMETRIC_CREDENTIALS_KEY) !== null &&
      localStorage.getItem(BIOMETRIC_CRYPTO_KEY) !== null &&
      localStorage.getItem(BIOMETRIC_CREDENTIAL_ID_KEY) !== null
    );
  } catch (error) {
    console.error("Error checking enrolled credentials:", error);
    return false;
  }
};

/**
 * Generate a random buffer for WebAuthn challenges
 */
const generateRandomBuffer = (length = 32) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
};

/**
 * Convert ArrayBuffer to Base64 string for localStorage storage
 */
const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

/**
 * Convert Base64 string back to ArrayBuffer
 */
const base64ToArrayBuffer = (base64) => {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Encrypt credentials using Web Crypto API (AES-GCM)
 */
const encryptCredentials = async (serviceNo, password) => {
  try {
    const key = await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const iv = generateRandomBuffer(12);
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify({ serviceNo, password }));

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      data
    );

    const exportedKey = await window.crypto.subtle.exportKey("jwk", key);

    return {
      encrypted: arrayBufferToBase64(encrypted),
      iv: arrayBufferToBase64(iv),
      key: JSON.stringify(exportedKey),
    };
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt credentials");
  }
};

/**
 * Decrypt credentials using Web Crypto API (AES-GCM)
 */
const decryptCredentials = async (encryptedData, ivData, keyData) => {
  try {
    const key = await window.crypto.subtle.importKey(
      "jwk",
      JSON.parse(keyData),
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: base64ToArrayBuffer(ivData) },
      key,
      base64ToArrayBuffer(encryptedData)
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt credentials");
  }
};

/**
 * Create a new biometric credential via WebAuthn API (navigator.credentials.create)
 * This prompts the device/OS to register and save a new passkey/biometric.
 */
const createBiometricCredential = async () => {
  const challenge = generateRandomBuffer(32);
  const userId = generateRandomBuffer(16);

  const publicKeyCredentialCreationOptions = {
    challenge: challenge,
    rp: {
      name: "BizTrack",
      id: window.location.hostname,
    },
    user: {
      id: userId,
      name: "biztrack-user",
      displayName: "BizTrack User",
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
      requireResidentKey: false,
    },
    timeout: 60000,
    attestation: "none",
  };

  const credential = await navigator.credentials.create({
    publicKey: publicKeyCredentialCreationOptions,
  });

  return credential;
};

/**
 * Verify an existing biometric credential via WebAuthn API (navigator.credentials.get)
 * This prompts the device/OS to authenticate the user using the stored credential, without asking to save.
 */
const verifyBiometricCredential = async (storedCredentialId) => {
  const challenge = generateRandomBuffer(32);

  const publicKeyCredentialRequestOptions = {
    challenge: challenge,
    rpId: window.location.hostname,
    allowCredentials: [
      {
        id: base64ToArrayBuffer(storedCredentialId),
        type: "public-key",
      },
    ],
    userVerification: "required",
    timeout: 60000,
  };

  const assertion = await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });

  return assertion !== null;
};

/**
 * Enroll biometric credentials - triggers WebAuthn creation, then encrypts and stores credentials in localStorage
 */
const enrollBiometric = async (serviceNo, password) => {
  try {
    // 1. Trigger the native biometric registration prompt
    const credential = await createBiometricCredential();
    if (!credential) {
      throw new Error("Failed to create biometric credential");
    }

    const credentialId = arrayBufferToBase64(credential.rawId);

    // 2. Encrypt credentials
    const { encrypted, iv, key } = await encryptCredentials(
      serviceNo,
      password
    );

    // 3. Store all required keys in localStorage
    localStorage.setItem(
      BIOMETRIC_CREDENTIALS_KEY,
      JSON.stringify({ encrypted, iv })
    );
    localStorage.setItem(BIOMETRIC_CRYPTO_KEY, key);
    localStorage.setItem(BIOMETRIC_CREDENTIAL_ID_KEY, credentialId);
    localStorage.setItem(BIOMETRIC_ENROLLED_KEY, "true");

    return true;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      throw new Error("Biometric enrollment was cancelled or denied");
    }
    console.error("Biometric enrollment failed:", error);
    throw new Error(error.message || "Failed to enroll biometric credentials");
  }
};

/**
 * Authenticate with biometric and return decrypted credentials
 * Triggers device native biometric assertion (verify only), then decrypts stored credentials on success
 */
const authenticateWithBiometric = async () => {
  try {
    if (!hasEnrolledCredentials()) {
      throw new Error("No biometric credentials enrolled");
    }

    const storedCredentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_ID_KEY);
    if (!storedCredentialId) {
      throw new Error("No biometric credentials enrolled");
    }

    // Trigger device biometric verification (Face ID / Fingerprint / Windows Hello)
    const verified = await verifyBiometricCredential(storedCredentialId);

    if (!verified) {
      throw new Error("Biometric verification failed");
    }

    // Biometric passed - decrypt and return credentials
    const credentialsData = JSON.parse(
      localStorage.getItem(BIOMETRIC_CREDENTIALS_KEY)
    );
    const keyData = localStorage.getItem(BIOMETRIC_CRYPTO_KEY);

    const credentials = await decryptCredentials(
      credentialsData.encrypted,
      credentialsData.iv,
      keyData
    );

    return credentials;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      throw new Error("Biometric authentication was cancelled or denied");
    }
    console.error("Biometric authentication failed:", error);
    throw error;
  }
};

/**
 * Clear all biometric data from localStorage
 */
const clearBiometricData = () => {
  try {
    localStorage.removeItem(BIOMETRIC_CREDENTIALS_KEY);
    localStorage.removeItem(BIOMETRIC_CRYPTO_KEY);
    localStorage.removeItem(BIOMETRIC_CREDENTIAL_ID_KEY);
    localStorage.removeItem(BIOMETRIC_ENROLLED_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear biometric data:", error);
    return false;
  }
};

export default {
  isBiometricAvailable,
  hasEnrolledCredentials,
  enrollBiometric,
  authenticateWithBiometric,
  clearBiometricData,
};
