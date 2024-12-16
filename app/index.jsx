import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/walledLogo.png")} style={styles.logo} />

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

      <Link href="/(home)">
        <Button text= "Login" bgColor="#19918F"/>
      </Link>

      <Link href="/(home)" style={styles.linkText}>
        Masuk
      </Link>


      <View style={styles.link}>
        <Link  href="/register">
        Don't have account? Register here
        </Link>
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
    width: '100%',
    marginTop: 10,
    marginLeft: 20,
    alignItems: "flex-start",
    justifyContent: 'flex-start'
  }
});
