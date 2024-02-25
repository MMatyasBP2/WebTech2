import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Tattoo Pont Client</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity 
                    style={[styles.button, styles.validateButton]} 
                    onPress={() => navigation.navigate('Validation')}>
                    <Text style={styles.buttonText}>Validate Voucher</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.useButton]} 
                    onPress={() => navigation.navigate('Use')}>
                    <Text style={styles.buttonText}>Use Voucher</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.checkButton]} 
                    onPress={() => navigation.navigate('Check')}>
                    <Text style={styles.buttonText}>Check Voucher</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.specialButton} 
                onPress={() => navigation.navigate('voucherlist')}>
                <Text style={styles.specialButtonText}>Valid Vouchers</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
    },
    headerText: {
        fontSize: 28,
        color: '#333',
        fontWeight: '600',
        marginBottom: 50,
    },
    buttonGroup: {
        width: '100%',
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#E8E8E8',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    validateButton: {
        backgroundColor: '#4CAF50',
    },
    useButton: {
        backgroundColor: '#FFC107',
    },
    checkButton: {
        backgroundColor: '#2196F3',
    },
    specialButton: {
        backgroundColor: '#9C27B0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20,
    },
    specialButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});