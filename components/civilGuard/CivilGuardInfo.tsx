import { Text, View } from 'tamagui';
import { CivilGuardComplete } from '../../types';
import React from 'react';

interface CivilGuardInfoProps {
  civilGuard: CivilGuardComplete;
}

export default function CivilGuardInfo({ civilGuard }: CivilGuardInfoProps) {
  return (
    <View
      padding={8}
      borderColor={'black'}
      borderWidth={1}
      maxWidth={'fit-content'}
      borderRadius={10}
      gap={8}
    >
      <Text>Név: {civilGuard.name}</Text>
      <Text>Email: {civilGuard.account.email}</Text>
      <Text>Osztály: {civilGuard.department.name}</Text>
    </View>
  );
}
