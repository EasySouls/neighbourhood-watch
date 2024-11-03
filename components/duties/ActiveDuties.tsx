import { View, Text, FlatList } from 'react-native';
import { Duty } from '../../types';
import React from 'react';

interface ActiveDutiesProps {
  duties: Duty[];
}

export default function ActiveDuties({ duties }: ActiveDutiesProps) {
  return (
    <FlatList
      data={duties}
      renderItem={({ item }) => (
        <View>
          <Text>{item.plate_num}</Text>
          <Text>{item.type}</Text>
          <Text>{item.started_at}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
