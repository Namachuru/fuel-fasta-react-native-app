import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../config'; // Assuming db is correctly configured in config.js
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function Home({ route }) {
  const [fontsLoaded] = useFonts({
    'Quarter': require('../assets/fonts/Quarter Free.otf'),
  });

  const { id } = route.params; // Get the id from navigation params
  const [name, setName] = useState(''); // State to store the user's name
  const [loading, setLoading] = useState(true); // To handle loading state

  const navigation = useNavigation();

  useEffect(() => {
    // Function to get user data from Firebase based on the id
    const getUserData = async () => {
      try {
        const userRef = ref(db, `users/${id}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name); // Set the name from user data
        } else {
          console.log('No user data found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [id]);

  function buyFuel() {
    navigation.replace('BuyFuel');
  }

  function checkCommission() {
    navigation.replace('CheckCommission');
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <Text style={styles.text}>Hi {name}!</Text> // Display the user's name
      )}
      <TouchableOpacity onPress={buyFuel} style={styles.button}>
        <Text style={styles.buttonText}>Fuel Up!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={checkCommission} style={styles.button}>
        <Text style={styles.buttonText}>Commission Points!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B2B'
  },
  text: {
    fontFamily: 'Quarter',
    fontSize: 36,
    color: 'white',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#CCED00',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: 'Quarter',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
