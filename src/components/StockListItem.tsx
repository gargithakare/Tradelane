import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, shadows } from '../utils/theme';

interface StockListItemProps {
  name: string;
  ticker: string;
  dateBought: string;
  currentPrice: number;
  buyPrice: number;
  onPress?: () => void;
}

export function StockListItem({
  name,
  ticker,
  dateBought,
  currentPrice,
  buyPrice,
  onPress,
}: StockListItemProps) {
  const [isPressed, setIsPressed] = useState(false);
  const priceChange = currentPrice - buyPrice;
  const percentChange = ((priceChange / buyPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        className={`rounded-md p-4 mb-3 flex-row items-center justify-between border transition-all duration-200 ${
          isPressed ? 'scale-98' : 'scale-100'
        }`}
        style={[
          {
            backgroundColor: colors.neutral[50],
            borderColor: colors.deep.blue,
            borderWidth: 1,
            ...shadows.md,
          }
        ]}
      >
        <View className="flex-1">
          <Text
            className="font-semibold text-base"
            style={{ color: colors.primary.dark }}
          >
            {name}
          </Text>
          <Text
            className="text-xs mt-2"
            style={{ color: colors.neutral[500] }}
          >
            {ticker} • {new Date(dateBought).toLocaleDateString()}
          </Text>
        </View>
        <View className="items-end ml-4">
          <Text
            className="text-base font-semibold font-mono"
            style={{ color: isPositive ? colors.status.success : colors.status.error }}
          >
            {isPositive ? '↑' : '↓'} ${Math.abs(priceChange).toFixed(2)}
          </Text>
          <Text
            className="text-xs mt-1"
            style={{ color: isPositive ? colors.status.success : colors.status.error }}
          >
            {isPositive ? '+' : ''}{percentChange}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
