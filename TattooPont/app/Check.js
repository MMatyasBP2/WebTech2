import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Check() {
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
            const response = await fetch(`https://europe-west1.gcp.data.mongodb-api.com/app/tattoopontbackend-xwtxj/endpoint/vouchercreationdate?id=${data}`, {
                method: 'GET'
            });

            if (response.ok) {
                const voucherData = await response.json();
                if (!voucherData || Object.keys(voucherData).length === 0 || !voucherData.CreationDate)
                    throw new Error('Voucher is not in the database or missing creation date!');

                const creationDate = new Date(voucherData.CreationDate);
                const expirationDate = new Date(creationDate);
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);

                const currentDate = new Date();
                const timeDiff = expirationDate.getTime() - currentDate.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if (daysRemaining > 0) {
                    setMessage(`Checking went successfully!\nVoucher expires in ${daysRemaining} day(s)\nExpiry date: ${expirationDate}.`);
                    setMessageColor('green');
                } else {
                    setMessage('Voucher is not found in the database!');
                    setMessageColor('red');
                }
            } else
                throw new Error('Voucher is not found in the database!');
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