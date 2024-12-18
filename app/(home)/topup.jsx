import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Topup() {
  const [amount, setAmount] = useState(0); // Nilai awal amount adalah angka
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: "BYOND Pay", value: "1" },
    { label: "Mandiri", value: "2" },
    { label: "BCA", value: "3" },
  ];

  const handleTopUp = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }
    if (!description) {
      Alert.alert("Error", "Please fill in the description.");
      return;
    }
    if (!value) {
      Alert.alert("Error", "Please select a payment method.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authentication token is missing.");
        return;
      }

      // Request ke server
      const response = await axios.post(
        "https://walled-api.vercel.app/transactions/topup",
        {
          amount: parseFloat(amount),
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Periksa respons dari server
      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);
        Alert.alert("Success", "Top up successful!");
      } else {
        console.log("Server Error:", response.data);
        Alert.alert("Error", response.data.message || "Top up failed.");
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Amount handlePress={(value) => setAmount(value)} marginBottom={24} />

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#19918F" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Payment Method" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value); // Set value dari dropdown
          setIsFocus(false);
        }}
      />

      <Input
        text="Description"
        value={description}
        onChangeText={(text) => setDescription(text)} // Update state description
      />

      <View style={styles.button}>
        <Button handlePress={handleTopUp} text="Top Up" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    margin: 12,
    borderBottomWidth: 0.6,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    alignItems: "center",
    borderRadius: 5,
  },
});
