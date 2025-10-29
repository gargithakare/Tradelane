import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, shadows } from '../utils/theme';

interface NewsCardProps {
  headline: string;
  summary: string;
  date: string;
  onPress?: () => void;
}

export function NewsCard({ headline, summary, date, onPress }: NewsCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
      className="mb-4"
    >
      <View
        className="rounded-lg p-5 transition-all duration-300 border"
        style={[
          {
            backgroundColor: colors.bg.secondary,
            borderColor: isPressed ? colors.accent.tealLight : colors.accent.teal,
            borderWidth: 1.5,
            ...shadows.lg,
          }
        ]}
      >
        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.accent.tealLight,
              marginBottom: 8,
            }}
          />
        </View>
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
        >
          {headline}
        </Text>
        <Text
          className="text-sm mt-2"
          style={{ color: colors.text.secondary, lineHeight: 20, fontFamily: 'Poppins' }}
        >
          {summary}
        </Text>
        <Text
          className="text-xs mt-3"
          style={{ color: colors.text.tertiary, fontFamily: 'Poppins' }}
        >
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
}
