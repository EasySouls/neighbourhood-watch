import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../lib/toast';
import React from 'react';

export default function Header() {
  const router = useRouter();
  const { authState } = useAuth();
  const insets = useSafeAreaInsets();

  const onProfilePress = () => {
    if (authState?.authenticated) {
      showToast('You are already logged in!');
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <Image
        source={require('../assets/adaptive-icon.png')}
        style={{ width: 40, height: 40 }}
      />
      <View>
        <Text style={{ color: 'white', fontSize: 18 }}>Header</Text>
        <Text style={{ color: 'white', fontSize: 12 }}>Subtitle</Text>
      </View>
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={require('../assets/icon.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: 'auto',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161622',
  },
});
