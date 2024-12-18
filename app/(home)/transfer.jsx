import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";

export default function Topup() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false); 
  const [user, setUser] = useState({})
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "https://walled-api.vercel.app/transactions/transfer",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          console.log(res.data.data)
          const user = res.data.data
          setUser(user)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const data = [
    { label: "BYOND Pay", value: "1" },
    { label: "BRI Pay", value: "2" },
  ];
  // const [value, setValue] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Amount marginBottom={24} />

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
    // position: 'absolute',
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
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
