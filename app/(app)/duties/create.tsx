import { useMutation } from '@tanstack/react-query';
import { CreateDuty, DutyType } from '../../../types';
import { getOwnActiveDuty, startDuty } from '../../../lib/duties';
import {
  Button,
  Input,
  Label,
  Paragraph,
  Sheet,
  XStack,
  YStack,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Select } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from 'context/AuthContext';
import { showToast } from 'lib/toast';

const dutyTypes = [
  { name: 'Járőrözés', type: DutyType.PATROL },
  { name: 'Esemény', type: DutyType.EVENT },
  { name: 'Irodai munka', type: DutyType.DESK },
  { name: 'Forgalom', type: DutyType.TRAFFIC },
  { name: 'Egyéb', type: DutyType.OTHER },
];

type CreateDutyType = {
  name: string;
  type: (typeof dutyTypes)[number];
  plateNumber: string;
};

type Errors = {
  name: string | null;
  plateNumber: string | null;
  type: string | null;
};

export default function CreateDutyScreen() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function isThereActiveDuty() {
      const activeDuty = await getOwnActiveDuty(
        authState?.civilGuard?.id!,
        authState?.civilGuard?.departmentId!
      );

      if (activeDuty) {
        showToast('Már van egy aktív szolgálatod!');
        router.back();
      }
    }

    isThereActiveDuty();
  }, []);

  const [newDuty, setNewDuty] = useState<CreateDutyType>({
    name: '',
    type: dutyTypes[0],
    plateNumber: '',
  });
  const [errors, setErrors] = useState<Errors>({
    name: null,
    type: null,
    plateNumber: null,
  });

  const startDutyMutation = useMutation({
    mutationKey: ['duties', 'active'],
    mutationFn: (createDutyReq: CreateDuty) => startDuty(createDutyReq),
  });

  const isNative = Platform.OS !== 'web';

  function handleStartNewDuty() {
    let hasError = false;

    if (newDuty.name === '') {
      setErrors((errors) => ({ ...errors, name: 'Nem lehet üres a név' }));
      hasError = true;
    } else {
      setErrors((errors) => ({ ...errors, name: null }));
    }

    if (newDuty.plateNumber === '') {
      setErrors((errors) => ({
        ...errors,
        plateNumber: 'Nem lehet üres a rendszám',
      }));
      hasError = true;
    } else {
      setErrors((errors) => ({ ...errors, plateNumber: null }));
    }

    if (newDuty.type === null) {
      setErrors((errors) => ({
        ...errors,
        type: 'Válaszd ki a szolgálat típusát',
      }));
      hasError = true;
    } else {
      setErrors((errors) => ({ ...errors, type: null }));
    }

    if (!hasError) {
      const duty: CreateDuty = {
        name: newDuty.name,
        type: newDuty.type.type,
        plateNumber: newDuty.plateNumber,
      };
      startDutyMutation.mutate(duty, {
        onSuccess: () => {
          showToast('Szolgálat sikeresen elkezdve');
          router.back();
        },
      });
    }
  }

  return (
    <YStack gap='$4' padding='$4'>
      <XStack gap='$2'>
        <Label htmlFor='name'>Szolgálat neve</Label>
        <Input
          value={newDuty.name}
          id='name'
          onChangeText={(e) => setNewDuty((duty) => ({ ...duty, name: e }))}
        />
        {errors.name && <Paragraph color='red'>{errors.name}</Paragraph>}
      </XStack>

      <XStack gap='$2'>
        <Label htmlFor='plateNumber'>Rendszám</Label>
        <Input
          value={newDuty.plateNumber}
          id='plateNumber'
          onChangeText={(e) =>
            setNewDuty((duty) => ({ ...duty, plateNumber: e }))
          }
        />
        {errors.plateNumber && (
          <Paragraph color='red'>{errors.plateNumber}</Paragraph>
        )}
      </XStack>

      <XStack gap='$2'>
        <Label htmlFor='type'>Szolgálat típusa</Label>
        <Select
          value={newDuty.type.type}
          onValueChange={(e) =>
            setNewDuty((duty) => ({
              ...duty,
              type: dutyTypes.find((d) => d.type === e)!,
            }))
          }
          disablePreventBodyScroll
          id='type'
        >
          <Select.Trigger width={'$10'} iconAfter={ChevronDown}>
            <Select.Value>{newDuty.type.name}</Select.Value>
          </Select.Trigger>

          <Select.Adapt when='sm' platform='touch'>
            <Sheet
              native={isNative}
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Select.Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation='lazy'
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Select.Adapt>

          <Select.Content zIndex={2000}>
            <Select.ScrollUpButton
              alignItems='center'
              justifyContent='center'
              position='relative'
              width='100%'
              height='$3'
            >
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
            </Select.ScrollUpButton>

            <Select.Viewport
              animation='quick'
              animateOnly={['transform', 'opacity']}
              enterStyle={{ o: 0, y: -10 }}
              exitStyle={{ o: 0, y: 10 }}
              minWidth={200}
            >
              <Select.Group>
                {dutyTypes.map((item, i) => (
                  <Select.Item index={i} key={item.type} value={item.type}>
                    <Select.ItemText color='black'>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft='auto'>
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>

              {isNative && (
                <YStack
                  position='absolute'
                  right={0}
                  top={0}
                  bottom={0}
                  alignItems='center'
                  justifyContent='center'
                  width={'$4'}
                  pointerEvents='none'
                >
                  <ChevronDown size={20} />
                </YStack>
              )}
            </Select.Viewport>

            <Select.ScrollDownButton
              alignItems='center'
              justifyContent='center'
              position='relative'
              width='100%'
              height='$3'
            >
              <YStack zIndex={10}>
                <ChevronDown size={20} />
              </YStack>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
        {errors.type && <Paragraph color='red'>{errors.type}</Paragraph>}
      </XStack>

      <Button
        theme='blue'
        width={'$16'}
        maxWidth={'50%'}
        onPress={() => handleStartNewDuty()}
      >
        Szolgálat kezdése
      </Button>
    </YStack>
  );
}
