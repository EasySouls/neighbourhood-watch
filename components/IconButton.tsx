import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

type IconButtonProps = {
  icon:
    | 'refresh'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'arrow-back'
    | 'arrow-forward'
    | 'arrow-upward'
    | 'arrow-downward'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt'
    | 'share'
    | 'delete'
    | 'edit'
    | 'add'
    | 'close'
    | 'check'
    | 'menu'
    | 'search'
    | 'more-vert'
    | 'more-horiz'
    | 'expand-more'
    | 'expand-less'
    | 'refresh'
    | 'save'
    | 'save-alt';
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
