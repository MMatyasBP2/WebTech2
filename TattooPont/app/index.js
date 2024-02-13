import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function index() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Tattoo Pont Client</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Validate Voucher' 
                    onPress={() => navigation.navigate('Validation')}
                />
                <Button 
                    title='Use Voucher' 
                    onPress={() => navigation.navigate('Use')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20
    }
});