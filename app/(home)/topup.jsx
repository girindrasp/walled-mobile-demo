import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

export default function Topup() {
  const [amount, setAmount] = useState(0);

    const handleTopUp = async () => {
        try {
            const response = await fetch('https://walled-api.vercel.app/transactions/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Top up successful');
            } else {
                Alert.alert('Error', 'Top up failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred');
        }
    };

  return (
    <View style={styles.container}>
      <Amount marginBottom={24} />
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#19918F" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "BYOND Pay" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <Input text={"Notes"} />

      <View style={styles.button}>
        <Button text={"Top Up"} marginTop={150} />
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

  picker: {
    width: "100%",
    marginBottom: 24,
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
