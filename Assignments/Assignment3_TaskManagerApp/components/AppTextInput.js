import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function AppTextInput({
  label,
  error,
  style,
  inputStyle,
  ...props
}) {
  return (
    <View style={[styles.field, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#94a3b8"
        style={[styles.input, error && styles.inputError, inputStyle]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    color: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputError: {
    borderColor: '#f87171',
  },
  error: {
    color: '#fca5a5',
    fontSize: 12,
  },
});
