import { View, Image, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={require("../assets/walledLogo.png")} styles = {styles.image}
    />
  );
}

function HomePage() {
  return (
    <View style={styles.container}>
      <Text>HOOOMMMMEEEEEE</Text>
      <Link href={{ pathname: "details", params: { name: "Bacon" } }}>
        Go to Details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 236,
    // height: 5,
  },
});

export default HomePage;
