import { useMutation } from '@tanstack/react-query';
import { CreateDuty, DutyType } from '../../../types';
import { startDuty } from '../../../lib/duties';
import { Button, Input, Sheet, XStack, YStack } from 'tamagui';
import React, { useState } from 'react';
import { Select } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

const dutyTypes = [
  { name: '', type: DutyType.PATROL },
  { name: '', type: DutyType.DESK },
  { name: '', type: DutyType.TRAFFIC },
  { name: '', type: DutyType.OTHER },
];

export default function CreateDutyScreen() {
  const [newDuty, setNewDuty] = useState<CreateDuty>({
    name: '',
    type: DutyType.PATROL,
    plateNumber: '',
  });

  const startDutyMutation = useMutation({
    mutationKey: ['duties', 'active'],
    mutationFn: (createDutyReq: CreateDuty) => startDuty(createDutyReq),
  });

  const isNative = true;

  return (
    <YStack gap='$4'>
      <XStack>
        <Input value={newDuty.name} />
      </XStack>

      <XStack>
        <Input value={newDuty.plateNumber} />
      </XStack>

      <XStack>
        <Select
          value={newDuty.type}
          onValueChange={(e) =>
            setNewDuty((duty) => ({ ...duty, type: e as DutyType }))
          }
          disablePreventBodyScroll
        >
          <Select.Trigger width={'$10'} iconAfter={ChevronDown}>
            <Select.Value>{newDuty.type}</Select.Value>
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
                    <Select.ItemText>{item.name}</Select.ItemText>
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
      </XStack>

      <Button
        theme='blue'
        onPress={() => {
          startDutyMutation.mutate(newDuty);
        }}
      >
        Szolgálat kezdése
      </Button>
    </YStack>
  );
}
