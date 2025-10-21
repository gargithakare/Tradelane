import React from 'react';
import { View, Text, ScrollView } from 'react-native';

interface PersonalNewsDetailProps {
  nameOfStock: string;
  ticker: string;
  headline: string;
  date: string;
  newsContent: string;
}

export function PersonalNewsDetail({
  nameOfStock,
  ticker,
  headline,
  date,
  newsContent,
}: PersonalNewsDetailProps) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white p-5 rounded-xl shadow-md m-4 border border-gray-100">
        <View className="mb-4">
          <Text className="text-sm font-semibold text-blue-600">{nameOfStock} ({ticker})</Text>
        </View>
        
        <Text className="text-2xl font-bold text-gray-900 mb-3">{headline}</Text>
        
        <Text className="text-xs text-gray-500 mb-5">{new Date(date).toLocaleDateString()}</Text>
        
        <View className="bg-gray-50 rounded-lg p-4">
          <Text className="text-base text-gray-700 leading-6">{newsContent}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
