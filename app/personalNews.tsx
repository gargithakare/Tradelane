import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { colors, shadows } from "../src/utils/theme";
import type { PersonalNewsStackParamList } from "./myStocks";

type PersonalNewsRouteProp = RouteProp<
  PersonalNewsStackParamList,
  "PersonalNewsScreen"
>;
type PersonalNewsNavigationProp = StackNavigationProp<
  PersonalNewsStackParamList,
  "PersonalNewsScreen"
>;

interface NewsItem {
  desc: string;
  dt: string;
  attchmntFile?: string;
}

const staticNewsData: NewsItem[] = [
  {
    desc: "Analysts/Investor Meet/Conference Call Updates",
    dt: "20251025",
    attchmntFile: "https://example.com/report1.pdf",
  },
  {
    desc: "Quarterly Results Announcement for Q2 2025",
    dt: "20251018",
    attchmntFile: "https://example.com/report2.pdf",
  },
  {
    desc: "Company releases ESG sustainability report",
    dt: "20250928",
    attchmntFile: "",
  },
];

export default function PersonalNewsScreen() {
  const route = useRoute<PersonalNewsRouteProp>();
  const navigation = useNavigation<PersonalNewsNavigationProp>();
  const { stock } = route.params;

  const [personalNews, setPersonalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/announcements/${stock.ticker}`
        );
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setPersonalNews(data);
      } catch {
        setPersonalNews(staticNewsData);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonalNews();
  }, [stock.ticker]);

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={colors.accent.teal} />
        <Text className="mt-4 text-gray-600">
          Fetching news for {stock.ticker}...
        </Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 px-5 pt-5">
      <Text className="text-2xl font-bold mb-3 text-black">
        {stock.name} News
      </Text>

      {personalNews.map((news, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("PersonalNewsDetailScreen", {
              news: {
                nameOfStock: stock.name,
                ticker: stock.ticker,
                headline: news.desc,
                date: news.dt,
                newsContent: news.attchmntFile || "No attachment available",
              },
            })
          }
        >
          <View
            className="mb-4 p-4 rounded-2xl"
            style={{ backgroundColor: colors.bg.secondary, ...shadows.md }}
          >
            <Text className="text-base font-semibold text-black mb-1">
              {news.desc}
            </Text>
            <Text className="text-sm text-gray-500 mb-2">{news.dt}</Text>
            {news.attchmntFile ? (
              <Text className="text-blue-500 underline">View Attachment</Text>
            ) : (
              <Text className="text-gray-500 italic">No attachment</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
