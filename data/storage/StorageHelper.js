import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, value);
        console.log(`Stored ${key}: ${value}`);
    }
    catch(error) {
        console.log("Error storing data", error);
    }
};

export const getItemFor = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key);
        console.log(`Retrieved ${key}: ${value}`);
        return value;
    }
    catch(error) {
        console.log("Error getting data", error);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Storage cleared successfully');
    } catch (error) {
        console.log('Error clearing storage', error);
    }
};