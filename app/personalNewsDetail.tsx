import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PersonalNewsDetail } from '../src/components/PersonalNewsDetail';
import { NewsItem } from '../src/data/mockNews';
import { colors, shadows } from '../src/utils/theme';

export default function PersonalNewsDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { news } = route.params as { news: NewsItem };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <View
        className="border-b px-4 py-3 flex-row items-center justify-between"
        style={{
          backgroundColor: 'white',
          borderColor: colors.deep.blue,
          borderWidth: 1,
          ...shadows.md,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}
          className="p-2"
        >
          <Ionicons name="chevron-back" size={24} color={colors.accent.teal} />
        </Pressable>
        <Text
          className="text-lg font-bold flex-1 ml-4"
          style={{ color: colors.primary.dark }}
        >
          Details
        </Text>
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
