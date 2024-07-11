import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FormField from '../../components/forms/FormField';
import FormPasswordField from '../../components/forms/FormPasswordField';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { showToast } from '../../lib/toast';
import axios from 'axios';
import LocalStore, { USER_KEY } from '../../lib/store';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../components/useColorScheme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { onLogin } = useAuth();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID_DEV,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB_DEV,
  });

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

    // Need a little bit of delay so the jwt token can be saved
    // If the user is immediately redirected, the token won't be found
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    router.replace('/(app)/');
  }

  async function signInWithGoogle() {
    setLoading(true);
    const user = await LocalStore.getItemAsync(USER_KEY);
    if (user) {
      setUserInfo(JSON.parse(user));
      showToast('Már be vagy jelentkezve!');
      // router.replace('/');
    }

    if (response?.type === 'success') {
      await getUserInfo(response.authentication?.accessToken!);
    }

    setLoading(false);
  }

  async function getUserInfo(token: string) {
    try {
      const res = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data;
      await LocalStore.setItemAsync(USER_KEY, JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Error getting user info: ', error);
      showToast('Hiba történt a felhasználói adatok lekérése közben');
    }
  }

  React.useEffect(() => {
    signInWithGoogle();
  }, [response]);

  // Warm up the browser on android before using it
  React.useEffect(() => {
    if (Platform.OS == 'android') {
      WebBrowser.warmUpAsync();

      return () => {
        WebBrowser.coolDownAsync();
      };
    }
  }, []);

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
      {userInfo ? (
        <Image
          source={{ uri: userInfo.picture }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      ) : null}
      <View style={[styles.container, { marginTop: insets.top }]}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <FormField
            title='Email'
            value={form.email}
            placeholder='example@email.com'
            onChangeText={(text) => setForm({ ...form, email: text })}
            style={[{ marginTop: 12 }, styles.verticallySpaced]}
            textStyle={textStyle}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <FormPasswordField
            title='Jelszó'
            value={form.password}
            placeholder='super-secret-password'
            onChangeText={(text) => setForm({ ...form, password: text })}
            style={[{ marginTop: 12 }, styles.verticallySpaced]}
            textStyle={textStyle}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20, { width: '40%' }]}>
          <TouchableOpacity
            disabled={loading}
            style={styles.buttonContainer}
            onPress={() => signInWithEmail()}
          >
            <Text style={[styles.buttonText, loginTextStyle]}>BELÉPÉS</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.verticallySpaced, styles.mt20, { width: '40%' }]}>
          <TouchableOpacity
            disabled={loading}
            style={styles.googleButtonContainer}
            onPress={() => promptAsync()}
          >
            <Text style={[styles.googleButtonText, buttonTextStyle]}>
              BELÉPÉS GOOGLE FIÓKKAL
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.verticallySpaced, { marginTop: 12 }]}>
          <Text style={[{ marginLeft: 8 }, textStyle]}>
            Nem vagy még regisztrálva?
          </Text>
          <Link
            href={'/(auth)/signup'}
            style={[styles.signupLink, signupLinkStyle]}
          >
            Regisztráció
          </Link>
        </View>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '100%',
    display: 'flex',
  },
  buttonContainer: {
    backgroundColor: '#0070f3',
    padding: 12,
    borderRadius: 10,
    margin: 8,
  },
  googleButtonContainer: {
    backgroundColor: 'white',
    padding: 12,
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
  mt20: {
    marginTop: 20,
  },
});
