import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

function Input({ text, value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${text}`}
        value={value} // Properti untuk mengatur nilai dari luar
        onChangeText={onChangeText} // Properti untuk mengubah nilai dari luar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
});

export default Input;
