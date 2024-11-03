import { FontAwesome } from '@expo/vector-icons';
import { View, Text } from 'tamagui';
import React from 'react';

interface TabBarIconProps {
  name: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}

export default function TabBarIcon(props: TabBarIconProps) {
  return (
    <View alignItems="center" justifyContent="center" gap="$1">
      <FontAwesome
        size={28}
        style={{ marginBottom: -3 }}
        color={props.color}
        // name={props.focused ? `${props.iconName}-outline` : props.iconName}
        name={props.iconName}
      />
      <Text
        color={props.color}
        fontWeight={props.focused ? 'semibold' : 'regular'}
        fontSize={12}
        focusStyle={{ fontWeight: 'semibold' }}
      >
        {props.name}
      </Text>
    </View>
  );
}
