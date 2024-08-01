import { useState, useEffect } from 'react';
import { updateInventory, addItem, removeItem } from './inventoryService';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateInventory = async () => {
    const inventoryList = await updateInventory();
    setInventory(inventoryList);
    console.log(inventoryList);
  };

  const handleAddItem = async (item, quantity) => {
    await addItem(item, quantity);
    await handleUpdateInventory();
  };

  const handleRemoveItem = async (item) => {
    await removeItem(item);
    await handleUpdateInventory();
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchOpen = () => setSearchModalOpen(true);
  const handleSearchClose = () => setSearchModalOpen(false);

  useEffect(() => {
    handleUpdateInventory();
  }, []);

  return {
    inventory: filteredInventory,
    open,
    searchModalOpen,
    itemName,
    setItemName,
    itemQuantity,
    setItemQuantity,
    searchQuery,
    setSearchQuery,
    handleOpen,
    handleClose,
    handleAddItem,
    handleRemoveItem,
    handleSearchOpen,
    handleSearchClose,
  };
};
