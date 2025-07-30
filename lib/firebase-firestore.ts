import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our data models
export interface User {
  uid: string;
  email: string;
  displayName: string;
  userType: 'donor' | 'ngo' | 'admin';
  phone?: string;
  address?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FoodDonation {
  id?: string;
  donorId: string;
  donorName: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  expiryDate: Timestamp;
  pickupAddress: string;
  contactPhone: string;
  status: 'available' | 'reserved' | 'picked_up' | 'expired';
  category: string;
  imageUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NGO {
  id?: string;
  uid: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DonationRequest {
  id?: string;
  ngoId: string;
  ngoName: string;
  donationId: string;
  donorId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  message?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User operations
export const createUser = async (userData: Omit<User, 'createdAt' | 'updatedAt'>) => {
  try {
    const userRef = doc(db, 'users', userData.uid);
    const userWithTimestamps = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, userWithTimestamps);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUser = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { user: userSnap.data() as User, error: null };
    }
    return { user: null, error: 'User not found' };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const updateUser = async (uid: string, updates: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Food donation operations
export const createFoodDonation = async (donationData: Omit<FoodDonation, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const donationsRef = collection(db, 'foodDonations');
    const donationWithTimestamps = {
      ...donationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(donationsRef, donationWithTimestamps);
    return { id: docRef.id, success: true, error: null };
  } catch (error: any) {
    return { id: null, success: false, error: error.message };
  }
};

export const getFoodDonations = async (status?: string) => {
  try {
    const donationsRef = collection(db, 'foodDonations');
    let q = query(donationsRef, orderBy('createdAt', 'desc'));
    
    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    const querySnapshot = await getDocs(q);
    const donations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FoodDonation[];
    
    return { donations, error: null };
  } catch (error: any) {
    return { donations: [], error: error.message };
  }
};

export const getDonationById = async (id: string) => {
  try {
    const donationRef = doc(db, 'foodDonations', id);
    const donationSnap = await getDoc(donationRef);
    if (donationSnap.exists()) {
      return { donation: { id: donationSnap.id, ...donationSnap.data() } as FoodDonation, error: null };
    }
    return { donation: null, error: 'Donation not found' };
  } catch (error: any) {
    return { donation: null, error: error.message };
  }
};

export const updateDonation = async (id: string, updates: Partial<FoodDonation>) => {
  try {
    const donationRef = doc(db, 'foodDonations', id);
    await updateDoc(donationRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteDonation = async (id: string) => {
  try {
    const donationRef = doc(db, 'foodDonations', id);
    await deleteDoc(donationRef);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// NGO operations
export const createNGO = async (ngoData: Omit<NGO, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const ngoRef = doc(db, 'ngos', ngoData.uid);
    const ngoWithTimestamps = {
      ...ngoData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ngoRef, ngoWithTimestamps);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getNGOs = async () => {
  try {
    const ngosRef = collection(db, 'ngos');
    const querySnapshot = await getDocs(ngosRef);
    const ngos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as NGO[];
    
    return { ngos, error: null };
  } catch (error: any) {
    return { ngos: [], error: error.message };
  }
};

// Donation request operations
export const createDonationRequest = async (requestData: Omit<DonationRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const requestsRef = collection(db, 'donationRequests');
    const requestWithTimestamps = {
      ...requestData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(requestsRef, requestWithTimestamps);
    return { id: docRef.id, success: true, error: null };
  } catch (error: any) {
    return { id: null, success: false, error: error.message };
  }
};

export const getDonationRequests = async (donorId?: string, ngoId?: string) => {
  try {
    const requestsRef = collection(db, 'donationRequests');
    let q = query(requestsRef, orderBy('createdAt', 'desc'));
    
    if (donorId) {
      q = query(q, where('donorId', '==', donorId));
    }
    
    if (ngoId) {
      q = query(q, where('ngoId', '==', ngoId));
    }
    
    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as DonationRequest[];
    
    return { requests, error: null };
  } catch (error: any) {
    return { requests: [], error: error.message };
  }
};

export const updateDonationRequest = async (id: string, updates: Partial<DonationRequest>) => {
  try {
    const requestRef = doc(db, 'donationRequests', id);
    await updateDoc(requestRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Real-time listeners
export const subscribeToDonations = (callback: (donations: FoodDonation[]) => void) => {
  const donationsRef = collection(db, 'foodDonations');
  const q = query(donationsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const donations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FoodDonation[];
    callback(donations);
  });
};

export const subscribeToUserDonations = (donorId: string, callback: (donations: FoodDonation[]) => void) => {
  const donationsRef = collection(db, 'foodDonations');
  const q = query(
    donationsRef,
    where('donorId', '==', donorId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const donations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FoodDonation[];
    callback(donations);
  });
}; 