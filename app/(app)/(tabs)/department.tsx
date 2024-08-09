import { useQuery } from '@tanstack/react-query';
import { H2, Input, View, YStack } from 'tamagui';
import { useAuth } from '../../../context/AuthContext';
import { fetchDepartmentInfo } from '../../../lib/department';
import { Container } from '../../../tamagui.config';
import React from 'react';

export default function DepartmentScreen() {
  const { authState } = useAuth();
  const { data: department } = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchDepartmentInfo(authState.civilGuard!.departmentId),
  });

  return (
    <View>
      <Container />
      <YStack>
        <H2>Department Screen</H2>
        {department && <H2>{department.name}</H2>}
        <Input placeholder="Polgárőr keresése" />
      </YStack>
    </View>
  );
}
