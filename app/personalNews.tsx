import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { mockNewsData } from '../src/data/mockNews';
import { defaultMockStocks } from '../src/data/mockStocks';
import { getStoredStocks } from '../src/utils/asyncStorage';
import { colors, shadows } from '../src/utils/theme';

export default function PersonalNewsScreen() {
  const [personalNews, setPersonalNews] = useState(mockNewsData);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    filterPersonalNews();
  }, []);

  const filterPersonalNews = async () => {
    setIsLoading(true);
    const storedStocks = await getStoredStocks();
    const stocks = storedStocks.length > 0 ? storedStocks : defaultMockStocks;

    const stockTickers = stocks.map((s) => s.ticker);
    const filtered = mockNewsData.filter((news) =>
      stockTickers.some((ticker) => news.ticker === ticker)
    );

    setPersonalNews(filtered.length > 0 ? filtered : mockNewsData.slice(0, 3));
    setIsLoading(false);
  };

  const handleNewsPress = (newsId: string) => {
    const news = mockNewsData.find((n) => n.id === newsId);
    if (news) {
      navigation.navigate('PersonalNewsDetailScreen', { news });
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.bg.primary }}
    >
      <View
        style={{
          height: 120,
          backgroundColor: colors.bg.secondary,
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 16,
          borderBottomColor: colors.border.default,
          borderBottomWidth: 1,
          ...shadows.lg,
        }}
      >
        <Text
          className="text-4xl font-bold"
          style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
        >
          Personal News
        </Text>
        <Text
          className="text-sm mt-2"
          style={{ color: colors.accent.hover, fontFamily: 'Inter' }}
        >
          Updates for your stocks
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {isLoading ? (
            <View className="items-center justify-center py-8">
              <Text style={{ color: colors.text.muted, fontFamily: 'Inter' }}>Loading news...</Text>
            </View>
          ) : personalNews.length === 0 ? (
            <View className="items-center justify-center py-12">
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.bg.secondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  ...shadows.md,
                }}
              >
                <Ionicons name="newspaper-outline" size={28} color={colors.accent.primary} />
              </View>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
              >
                No personalized news
              </Text>
              <Text
                className="text-sm mt-2"
                style={{ color: colors.text.secondary, fontFamily: 'Inter' }}
              >
                Add stocks to see relevant news updates
              </Text>
            </View>
          ) : (
            personalNews.map((news) => (
              <Pressable
                key={news.id}
                onPress={() => handleNewsPress(news.id)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.8 : 1,
                })}
                className="mb-4"
              >
                <View
                  className="rounded-lg p-5 border"
                  style={[
                    {
                      backgroundColor: colors.bg.secondary,
                      borderColor: colors.border.default,
                      borderWidth: 1,
                      ...shadows.lg,
                    }
                  ]}
                >
                  <View style={{ marginBottom: 8 }}>
                    <View
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: colors.accent.primary,
                        marginBottom: 8,
                      }}
                    />
                  </View>
                  <Text
                    className="text-sm font-semibold mb-2"
                    style={{ color: colors.accent.hover, fontFamily: 'Inter' }}
                  >
                    {news.nameOfStock}
                  </Text>
                  <Text
                    className="text-base font-semibold mb-2"
                    style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
                  >
                    {news.headline}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: colors.text.muted, fontFamily: 'Inter' }}
                  >
                    {new Date(news.date).toLocaleDateString()}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
