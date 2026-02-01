import apiurl from "@/apiUrl/apiUrl";
import { io } from "socket.io-client";

// Prefer environment variable if present (Vite style) with fallback
const SERVER_URL = `${apiurl.imgUrl}`;

let socket = null;

export const connectSocket = (token) => {
  if (!token) {
    console.warn(
      "⚠️ [SOCKET] No token supplied. Aborting socket connection attempt."
    );
    return null;
  }

  if (socket) {
    if (socket.connected) {
      return socket;
    } else {
      socket.disconnect();
      socket = null;
    }
  }

  // NOTE: extraHeaders are NOT sent from browsers; rely on auth payload.
  // Provide both token and Authorization-style key for flexible server parsing.
  socket = io(SERVER_URL, {
    auth: {
      token,
      Authorization: `Bearer ${token}`,
    },
    // Allow polling fallback for initial handshake in case pure websocket is blocked / proxy issue
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 3, // limit attempts
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000,
    timeout: 20000,
    forceNew: true, // ensure a clean new connection instance
  });

  socket.on("connect", () => {});

  socket.on("disconnect", (reason) => {
    console.warn("❌ [SOCKET] Disconnected. Reason:", reason);
    console.warn(
      "❌ [SOCKET] Connected flag after disconnect:",
      socket.connected
    );

    // Common reasons: transport close, transport error, ping timeout, io server disconnect, io client disconnect
    switch (reason) {
      case "io server disconnect":
        console.warn(
          "🔄 [SOCKET] Server initiated disconnect (likely auth failure or manual disconnect). Will attempt clean reconnect once."
        );
        // Avoid tight loop: schedule a single reconnect attempt if attempts remain
        if (
          socket.io._reconnection &&
          socket.io.attempts < socket.io._reconnectionAttempts
        ) {
          setTimeout(() => {
            if (!socket.connected) {
              socket.connect();
            }
          }, 750);
        }
        break;
      case "io client disconnect":
        break;
      case "ping timeout":
        console.warn(
          "⏱️ [SOCKET] Ping timeout - possible network hiccup / backend stall."
        );
        break;
      case "transport close":
        console.warn(
          "🚪 [SOCKET] Transport closed unexpectedly (proxy / network)."
        );
        break;
      default:
        console.warn("⚠️ [SOCKET] Other disconnect reason:", reason);
    }
  });

  socket.on("connect_error", (error) => {
    console.error("🚫 [SOCKET] connect_error:", error?.message, error);
    if (
      error?.message?.toLowerCase().includes("unauthorized") ||
      error?.message === "Authentication error"
    ) {
      console.error(
        "🔐 [SOCKET] Authentication failed. Will not retry further without a new token."
      );
      // Stop further automatic reconnection attempts
      socket.io._reconnection = false;
    }
  });

  socket.on("reconnect_failed", () => {
    console.error(
      "🚫 [SOCKET] Reconnection failed after 3 attempts - giving up"
    );
  });

  // Add authentication error handling
  socket.on("auth_error", (error) => {
    console.error("🔐 [SOCKET] auth_error event:", error);
    socket.io._reconnection = false; // prevent pointless retries
  });

  // Low-level engine diagnostics
  if (socket.io?.engine) {
    socket.io.engine.on("close", (reason) => {
      console.warn("🛠 [ENGINE] Close event:", reason);
    });
    socket.io.engine.on("error", (err) => {
      console.error("🛠 [ENGINE] Error event:", err);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
