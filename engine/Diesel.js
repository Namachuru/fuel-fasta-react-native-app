import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

export default function Diesel() {
    const [fontsLoaded] = useFonts({
        'Quarter': require('../assets/fonts/Quarter Free.otf'),
    });

    const navigation = useNavigation();

    const [amount, setAmount] = useState('');
    const diesel = 'Diesel';

    // Function to navigate back to Home.js with the ID from AsyncStorage
    async function goBack() {
        navigation.navigate('BuyFuel');
    }

    function fuel() {
        if (!amount) {
            alert('Please specify the amount of money');
        }
        else {
            navigation.replace('ScanReceipt', { amount, diesel });
        }
            
    }

    return (
        <View style={styles.container}>
            {/* Go Back button */}
            <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>

            <TextInput value={amount} onChangeText={setAmount} placeholder="Amount" style={styles.textBoxes} />
            <TouchableOpacity onPress={fuel} style={styles.button}>
                <Text style={styles.buttonText}>Confirm</Text>
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
    },
    textBoxes: {
        width: '90%',
        backgroundColor: 'white',
        fontFamily: 'Quarter',
        fontSize: 18,
        padding: 12,
        borderColor: '#CCED00',
        borderWidth: 3.6,
        borderRadius: 10,
        marginBottom: 10
    }
});

