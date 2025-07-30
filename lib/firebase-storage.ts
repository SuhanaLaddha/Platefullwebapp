import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from './firebase';

// Upload image to Firebase Storage
export const uploadImage = async (
  file: File,
  path: string
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

// Upload donation image
export const uploadDonationImage = async (
  file: File,
  donationId: string
): Promise<{ url: string | null; error: string | null }> => {
  const path = `donations/${donationId}/${file.name}`;
  return uploadImage(file, path);
};

// Upload user profile image
export const uploadProfileImage = async (
  file: File,
  userId: string
): Promise<{ url: string | null; error: string | null }> => {
  const path = `profiles/${userId}/${file.name}`;
  return uploadImage(file, path);
};

// Upload NGO logo
export const uploadNGOLogo = async (
  file: File,
  ngoId: string
): Promise<{ url: string | null; error: string | null }> => {
  const path = `ngos/${ngoId}/logo/${file.name}`;
  return uploadImage(file, path);
};

// Delete file from Firebase Storage
export const deleteFile = async (path: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete donation images
export const deleteDonationImages = async (donationId: string): Promise<{ success: boolean; error: string | null }> => {
  try {
    const donationRef = ref(storage, `donations/${donationId}`);
    const result = await listAll(donationRef);
    
    const deletePromises = result.items.map(itemRef => deleteObject(itemRef));
    await Promise.all(deletePromises);
    
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get file size in MB
export const getFileSize = (file: File): number => {
  return file.size / (1024 * 1024);
};

// Validate image file
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, or WebP)' };
  }
  
  if (getFileSize(file) > maxSize) {
    return { valid: false, error: `File size must be less than ${maxSize}MB` };
  }
  
  return { valid: true };
};

// Compress image before upload (client-side)
export const compressImage = async (
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const { width, height } = img;
      let newWidth = width;
      let newHeight = height;
      
      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
      }
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
}; 