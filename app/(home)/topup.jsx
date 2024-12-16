import { View, Text, StyleSheet } from 'react-native';

export default function Topup() {
  return (
    <View style={styles.container}>
      <Text>Ini top up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});