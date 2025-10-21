import React from 'react';
import { View, Text, Pressable } from 'react-native';

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
  const priceChange = currentPrice - buyPrice;
  const percentChange = ((priceChange / buyPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <Pressable onPress={onPress}>
      <View className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">{name}</Text>
          <Text className="text-xs text-gray-500 mt-1">{ticker} • {new Date(dateBought).toLocaleDateString()}</Text>
        </View>
        <View className="items-end">
          <Text className={`text-base font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} ${Math.abs(priceChange).toFixed(2)}
          </Text>
          <Text className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{percentChange}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
