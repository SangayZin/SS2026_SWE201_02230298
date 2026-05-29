import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import FeedbackBanner from '../components/FeedbackBanner';
import ScreenShell from '../components/ScreenShell';
import { APP_NAME } from '../config/appConfig';
import { useAppStore } from '../store/useAppStore';
import { validateAuthForm } from '../utils/validation';

export default function AuthScreen() {
  const signIn = useAppStore((state) => state.signIn);
  const loading = useAppStore((state) => state.loading.auth);
  const error = useAppStore((state) => state.error);
  const clearFeedback = useAppStore((state) => state.clearFeedback);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (setter, field) => (value) => {
    setter(value);
    setFieldErrors((current) => ({ ...current, [field]: null }));
  };

  const handleSubmit = async () => {
    const errors = validateAuthForm({ email, password });
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await signIn({ email, password });
  };

  return (
    <ScreenShell>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.title}>{APP_NAME}</Text>
          </View>

          <FeedbackBanner
            type="error"
            title="Sign-in issue"
            message={error?.message}
            onPress={clearFeedback}
          />

          <View style={styles.card}>
            <AppTextInput
              label="Email"
              value={email}
              onChangeText={handleChange(setEmail, 'email')}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              error={fieldErrors.email}
            />

            <AppTextInput
              label="Password"
              value={password}
              onChangeText={handleChange(setPassword, 'password')}
              secureTextEntry
              placeholder="Enter password"
              error={fieldErrors.password}
            />

            <AppButton
              label={loading ? 'Signing in...' : 'Sign in'}
              onPress={handleSubmit}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 18,
    paddingVertical: 20,
  },
  hero: {
    gap: 0,
  },
  title: {
    color: '#f8fafc',
    fontSize: 42,
    fontWeight: '900',
  },
  card: {
    gap: 14,
    padding: 18,
    borderRadius: 28,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
});
