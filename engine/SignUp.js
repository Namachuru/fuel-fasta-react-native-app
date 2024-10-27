import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Modal, Pressable } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { db } from '../config';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'USER_ID';

export default function SignUp() {
    const [fontsLoaded] = useFonts({
        'Quarter': require('../assets/fonts/Quarter Free.otf'),
    });

    const navigation = useNavigation();
    
    const [availableVehicleTypes] = useState([
        { vehicle: 'Bike' },
        { vehicle: 'Bajaj' },
        { vehicle: 'Taxi' },
        { vehicle: 'Mini-Van' }
    ]);  // Example vehicle types

    const [filterVehicleType, setFilterVehicleType] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    function create() {
        if (!name || !surname || !vehicleType || !plateNumber) {
            alert('Please fill out all fields.');
            return;
        }

        setLoading(true);

        const usersRef = ref(db, 'users');
        const newUserRef = push(usersRef);
        const newUserID = newUserRef.key;

        set(newUserRef, {
            id: newUserID,
            name: name,
            surname: surname,
            vehicle_type: vehicleType,
            plate_number: plateNumber
        }).then(async () => {
            try {
                // Store UserID in AsyncStorage
                await AsyncStorage.setItem(USER_ID_KEY, newUserID); // Use the same key
                setLoading(false);
                alert('Data submitted');

                // Navigate to Home and pass the user ID
                navigation.replace('Home', { id: newUserID });
            } catch (error) {

            }
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error adding user data:', error);
        });
    }

    const onVehicleSelected = (value) => {
        setVehicleType(value);
        setModalVisible(false); // Close the modal
    };

    const renderVehicleTypeDropdown = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Select Vehicle Type</Text>
                    <FlatList
                        data={availableVehicleTypes}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => onVehicleSelected(item.vehicle)}>
                                <Text style={styles.modalItem}>{item.vehicle}</Text>
                            </Pressable>
                        )}
                        keyExtractor={item => item.vehicle}
                    />
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Register with Fuel Fasta:</Text>

            <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.textBoxes} />
            <TextInput value={surname} onChangeText={setSurname} placeholder="Surname" style={styles.textBoxes} />
            
            <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
                <Text style={styles.dropdownText}>{vehicleType || "Select Vehicle Type"}</Text>
            </TouchableOpacity>

            {renderVehicleTypeDropdown()}

            <TextInput value={plateNumber} onChangeText={setPlateNumber} placeholder="Plate No." style={styles.textBoxes} />

            {loading ? (
                <ActivityIndicator size="large" color="#CCED00" />
            ) : (
                <TouchableOpacity onPress={create} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B2B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontFamily: 'Quarter',
        fontSize: 36,
        color: 'white',
        marginBottom: 10
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
    },
    dropdown: {
        width: '90%',
        backgroundColor: 'white',
        padding: 12,
        borderColor: '#CCED00',
        borderWidth: 3.6,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },
    dropdownText: {
        fontFamily: 'Quarter',
        fontSize: 18,
        color: 'black'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Dark background for modal
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontFamily: 'Quarter',
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    modalItem: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%'
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#CCED00',
        borderRadius: 5
    },
    closeButtonText: {
        fontFamily: 'Quarter',
        color: 'white',
        fontWeight: 'bold'
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
