import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface NewsCardProps {
  headline: string;
  summary: string;
  date: string;
  onPress?: () => void;
}

export function NewsCard({ headline, summary, date, onPress }: NewsCardProps) {
  return (
    <Pressable onPress={onPress} className="mb-4">
      <View className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
        <Text className="text-lg font-semibold text-gray-900">{headline}</Text>
        <Text className="text-sm text-gray-700 mt-2">{summary}</Text>
        <Text className="text-xs text-gray-500 mt-3">{new Date(date).toLocaleDateString()}</Text>
      </View>
    </Pressable>
  );
}
