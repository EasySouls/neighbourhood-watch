import { useQuery } from '@tanstack/react-query';
import { H2, Input, Main, Text, YStack } from 'tamagui';
import { useAuth } from '../../context/AuthContext';
import { fetchDepartmentInfo } from '../../lib/department';
import { Container } from '../../tamagui.config';

export default function DepartmentScreen() {
  const { authState } = useAuth();
  const {} = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchDepartmentInfo(authState?.civilGuard?.departmentId!),
  });

  return (
    <Main>
      <Container />
      <YStack>
        <H2>Department Screen</H2>
        <Input placeholder='Polgárőr keresése' />
      </YStack>
    </Main>
  );
}
