import { View, StyleSheet, TextInput, Text } from "react-native";
import React, { useState } from "react";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white'
    },
    input: {
        fontSize: 40,
        flex: 1, // Tambahkan agar input menggunakan ruang yang tersedia
    },
    money: { 
        flexDirection: 'row', 
        borderBottomColor: '#b3b3b3', 
        borderBottomWidth: 0.5,
        alignItems: 'center', // Pastikan IDR dan input sejajar
    },
    idr: { 
        fontSize: 16, 
        marginRight: 12, 
        marginTop: 12 
    }
});

export default function Amount({ handlePress, balance = 0, showBalance = false, marginTop = 0, marginBottom = 0 }) {
    const [inputAmount, setInputAmount] = useState("");

    const handleChange = (value) => {
        setInputAmount(value);
        handlePress(value); // Memanggil fungsi yang diteruskan dari parent (Topup.js)
    };

    return (
        <View style={{ ...styles.container, marginTop: marginTop, marginBottom: marginBottom }}>
            <Text style={{ color: '#b3b3b3' }}>Amount</Text>
            <View style={styles.money}>
                <Text style={styles.idr}>IDR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="100.000"
                    keyboardType="number-pad"
                    value={inputAmount}
                    onChangeText={handleChange} // Memanggil handleChange saat input berubah
                />
            </View>
            {showBalance &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: '#b3b3b3' }}>Balance </Text>
                    <Text style={{ color: '#19918F' }}>IDR {balance}</Text>
                </View>
            }
        </View>
    );
};
