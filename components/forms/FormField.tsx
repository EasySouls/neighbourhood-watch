import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

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

const FormField = ({
  title,
  value,
  placeholder,
  onChangeText,
  style,
  textStyle,
  secureTextEntry = false,
  autoCapitalize = 'none',
}: FormFieldProps) => {
  return (
    <View
      style={[
        style,
        {
          /* space-y-2 */
        },
      ]}
    >
      <Text style={[{ fontFamily: 'Poppins-Medium', fontSize: 16 }, textStyle]}>
        {title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#7B7B8B',
          borderRadius: 10,
          padding: 4,
          height: 48,
          width: '50%',
        }}
        // className='border-2 border-gray-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'
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
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default FormField;
