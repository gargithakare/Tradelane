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
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <View
        style={{
          height: 100,
          backgroundColor: colors.primary.dark,
          paddingHorizontal: 16,
          paddingTop: 16,
          ...shadows.lg,
        }}
      >
        <Text
          className="text-3xl font-bold"
          style={{ color: 'white' }}
        >
          Personal News
        </Text>
        <Text
          className="text-sm mt-2"
          style={{ color: colors.highlight.yellow }}
        >
          Updates for your stocks
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <View className="pb-8">
          {isLoading ? (
            <View className="items-center justify-center py-8">
              <Text style={{ color: colors.neutral[500] }}>Loading news...</Text>
            </View>
          ) : personalNews.length === 0 ? (
            <View className="items-center justify-center py-12">
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: colors.neutral[100],
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Ionicons name="newspaper-outline" size={28} color={colors.accent.teal} />
              </View>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.primary.dark }}
              >
                No personalized news
              </Text>
              <Text
                className="text-sm mt-2"
                style={{ color: colors.neutral[500] }}
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
                  opacity: pressed ? 0.7 : 1,
                })}
                className="mb-4"
              >
                <View
                  className="rounded-lg p-5 border"
                  style={[
                    {
                      backgroundColor: 'white',
                      borderColor: colors.deep.blue,
                      borderWidth: 1.5,
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
                        backgroundColor: colors.accent.teal,
                        marginBottom: 8,
                      }}
                    />
                  </View>
                  <Text
                    className="text-sm font-semibold mb-2"
                    style={{ color: colors.accent.teal }}
                  >
                    {news.nameOfStock}
                  </Text>
                  <Text
                    className="text-base font-semibold mb-2"
                    style={{ color: colors.primary.dark }}
                  >
                    {news.headline}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: colors.neutral[400] }}
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
