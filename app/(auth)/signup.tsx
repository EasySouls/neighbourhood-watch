import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { showToast } from '../../lib/toast';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/forms/FormField';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithCode() {
    setLoading(true);
    const error = { message: 'Auth not implemented' };

    setTimeout(() => {}, 1000);

    if (error) {
      showToast(error.message);
    } else {
      showToast('Sign up successful! Please log in.');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.verticallySpaced,
          { color: 'white', fontSize: 24, marginTop: 20, marginBottom: 20 },
        ]}
      >
        Lépj be az email címeddel és a kapott kóddal
      </Text>
      <FormField
        title='Kód'
        value={code}
        onChangeText={(e) => setCode(e)}
        placeholder='******'
        styles={{ marginTop: 12 }}
      />
      <FormField
        title='Email'
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder='example@gmail.com'
        styles={{ marginTop: 12 }}
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          disabled={loading}
          style={styles.buttonContainer}
          onPress={() => signUpWithCode()}
        >
          <Text style={styles.buttonText}>ELLENŐRZÉS</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <ActivityIndicator
          size='large'
          color='#0070f3'
          style={styles.verticallySpaced}
        />
      )}
      <StatusBar style='auto' backgroundColor='#161622' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
    height: '100%',
    display: 'flex',
  },
  buttonContainer: {
    backgroundColor: '#0070f3',
    padding: 12,
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
