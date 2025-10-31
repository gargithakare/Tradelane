import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import { colors, shadows } from '../utils/theme';

import { Stock } from '../data/mockStocks';

interface StockListItemProps {
  name: string;
  ticker: string;
  dateBought: string;
  currentPrice: number;
  buyPrice: number;
  onPress?: () => void;
  onLongPress?: () => void;
  stock?: Stock;
}

export function StockListItem({
  name,
  ticker,
  dateBought,
  currentPrice,
  buyPrice,
  onPress,
  onLongPress,
  stock,
}: StockListItemProps) {
  const scale = useSharedValue(1);
  const priceChange = currentPrice - buyPrice;
  const percentChange = ((priceChange / buyPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 10,
      mass: 1,
      stiffness: 120,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      mass: 1,
      stiffness: 120,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { marginBottom: 12 }]}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          className="rounded-lg p-4 flex-row items-center justify-between border"
          style={[
            {
              backgroundColor: colors.bg.secondary,
              borderColor: colors.border.default,
              borderWidth: 1,
              ...shadows.md,
            }
          ]}
        >
          <View className="flex-1">
            <Text
              className="font-semibold text-base"
              style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
            >
              {name}
            </Text>
            <Text
              className="text-xs mt-2"
              style={{ color: colors.text.secondary, fontFamily: 'Inter' }}
            >
              {ticker} • {new Date(dateBought).toLocaleDateString()}
            </Text>
          </View>
          <View className="items-end ml-4">
            <Text
              className="text-base font-semibold"
              style={{
                color: isPositive ? colors.status.positive : colors.status.negative,
                fontFamily: 'Inter',
              }}
            >
              {isPositive ? '+' : ''} ${Math.abs(priceChange).toFixed(2)}
            </Text>
            <Text
              className="text-xs mt-1"
              style={{
                color: isPositive ? colors.status.positive : colors.status.negative,
                fontFamily: 'Inter',
              }}
            >
              {isPositive ? '+' : ''}{percentChange}%
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
