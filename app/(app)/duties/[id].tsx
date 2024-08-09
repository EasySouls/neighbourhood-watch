import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { fetchDuty } from 'lib/duties';
import { H1, Main, Spinner, Text } from 'tamagui';
import React from 'react';

export default function DutyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: duty,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['duty', id],
    queryFn: () => fetchDuty(id),
  });

  const startedAt = new Date(duty!.started_at!);
  const endedAt = new Date(duty!.ended_at!);
  let timespan;
  if (duty?.ended_at) {
    timespan = new Date(endedAt.getTime() - startedAt.getTime());
  } else {
    timespan = new Date(Date.now() - startedAt.getTime());
  }

  return (
    <Main>
      <H1>Információk a szolgálatról</H1>
      {error && <Text>Hiba történt: {error.message}</Text>}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Text>Szolgálat neve: {duty?.name}</Text>
          <Text>Szolgálat kezdve: {duty?.created_at}</Text>
          <Text>
            Szolgálat befejezve: {duty?.ended_at ?? 'Még folyamatban'}
          </Text>
          <Text>Időtartam: {timespan}</Text>
        </>
      )}
    </Main>
  );
}
