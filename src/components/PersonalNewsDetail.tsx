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
      style={{ backgroundColor: colors.bg.primary }}
      showsVerticalScrollIndicator={false}
    >
      <View className="m-4">
        <View
          className="rounded-lg p-5 border"
          style={[
            {
              backgroundColor: colors.bg.secondary,
              borderColor: colors.accent.teal,
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
                borderRadius: 6,
              }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.bg.primary, fontFamily: 'Poppins' }}
              >
                {ticker}
              </Text>
            </View>
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.accent.tealLight, fontFamily: 'Poppins' }}
            >
              {nameOfStock}
            </Text>
          </View>

          <Text
            className="text-2xl font-bold mb-3"
            style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
          >
            {headline}
          </Text>

          <Text
            className="text-xs mb-5"
            style={{ color: colors.text.tertiary, fontFamily: 'Poppins' }}
          >
            {new Date(date).toLocaleDateString()}
          </Text>

          <View
            style={{
              backgroundColor: colors.bg.primary,
              borderRadius: 8,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: colors.accent.teal,
            }}
          >
            <Text
              className="text-base"
              style={{
                color: colors.text.secondary,
                lineHeight: 24,
                fontFamily: 'Poppins',
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
