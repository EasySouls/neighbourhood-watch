import { View, Text, TextInput, StyleProp, ViewStyle } from 'react-native';

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  styles: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const FormField = ({
  title,
  value,
  placeholder,
  onChangeText,
  styles,
  secureTextEntry = false,
  autoCapitalize = 'none',
}: FormFieldProps) => {
  return (
    <View
      style={[
        styles,
        {
          /* space-y-2 */
        },
      ]}
    >
      <Text
      // className='text-base text-gray-100 font-pmedium'
      >
        {title}
      </Text>

      <View
      // className='border-2 border-gray-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'
      >
        <TextInput
          // className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7B7B8B'
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default FormField;
