import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "./supabase";

import { generateId } from "./helpers";

/**
 * Uploads an image to a user-specific folder in Supabase Storage.
 * @param uri The local file URI of the image to upload.
 * @returns The public URL of the uploaded image.
 */
export const uploadImage = async (uri, bucketName = "favorites_images") => {
  try {
    // Get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User must be authenticated to upload images");
    }

    // Read the file and prepare for upload
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = decode(base64);

    // Create a unique, robust file path
    const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${user.id}/${generateId()}.${fileExt}`;

    // Upload the file
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, arrayBuffer, {
        contentType: `image/${fileExt}`,
        upsert: false, // Don't overwrite existing files
      });

    if (error) {
      console.error("Supabase upload error:", error.message);
      throw new Error(error.message);
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    // A more specific catch block is good practice
    console.error("Image upload failed:", error);
    // Re-throw a standardized error for the UI layer to handle
    throw new Error(
      `Failed to upload image: ${error.message || "An unknown error occurred"}`,
    );
  }
};
