import { View, Text, StyleSheet } from 'react-native';

export default function Transfer() {
  return (
    <View style={styles.container}>
      <Text>Transfer</Text>
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