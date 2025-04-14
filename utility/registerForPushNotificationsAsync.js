import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") { 
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 500, 500, 1000, 500, 1500],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== "granted") {
      throw new Error("Permission not granted to get push token for push notification!");
    }
    
    const projectId = 
      (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.eas && Constants.expoConfig.extra.eas.projectId) ||
      (Constants.easConfig && Constants.easConfig.projectId);
    
    if (!projectId) {
      throw new Error("Project ID not found");
    }
    
    try {
      const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      throw new Error(e.toString());
    }
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}
