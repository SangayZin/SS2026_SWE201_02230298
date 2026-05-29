import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ChoiceChips({ label, value, options, onChange }) {
  return (
    <View style={styles.block}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {options.map((option) => {
          const active = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 10,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    gap: 10,
    paddingRight: 8,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: {
    backgroundColor: '#f8fafc',
    borderColor: '#f8fafc',
  },
  chipText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#0f172a',
  },
});
