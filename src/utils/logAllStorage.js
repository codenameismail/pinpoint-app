import AsyncStorage from "@react-native-async-storage/async-storage";

// A simple function to log everything in storage
export const logAllStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log(result);
  } catch (error) {
    console.error("Error logging storage", error);
  }
};
