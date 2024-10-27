import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { storeData, getItemFor, clearStorage } from '../data/storage/StorageHelper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const HAS_LAUNCHED = 'HAS_LAUNCHED';
const USER_ID_KEY = 'USER_ID'; // Key to store/retrieve the user id

export function SplashScreen() {
    const [hasLaunched, setHasLaunched] = useState(null);
    const [fontsLoaded] = useFonts({
        'Quarter': require('../assets/fonts/Quarter Free.otf'),
    });
    const navigation = useNavigation();

    // Initialize Animated Values
    const position = new Animated.ValueXY({ x: -480, y: -680 });
    const position2 = new Animated.ValueXY({ x: 0, y: 0 });
    
    /*useEffect(() => {
        clearStorage();  // This will clear the storage when the app starts
    }, []);*/

    useEffect(() => {
        const getData = async () => {
            try {
                // Check if the app has been launched before
                const hasLaunched = await getItemFor(HAS_LAUNCHED);
                
                if (hasLaunched) {
                    setHasLaunched(true);

                    // Retrieve user id from AsyncStorage if the app has launched before
                    const userId = await AsyncStorage.getItem(USER_ID_KEY);
                    
                    if (userId) {
                        // Delay the navigation to Home to allow the animation to display
                        setTimeout(() => {
                            navigation.replace('Home', { id: userId });
                        }, 5000); // Adjust the timeout to match animation length
                    } else {
                        console.log('No user ID found in storage.');
                    }
                } else {
                    // Set the launched status for first-time users
                    await storeData(HAS_LAUNCHED, "true");
                    setHasLaunched(false);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        if (fontsLoaded && hasLaunched !== null) {
            // Start the animations
            Animated.spring(position, {
                toValue: { x: 0, y: 0 },
                bounciness: 15,
                speed: 1,
                useNativeDriver: true
            }).start();

            Animated.decay(position2, {
                velocity: 0.6,
                deceleration: 0.997,
                isInteraction: false,
                useNativeDriver: true
            }).start();

            const timer = setTimeout(() => {
                if (!hasLaunched) {
                    navigation.replace('SignUp');
                }
            }, 5000); // Adjust the timeout to match the animation duration
            return () => clearTimeout(timer);
        }
    }, [fontsLoaded, hasLaunched, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                transform: [
                    { translateX: position.x },
                    { translateY: position.y }
                ]
            }}>
                <Image style={styles.logo} source={require('../assets/icon.png')} />
            </Animated.View>
            <Animated.View style={{
                transform: [
                    {
                        translateY: position2.y
                    }
                ]
            }}>
                <Text style={styles.title}>Fuel Fasta</Text>
                <Text style={styles.subtitle}>Fuel as you go.</Text>
            </Animated.View>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 180,
        height: 180,
    },
    title: {
        fontFamily: 'Quarter',
        fontSize: 72,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Quarter',
        fontSize: 36,
        textAlign: 'center',
    },
});
