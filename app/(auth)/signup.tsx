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
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../components/useColorScheme';
import { Link } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FormPasswordField from '../../components/forms/FormPasswordField';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const [isValidCode, setIsValidCode] = useState(false);
  const [form, setForm] = useState({ password: '', passwordAgain: '' });

  const { onCodeConfirmSent, onSignUp } = useAuth();

  async function signUpWithCode() {
    setLoading(true);

    const codeAsNum = Number(code);

    const res = await onCodeConfirmSent?.(email, codeAsNum);
    console.log(res);

    if (!res?.isValid) {
      showToast('Hibás kód vagy email cím. Kérlek próbáld újra.');
    } else {
      setIsValidCode(true);
    }

    setLoading(false);
  }

  async function signUp() {
    setLoading(true);

    if (form.password !== form.passwordAgain) {
      showToast('A két jelszó nem egyezik.');
      setLoading(false);
      return;
    }

    const codeAsNum = Number(code);
    const res = await onSignUp?.(email, form.password, codeAsNum);
    console.log(res);

    if (res?.error) {
      showToast('Hiba történt a regisztráció során.');
      return;
    }

    showToast(
      `Sikeres regisztráció ${res?.account?.name} néven! Most már bejelentkezhetsz.`
    );

    setLoading(false);
  }

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const textStyle =
    colorScheme === 'dark' ? styles.darkThemeText : styles.lightThemeText;
  const buttonTextStyle =
    colorScheme === 'dark' ? styles.darkThemeText : styles.lightThemeText;
  const registerTextStyle =
    colorScheme === 'dark' ? styles.lightThemeText : styles.darkThemeText;

  if (isValidCode) {
    return (
      <View style={[styles.container, { marginTop: insets.top }]}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <FormPasswordField
            title='Jelszó'
            value={form.password}
            placeholder='********'
            onChangeText={(text) => setForm({ ...form, password: text })}
            style={[{ marginTop: 12 }, styles.verticallySpaced]}
            textStyle={textStyle}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <FormPasswordField
            title='Jelszó megerősítése'
            value={form.passwordAgain}
            placeholder='super-secret-password'
            onChangeText={(text) => setForm({ ...form, passwordAgain: text })}
            style={[{ marginTop: 12 }, styles.verticallySpaced]}
            textStyle={textStyle}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20, { width: '40%' }]}>
          <TouchableOpacity
            disabled={loading}
            style={styles.buttonContainer}
            onPress={() => signUp()}
          >
            <Text style={[styles.buttonText, registerTextStyle]}>
              REGISZTRÁCIÓ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.verticallySpaced,
          textStyle,
          { fontSize: 24, marginTop: 20, marginBottom: 20 },
        ]}
      >
        Lépj be az email címeddel és a kapott kóddal
      </Text>
      <FormField
        title='Kód'
        value={code}
        onChangeText={(e) => setCode(e)}
        placeholder='******'
        style={[{ marginTop: 12 }, styles.verticallySpaced]}
        textStyle={textStyle}
      />
      <FormField
        title='Email'
        value={email}
        onChangeText={(e) => setEmail(e)}
        placeholder='example@gmail.com'
        style={[{ marginTop: 12 }, styles.verticallySpaced]}
        textStyle={textStyle}
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
    </SafeAreaView>
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
  lightThemeText: {
    color: 'black',
  },
  darkThemeText: {
    color: 'white',
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
