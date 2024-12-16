import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";
import CheckBox from "expo-checkbox";
import Tnc from "./Tnc";

function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      ></Modal>

      <Image source={require("../assets/walledLogo.png")} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar url"
        placeholderTextColor="#aaa"
      />

      <View style={styles.tnc}>
        <CheckBox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#19918F" : undefined}
        />
        <Text style={styles.paragraph}>
          I have read and agree to the{" "}
          <Link href="/Tnc" style={styles.link}>
            Terms and Conditions
          </Link>
        </Text>
      </View>

      <Button text="Register" />

      <View style={styles.link}>
        <Link href="/">Have account? Login here</Link>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    // width: 100,
    // height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  link: {
    width: "100%",
    marginTop: 10,
    marginLeft: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: '#19918F',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  tnc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#19918F',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
  },
  checkbox: {
    margin: 8,
  },
});

export default Register;
