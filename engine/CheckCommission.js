import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckCommission() {
    const [fontsLoaded] = useFonts({
        'Quarter': require('../assets/fonts/Quarter Free.otf'),
    });

    const navigation = useNavigation();

    // Function to navigate back to Home.js with the ID from AsyncStorage
    async function goBack() {
        try {
            const id = await AsyncStorage.getItem('USER_ID');  // Replace 'userId' with the key you used to store the ID
            if (id) {
                navigation.navigate('Home', { id });  // Pass the ID to Home.js
            }
        } catch (error) {
            console.error('Failed to retrieve ID from AsyncStorage', error);
        }
    }

    function petrol() {
        navigation.replace('Petrol');
    }

    function diesel() {
        navigation.replace('Deisel');
    }

    return (
        <View style={styles.container}>
            {/* Go Back button */}
            <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
            {
            /* <TouchableOpacity onPress={petrol} style={styles.button}>
                <Text style={styles.buttonText}>Petrol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={diesel} style={styles.button}>
                <Text style={styles.buttonText}>Diesel</Text>
            </TouchableOpacity> */
            }
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
    goBackButton: {
        position: 'absolute',
        top: 40,  // Adjust to position the button at the top
        left: 20,  // Adjust to position the button at the left
        backgroundColor: '#CCED00',
        padding: 10,
        borderRadius: 10
    },
    goBackText: {
        fontFamily: 'Quarter',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#CCED00',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Quarter',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
});