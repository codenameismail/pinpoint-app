import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Show alert even if app is in foreground
    shouldPlaySound: true, // Play sound
    shouldSetBadge: false, // Don't set app icon badge number
  }),
});

// Request permission for notifications (iOS requires this)
export const registerForNotifications = async () => {
  let token;

  if (Platform.OS === "android") {
    // On Android, set notification channel for Android 8.0+
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask for permission if not already granted
    if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
      console.log("Failed to get push token for notification!");
      return null;
    }

    // Get the Expo push token
    const { data: pushToken } = await Notifications.getExpoPushTokenAsync();
    token = pushToken;

    return token;
  } else {
    console.log("Must use physical device for notifications");
  }

  return token;
};

// Schedule a local notification
export const scheduleLocalNotification = async (
  title,
  body,
  trigger = null,
) => {
  // Default: show immediately
  const notificationTrigger = trigger || null;

  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: "local notification" },
    },
    trigger: notificationTrigger,
  });
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Add a notification listener for when a notification is received
export const addNotificationReceivedListener = async (callback) => {
  return Notifications.addNotificationReceivedListener(callback);
};

// Add a notification listener for when a notification is tapped
export const addNotificationResponseReceivedListener = async (callback) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};

// Schedule a notification for a specific time
export const scheduleTimeNotification = async (title, body, seconds) => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { type: "timed notification" },
    },
    trigger: {
      seconds,
    },
  });
};
