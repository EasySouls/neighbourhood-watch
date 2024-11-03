/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Tabs } from 'expo-router';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarIcon from '@/TabBarIcon';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  return (
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Duties',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconName="car"
              color={color}
              name="Szolgálatok"
              focused={focused}
            />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Naptár',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconName="calendar"
              color={color}
              name="Naptár"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="department"
        options={{
          title: 'Osztály',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconName="building"
              color={color}
              name="Osztály"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconName="user"
              color={color}
              name="Profil"
              focused={focused}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Ionicons
                name="log-out"
                size={24}
                color="#FFA001"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
