import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Use() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('green');

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
    
        try {
            const response = await fetch(`https://europe-west1.gcp.data.mongodb-api.com/app/tattoopontbackend-xwtxj/endpoint/vouchers?id=${data}`, {
                method: 'GET'
            });
            const voucher = await response.json();
    
            if (response.ok && voucher) {
                if (!voucher.IsValid)
                    throw new Error('Voucher is invalid!');
    
                const creationDate = new Date(voucher.CreationDate);
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
                if (creationDate < oneYearAgo) {
                    await fetch(`https://europe-west1.gcp.data.mongodb-api.com/app/tattoopontbackend-xwtxj/endpoint/voucher?id=${data}`, {
                        method: 'DELETE'
                    });
                    throw new Error(`Voucher is older than one year!\nExpiration Date: ${creationDate.toDateString()}`);
                }
    
                await fetch(`https://europe-west1.gcp.data.mongodb-api.com/app/tattoopontbackend-xwtxj/endpoint/voucher?id=${data}`, {
                    method: 'DELETE'
                });
    
                setMessage('Usage went successfully!');
                setMessageColor('green');
            } else {
                throw new Error('Voucher has already been used or does not exist in the database!');
            }
        } catch (error) {
            setMessage(error.message);
            setMessageColor('red');
        }
    };    

    if (hasPermission === null)
        return <Text>Requesting for Camera Permission!</Text>;

    if (hasPermission === false)
        return <Text>No access to open camera!</Text>;

    return (
        <View style={styles.container}>
            {scanned ? (
                <Text style={[styles.message, {color: messageColor}]}>{message}</Text>
            ) : (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
    },
});