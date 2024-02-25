import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';

export default function VoucherList() {
    const [couponCount, setCouponCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchCouponCount();
    }, []);

    const fetchCouponCount = async () => {
        setRefreshing(true);
        try {
            const response = await fetch(`https://europe-west1.gcp.data.mongodb-api.com/app/tattoopontbackend-xwtxj/endpoint/validvouchers`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data && typeof data.count === 'number') {
                setCouponCount(data.count);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchCouponCount} />
            }>
            <View style={styles.countContainer}>
                <Text style={styles.countText}>Number of valid vouchers: {couponCount}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countContainer: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 20,
    },
    countText: {
        fontSize: 18,
    },
});