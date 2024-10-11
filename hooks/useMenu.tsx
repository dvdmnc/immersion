import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MENU_STORAGE_KEY = '@menu_items';

interface MenuItem {
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]); // Using MenuItem array

  // Load menu items from AsyncStorage
  const loadMenu = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(MENU_STORAGE_KEY);
      const savedMenu = jsonValue != null ? JSON.parse(jsonValue) : [];
      setMenu(savedMenu); // No need for a class instantiation
    } catch (e) {
      console.error("Failed to load menu", e);
    }
  };

  // Save menu items to AsyncStorage
  const saveMenu = async (menuItems: MenuItem[]) => {
    try {
      const jsonValue = JSON.stringify(menuItems);
      await AsyncStorage.setItem(MENU_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save menu", e);
    }
  };

  // Create a new menu item
  const addMenuItem = async (newItem: MenuItem) => {
    const updatedMenu = [...menu, newItem];
    setMenu(updatedMenu);
    await saveMenu(updatedMenu);
  };

  // Update an existing menu item
  const updateMenuItem = async (index: number, updatedItem: MenuItem) => {
    const updatedMenu = menu.map((item, idx) => (idx === index ? updatedItem : item));
    setMenu(updatedMenu);
    await saveMenu(updatedMenu);
  };

  // Delete a menu item
  const deleteMenuItem = async (index: number) => {
    const updatedMenu = menu.filter((_, idx) => idx !== index);
    setMenu(updatedMenu);
    await saveMenu(updatedMenu);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return {
    menu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};

export default useMenu;
