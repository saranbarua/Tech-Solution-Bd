import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useCallback } from "react";
import { connectSocket, disconnectSocket } from "../utils/socket";
import {
  setConnected,
  addNotification,
  markAsRead,
  clearAllNotifications,
} from "../redux/features/notificationsSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const { notifications, isConnected } = useSelector(
    (state) => state.notifications
  );

  const connectSocketHandler = useCallback(
    (token) => {
      // console.log("🔌 [HOOK] useNotifications connectSocketHandler called");
      // console.log("🔌 [HOOK] Token provided:", token ? "YES" : "NO");
      // console.log(
      //   "🔌 [HOOK] Current socketRef:",
      //   socketRef.current ? "EXISTS" : "NO"
      // );

      if (socketRef.current) {
        // console.log(
        //   "🔌 [HOOK] Socket already exists in ref, skipping connection"
        // );
        return; // Already connected
      }

      // console.log("🔌 [HOOK] Creating new socket connection via hook...");
      const socket = connectSocket(token);
      socketRef.current = socket;

      if (!socket) {
        console.warn("⚠️ [HOOK] socket instance not created");
        return;
      }

      // Defensive: remove existing listeners if any stale
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");

      socket.on("connect", () => {
        // console.log(
        //   "✅ [HOOK] Socket connected event received, updating Redux"
        // );
        dispatch(setConnected(true));
      });

      socket.on("disconnect", () => {
        // console.log(
        //   "❌ [HOOK] Socket disconnected event received, updating Redux"
        // );
        dispatch(setConnected(false));
      });

      let notificationEvents = 0;
      socket.on("notification", (data) => {
        notificationEvents += 1;
        if (!data) {
          console.warn(
            `⚠️ [HOOK] Received empty notification payload (event #${notificationEvents})`
          );
          return;
        }
        const idForLog = data.id || data._id || "(no-id)";
        // console.log(
        //   `📨 [HOOK] Notification event #${notificationEvents} id=${idForLog} type=${
        //     data.type || "(none)"
        //   }`,
        //   data
        // );
        dispatch(addNotification(data));
      });
    },
    [dispatch]
  );

  const disconnectSocketHandler = useCallback(() => {
    // console.log("🔌 [HOOK] Disconnecting socket via hook...");
    if (socketRef.current) {
      disconnectSocket();
      socketRef.current = null;
      dispatch(setConnected(false));
      // console.log("✅ [HOOK] Socket disconnected via hook");
    }
  }, [dispatch]);

  const markNotificationAsRead = useCallback(
    (id) => {
      dispatch(markAsRead(id));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearAllNotifications());
  }, [dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // console.log("🔄 [HOOK] Hook unmounting, cleaning up socket...");
      if (socketRef.current) {
        disconnectSocket();
        socketRef.current = null;
      }
    };
  }, []);

  return {
    notifications,
    isConnected,
    connectSocket: connectSocketHandler,
    disconnectSocket: disconnectSocketHandler,
    markAsRead: markNotificationAsRead,
    clearAll,
  };
};
