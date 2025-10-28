import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors, shadows } from '../utils/theme';

interface PersonalNewsDetailProps {
  nameOfStock: string;
  ticker: string;
  headline: string;
  date: string;
  newsContent: string;
}

export function PersonalNewsDetail({
  nameOfStock,
  ticker,
  headline,
  date,
  newsContent,
}: PersonalNewsDetailProps) {
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <View className="m-4">
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: colors.highlight.yellow,
                borderRadius: 4,
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.primary.dark }}
              >
                {ticker}
              </Text>
            </View>
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.accent.teal }}
            >
              {nameOfStock}
            </Text>
          </View>

          <Text
            className="text-2xl font-bold mb-3"
            style={{ color: colors.primary.dark }}
          >
            {headline}
          </Text>

          <Text
            className="text-xs mb-5"
            style={{ color: colors.neutral[500] }}
          >
            {new Date(date).toLocaleDateString()}
          </Text>

          <View
            style={{
              backgroundColor: colors.neutral[50],
              borderRadius: 8,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: colors.accent.teal,
            }}
          >
            <Text
              className="text-base"
              style={{
                color: colors.neutral[700],
                lineHeight: 24,
              }}
            >
              {newsContent}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
