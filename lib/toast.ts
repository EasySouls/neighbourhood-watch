import { Alert, Platform, ToastAndroid } from 'react-native';

export function showToast(message: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'web') {
    alert(message);
  } else {
    Alert.alert(message);
  }
}
