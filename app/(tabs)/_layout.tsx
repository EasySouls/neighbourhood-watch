import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import Header from '../../components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarIconProps {
  name: string;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}

function TabBarIcon(props: TabBarIconProps) {
  return (
    <View className='items-center justify-center gap-2'>
      <FontAwesome
        size={28}
        style={{ marginBottom: -3 }}
        color={props.color}
        name={props.iconName}
      />
      <Text
        className={`${
          props.focused ? 'font-psemibold' : 'font-pregular'
        } text-xs`}
        style={{ color: props.color }}
      >
        {props.name}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 60 + insets.bottom,
          },
          tabBarShowLabel: false,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: true,
          // header: () => <Header />,
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Duties',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                iconName='car'
                color={color}
                name='Szolgálatok'
                focused={focused}
              />
            ),
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name='info-circle'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name='calendar'
          options={{
            title: 'Naptár',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                iconName='calendar'
                color={color}
                name='Naptár'
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='files'
          options={{
            title: 'Fájlok',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                iconName='file-archive-o'
                color={color}
                name='Fájlok'
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='settings'
          options={{
            title: 'Beállítások',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                iconName='cog'
                color={color}
                name='Beállítások'
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
