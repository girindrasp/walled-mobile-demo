import { TextInput, View, StyleSheet, Text } from "react-native";

function Input({text}){
    return(
        <View style={styles.container}>
            <Text style={styles.Input}>{text}</Text>
            <TextInput/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        backgroundColor: "white",

    },
    placeholder: {
        color: "#B3b3b3"
    },
    Input: {
        // padding: 20,
        borderBottomColor: "black",
        height: 50,
        borderBottomWidth: 1,
    }
  });

export default Input;