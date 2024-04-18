import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Input } from 'react-native-elements';
import { Link } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      // Todo - enable email verification in Supabase when not testing anymore
      //Alert.alert('Please check your inbox for email verification!');
      Alert.alert('Sign up successful!');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signUpWithEmail()}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
        <Text>Already have an account?</Text>
        <Link href={'/(auth)/login'} style={{ fontWeight: 'bold' }}>
          Log in
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
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
