import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/forms/FormField';
import FormPasswordField from '../../components/forms/FormPasswordField';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { showToast } from '../../lib/toast';
import axios from 'axios';
import LocalStore, { USER_KEY } from '../../lib/store';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID_DEV,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB_DEV,
  });

  async function signInWithEmail() {
    setLoading(true);
    const error = { message: 'Auth not implemented' };

    if (error) {
      showToast(error.message);
    }
    if (!error) {
      router.replace('/');
    }

    setLoading(false);
  }

  async function signInWithGoogle() {
    setLoading(true);
    const user = await LocalStore.getItem(USER_KEY);
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
      await LocalStore.setItem(USER_KEY, JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Error getting user info: ', error);
      showToast('Hiba történt a felhasználói adatok lekérése közben');
    }
  }

  React.useEffect(() => {
    signInWithGoogle();
  }, [response]);

  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {userInfo ? (
        <Image
          source={{ uri: userInfo.picture }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      ) : null}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <FormField
          title='Email'
          value={form.email}
          placeholder='example@email.com'
          onChangeText={(text) => setForm({ ...form, email: text })}
          styles={{ marginTop: 12 }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <FormPasswordField
          title='Jelszó'
          value={form.password}
          placeholder='super-secret-password'
          onChangeText={(text) => setForm({ ...form, password: text })}
          styles={{ marginTop: 12 }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          disabled={loading}
          style={styles.buttonContainer}
          onPress={() => signInWithEmail()}
        >
          <Text style={styles.buttonText}>BELÉPÉS</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          disabled={loading}
          style={styles.googleButtonContainer}
          onPress={() => promptAsync()}
        >
          <Text style={styles.googleButtonText}>BELÉPÉS GOOGLE FIÓKKAL</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.verticallySpaced, { marginTop: 12 }]}>
        <Text style={{ color: 'white', marginLeft: 8 }}>
          Nem vagy még regisztrálva?
        </Text>
        <Link
          href={'/(auth)/signup'}
          style={{
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 8,
            textDecorationLine: 'underline',
            textDecorationColor: 'white',
          }}
        >
          Regisztráció
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
  googleButtonContainer: {
    backgroundColor: 'white',
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
