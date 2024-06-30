import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  styles: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const FormPasswordField = ({
  title,
  value,
  placeholder,
  onChangeText,
  styles,
  autoCapitalize = 'none',
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
    // className={`space-y-2 ${styles}`}
    >
      <Text
      // className='text-base text-gray-100 font-pmedium'
      >
        {title}
      </Text>

      <View
      // className='flex border-2 border-gray-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'
      >
        <TextInput
          // className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7B7B8B'
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? 'eye' : 'assistive-listening-systems'}
            size={24}
            color='#7B7B8B'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormPasswordField;
