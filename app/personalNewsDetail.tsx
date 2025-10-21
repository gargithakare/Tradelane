import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PersonalNewsDetail } from '../src/components/PersonalNewsDetail';
import { NewsItem } from '../src/data/mockNews';

export default function PersonalNewsDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { news } = route.params as { news: NewsItem };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#0B63FF" />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900 flex-1 ml-4">Details</Text>
        <View />
      </View>

      <PersonalNewsDetail
        nameOfStock={news.nameOfStock}
        ticker={news.ticker}
        headline={news.headline}
        date={news.date}
        newsContent={news.newsContent}
      />
    </SafeAreaView>
  );
}
