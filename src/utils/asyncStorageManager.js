import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Logs all key-value pairs currently in AsyncStorage to the console.
 * Useful for debugging the contents of your device's storage.
 */
export const logAllStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    console.log("--- AsyncStorage Contents ---");
    if (result.length === 0) {
      console.log("Storage is empty.");
    } else {
      // Parse the JSON strings for better readability
      const parsedResult = result.map(([key, value]) => [
        key,
        JSON.parse(value),
      ]);
      console.log(Object.fromEntries(parsedResult));
    }
    console.log("---------------------------");
  } catch (error) {
    console.error("Failed to log storage contents.", error);
  }
};

/**
 * Clears all data from AsyncStorage for your app.
 * This will remove all persisted state.
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("✅ AsyncStorage successfully cleared!");
  } catch (e) {
    console.error("Failed to clear AsyncStorage.", e);
  }
};

/**
 * Removes a specific item from AsyncStorage using its key.
 * @param {string} key The key of the item to remove.
 */
export const removeItemFromStorage = async (key) => {
  if (!key) {
    console.error("Error: You must provide a key to remove an item.");
    return;
  }
  try {
    await AsyncStorage.removeItem(key);
    console.log(`✅ Item with key "${key}" was successfully removed.`);
  } catch (e) {
    console.error(`Failed to remove item with key "${key}".`, e);
  }
};

/*
--- HOW TO USE ---

import { 
  logAllStorage, 
  clearAllStorage, 
  removeItemFromStorage 
} from './utils/storageManager';

// To see what's in storage:
logAllStorage();

// To delete everything:
clearAllStorage();

// To delete just the draft:
removeItemFromStorage('draft-favorites-storage');

*/
