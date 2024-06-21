import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import { useRef } from 'react';

export default function FilesScreen() {
  const [status, requstPermissions] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status == null) {
    return (
      <SafeAreaView>
        <View>
          <Text>You have not enabled access to your device's files</Text>
          <TouchableOpacity onPress={() => requstPermissions()}>
            <Text>Enable access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView></SafeAreaView>
    </GestureHandlerRootView>
  );
}
