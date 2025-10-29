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
          Global News
        </Text>
        <Text
          className="text-sm mt-2"
          style={{ color: colors.accent.hover, fontFamily: 'Inter' }}
        >
          Latest market updates & insights
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
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
