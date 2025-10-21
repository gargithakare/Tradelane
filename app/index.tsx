import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import '../global.css';
import { NewsCard } from '../src/components/NewsCard';
import { mockNewsData } from '../src/data/mockNews';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-3xl font-bold text-gray-900 mb-6">Global News</Text>
        
        <View className="pb-8">
          {mockNewsData.map((news) => (
            <NewsCard
              key={news.id}
              headline={news.headline}
              summary={news.summary}
              date={news.date}
              onPress={() => {
                // Can be extended to show detailed news view
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
