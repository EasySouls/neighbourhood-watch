import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const FormPasswordField = ({
  title,
  value,
  placeholder,
  onChangeText,
  style,
  textStyle,
  autoCapitalize = 'none',
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        style,
        {
          gap: 8,
        },
      ]}
    >
      <Text style={[{ fontFamily: 'Poppins-Medium', fontSize: 16 }, textStyle]}>
        {title}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#7B7B8B',
          borderRadius: 10,
          padding: 12,
          height: 48,
        }}
        // className='flex border-2 border-gray-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'
      >
        <TextInput
          style={[
            { flex: 1, fontFamily: 'Poppins-SemiBold', fontSize: 16 },
            textStyle,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7B7B8B'
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={24}
            color='#7B7B8B'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormPasswordField;
