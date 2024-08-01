import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query } from 'firebase/firestore';
import { firestore } from '../firebase';

// Function to update and retrieve the current inventory
export const updateInventory = async () => {
  // Create a query for the 'inventory' collection
  const snapshot = query(collection(firestore, 'inventory'));

  // Get documents from Firestore
  const docs = await getDocs(snapshot);
  const inventoryList = [];

  // Iterate over each document and push its data into the inventoryList
  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,  // Document ID (item name)
      ...doc.data(), // Document data (quantity)
    });
  });

  return inventoryList; // Return the list of inventory items
};

// Function to add an item with a specified quantity
export const addItem = async (item, quantity) => {
  // Create a reference to the Firestore document for the specified item
  const docRef = doc(collection(firestore, 'inventory'), item);

  // Get the current document snapshot
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Document exists; get the existing quantity
    const { quantity: existingQuantity } = docSnap.data(); // Extract current quantity from document

    // Update the document with the new quantity
    await setDoc(docRef, { quantity: existingQuantity + quantity }); // Increment existing quantity
  } else {
    // Document does not exist; create a new one with the specified quantity
    await setDoc(docRef, { quantity }); // Set initial quantity for new item
  }
};

// Function to remove an item or decrement its quantity
export const removeItem = async (item) => {
  // Create a reference to the Firestore document for the specified item
  const docRef = doc(collection(firestore, 'inventory'), item);

  // Get the current document snapshot
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Document exists; get the current quantity
    const { quantity } = docSnap.data();

    if (quantity === 1) {
      // If quantity is 1, delete the document
      await deleteDoc(docRef);
    } else {
      // Otherwise, decrement the quantity
      await setDoc(docRef, { quantity: quantity - 1 });
    }
  }
};

