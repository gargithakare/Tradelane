import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import '../global.css';
import { NewsCard } from '../src/components/NewsCard';
import { mockNewsData } from '../src/data/mockNews';
import { colors, shadows } from '../src/utils/theme';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

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
          Global News
        </Text>
        <Text
          className="text-sm mt-2"
          style={{ color: colors.highlight.yellow }}
        >
          Latest market updates & insights
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
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
