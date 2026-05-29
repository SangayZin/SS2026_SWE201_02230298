import { Pressable, StyleSheet, Text } from 'react-native';

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'secondary' && styles.secondaryLabel,
          variant === 'danger' && styles.dangerLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondary: {
    backgroundColor: '#e2e8f0',
  },
  danger: {
    backgroundColor: '#991b1b',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryLabel: {
    color: '#0f172a',
  },
  dangerLabel: {
    color: '#fff1f2',
  },
  disabledLabel: {
    color: '#cbd5e1',
  },
});
