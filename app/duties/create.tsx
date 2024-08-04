import { useMutation } from '@tanstack/react-query';
import { CreateDuty, DutyType } from '../../types';
import { startDuty } from '../../lib/duties';
import { Adapt, Button, Input, Label, View, XStack, YStack } from 'tamagui';
import { useState } from 'react';
import { Select } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';

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

  return (
    <YStack gap='$4'>
      <XStack>
        <Label>Szolgálat neve</Label>
        <Input value={newDuty.name} />
      </XStack>

      <XStack>
        <Label>Rendszám</Label>
        <Input value={newDuty.plateNumber} />
      </XStack>

      <XStack>
        <Label>Típus</Label>
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

          <Adapt when='sm' platform='touch'></Adapt>
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
