import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  href: string;
  children?: React.ReactNode;
  style?: any;
};

export function ExternalLink({ href, children, style }: Props) {
  async function handlePress() {
    // Open the given URL in the system or in-app browser
    await WebBrowser.openBrowserAsync(href);
  }

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Text style={styles.text}>{children ?? href}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#007AFF',
  },
});
