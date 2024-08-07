import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { Input, Paragraph, View } from 'tamagui';

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
          gap: 8,
        },
      ]}
    >
      <Paragraph
        style={[{ fontFamily: 'Poppins-Medium', fontSize: 16 }, textStyle]}
      >
        {title}
      </Paragraph>

      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: '#7B7B8B',
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 48,
        }}
        // className='border-2 border-gray-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'
      >
        <Input
          style={[
            {
              flex: 1,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              width: '100%',
              textAlignVertical: 'center',
            },
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
