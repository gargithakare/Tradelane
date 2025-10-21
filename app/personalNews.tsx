import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import '../global.css';
import { mockNewsData } from '../src/data/mockNews';
import { defaultMockStocks } from '../src/data/mockStocks';
import { getStoredStocks } from '../src/utils/asyncStorage';

export default function PersonalNewsScreen() {
  const [personalNews, setPersonalNews] = useState(mockNewsData);
  const navigation = useNavigation<any>();

  useEffect(() => {
    filterPersonalNews();
  }, []);

  const filterPersonalNews = async () => {
    const storedStocks = await getStoredStocks();
    const stocks = storedStocks.length > 0 ? storedStocks : defaultMockStocks;
    
    const stockTickers = stocks.map((s) => s.ticker);
    const filtered = mockNewsData.filter((news) =>
      stockTickers.some((ticker) => news.ticker === ticker)
    );
    
    setPersonalNews(filtered.length > 0 ? filtered : mockNewsData.slice(0, 3));
  };

  const handleNewsPress = (newsId: string) => {
    const news = mockNewsData.find((n) => n.id === newsId);
    if (news) {
      navigation.navigate('PersonalNewsDetailScreen', { news });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Personal News</Text>
        
        <View className="pb-8">
          {personalNews.length === 0 ? (
            <View className="items-center justify-center py-8">
              <Text className="text-gray-500">
                Add stocks to see personalized news
              </Text>
            </View>
          ) : (
            personalNews.map((news) => (
              <Pressable
                key={news.id}
                onPress={() => handleNewsPress(news.id)}
              >
                <View className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-100">
                  <Text className="text-base font-semibold text-blue-600 mb-2">
                    {news.nameOfStock}
                  </Text>
                  <Text className="text-base font-semibold text-gray-900 mb-2">
                    {news.headline}
                  </Text>
                  <Text className="text-sm text-gray-500">
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
