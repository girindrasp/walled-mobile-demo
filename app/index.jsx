import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import Button from "../components/Button";
import { Link, useNavigation } from "expo-router";
import { z } from "zod";
import { useState } from "react";
import axios, { Axios } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from 'react';

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(() => {});

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      setToken(res);
      const config = {
        headers: { Authorization: `bearer ${token}` },
      };
      console.log(config);
      axios
        .get(`${BASE_URL}/auth/profile`, config)
        .then(function (res) {
          console.log(res.data);
          setProfile(res.data);
          return res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, [token, setToken, setProfile]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form);
      console.log("masukkk");
      const res = await axios.post(
        "http://walled-api.vercel.app/auth/login",
        form
      );
      console.log(res.data.data.token, "ini pras");
      await AsyncStorage.setItem("token", res.data.data.token);
      navigation.navigate("(home)");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setServerError(err.response.data.message || "An error occurred");
          } else if (err.request) {
            setServerError("Network error. Please try again later.");
            console.error("Network Error:", err.request);
          } else {
            setServerError("An unexpected error occurred.");
            console.error("Request Setup Error:", err.message);
          }
        } else if (err?.errors) {
          const errors = {};
          err.errors.forEach((item) => {
            const key = item.path[0];
            errors[key] = item.message;
          });
          setErrors(errors);
        } else {
          setServerError("An unknown error occurred.");
          console.error("Unhandled Error:", err);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/walledLogo.png")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
        value={form.email}
      />
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}

      <TextInput
        style={[styles.input, errorMsg.password && styles.inputError]}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
        value={form.password}
      />
      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}

      <Button handlePress={handleSubmit} text="Login" bgColor="#19918F" />

      <Link handlePress={handleSubmit} href="/(home)" style={styles.linkText}>
        Masuk
      </Link>

      <View style={styles.link}>
        <Link href="/register">Don't have account? Register here</Link>
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
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
    marginTop: 5,
  },
});