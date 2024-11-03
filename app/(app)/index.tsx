import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/(app)/duties/1" asChild>
        <Pressable>
          <Text>Szolgálat 1</Text>
        </Pressable>
      </Link>
      <Text>You are not on duty</Text>

      <Text>There are no active duties</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
