import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button, Input } from 'react-native-elements';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/forms/FormField';
import FormPasswordField from '../../components/forms/FormPasswordField';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
    if (!error) {
      router.replace('/');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <FormField
          title='Email'
          value={form.email}
          placeholder='example@email.com'
          onChangeText={(text) => setForm({ ...form, email: text })}
          styles='mt-4'
        />
      </View>
      <View style={styles.verticallySpaced}>
        <FormPasswordField
          title='Password'
          value={form.password}
          placeholder='super-secret-password'
          onChangeText={(text) => setForm({ ...form, password: text })}
          styles='mt-4'
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          disabled={loading}
          style={styles.buttonContainer}
          onPress={() => signInWithEmail()}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.verticallySpaced}>
        <Text>Don't have an account yet?</Text>
        <Link href={'/(auth)/signup'} style={{ fontWeight: 'bold' }}>
          Sign Up
        </Link>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
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
    color: '#fff',
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
