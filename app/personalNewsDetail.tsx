import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PersonalNewsDetail } from '../src/components/PersonalNewsDetail';
import { colors, shadows } from '../src/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type NewsDetail = {
  nameOfStock: string;
  ticker: string;
  headline: string;
  date: string;
  newsContent: string;
};


export default function PersonalNewsDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { news } = route.params as { news: NewsDetail };

  const queryClient = new QueryClient();


  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.bg.primary }}
    >
      <View
        className="border-b px-4 py-3 flex-row items-center justify-between"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
          borderWidth: 1,
          ...shadows.md,
        }}
      >
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back" size={24} color={colors.accent.primary} />
        </Pressable>
        <Text
          className="text-lg font-bold flex-1 ml-4"
          style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
        >
          Details
        </Text>
        <View />
      </View>

      <QueryClientProvider client={queryClient}>
      <PersonalNewsDetail
        nameOfStock={news.nameOfStock}
        ticker={news.ticker}
        headline={news.headline}
        date={news.date}
        newsContent={news.newsContent}
      />
       </QueryClientProvider>

    </SafeAreaView>
  );
}
