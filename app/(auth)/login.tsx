import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'tamagui';
import { Link, useRouter } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FormField from '../../components/forms/FormField';
import FormPasswordField from '../../components/forms/FormPasswordField';
import { StatusBar } from 'expo-status-bar';
import { showToast } from '../../lib/toast';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../components/useColorScheme';
import { useOAuth } from '@clerk/clerk-expo';

export default function LoginScreen() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const { onLogin } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log('createdSessionId: ', createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.error('Error logging in with google: ', error);
      showToast('Hiba történt a bejelentkezés közben');
    }
  };

  async function signInWithEmail() {
    setLoading(true);
    const res = await onLogin?.(form.email, form.password);
    console.log('login result: ', res);

    if (res?.error) {
      console.log('Error logging in: ', res.error);
      showToast('Hibás email vagy jelszó. Kérlek próbáld újra.');
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace('/(app)/');
  }

  const colorScheme = useColorScheme();
  const textStyle =
    colorScheme === 'dark' ? styles.darkThemeText : styles.lightThemeText;
  const buttonTextStyle =
    colorScheme === 'dark' ? styles.darkThemeText : styles.lightThemeText;
  const loginTextStyle =
    colorScheme === 'dark' ? styles.lightThemeText : styles.darkThemeText;
  const signupLinkStyle =
    colorScheme === 'dark'
      ? { color: 'white', textDecorationColor: 'white' }
      : { color: 'black', textDecorationColor: 'black' };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <View style={{ ...styles.container, marginTop: insets.top }}>
        <View style={{ ...styles.verticallySpaced, ...styles.mt20 }}>
          <FormField
            title="Email"
            value={form.email}
            placeholder="example@email.com"
            onChangeText={(text) => setForm({ ...form, email: text })}
            style={{ marginTop: 12, ...styles.verticallySpaced }}
            textStyle={textStyle}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <FormPasswordField
            title="Jelszó"
            value={form.password}
            placeholder="super-secret-password"
            onChangeText={(text) => setForm({ ...form, password: text })}
            style={{ marginTop: 12, ...styles.verticallySpaced }}
            textStyle={textStyle}
          />
        </View>
        <View
          style={{ ...styles.verticallySpaced, ...styles.mt20, width: '40%' }}
        >
          <TouchableOpacity
            disabled={loading}
            style={styles.buttonContainer}
            onPress={() => signInWithEmail()}
          >
            <Text style={{ ...styles.buttonText, ...loginTextStyle }}>
              BELÉPÉS
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ ...styles.verticallySpaced, ...styles.mt20, width: '40%' }}
        >
          <TouchableOpacity
            disabled={loading}
            style={styles.googleButtonContainer}
            onPress={() => handleGoogleLogin()}
          >
            <Text style={{ ...styles.googleButtonText, ...buttonTextStyle }}>
              BELÉPÉS GOOGLE FIÓKKAL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.verticallySpaced, marginTop: 12 }}>
          <Text style={{ marginLeft: 8, ...textStyle }}>
            Nem vagy még regisztrálva?
          </Text>
          <Link
            href={'/(auth)/signup'}
            style={{ ...styles.signupLink, ...signupLinkStyle }}
          >
            Regisztráció
          </Link>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '50%',
    backgroundColor: '#1d3557',
    padding: 12,
    borderRadius: 10,
    margin: 8,
  },
  googleButtonContainer: {
    width: '50%',
    backgroundColor: 'white',
    padding: 12,
    borderColor: '#1d3557',
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
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
  signupLink: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  googleButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  verticallySpaced2: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt20: {
    marginTop: 20,
  },
});
