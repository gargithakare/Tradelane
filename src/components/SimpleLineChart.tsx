import React from 'react';
import { View, Text, Canvas, LayoutChangeEvent } from 'react-native';
import { colors } from '../utils/theme';

interface SimpleLineChartProps {
  data: number[];
  height?: number;
  isPositive?: boolean;
}

export function SimpleLineChart({
  data,
  height = 200,
  isPositive = true,
}: SimpleLineChartProps) {
  if (!data || data.length < 2) {
    return (
      <View
        style={{
          height,
          backgroundColor: colors.bg.secondary,
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: colors.border.default,
          borderWidth: 1,
        }}
      >
        <Text style={{ color: colors.text.secondary, fontFamily: 'Inter' }}>
          No data available
        </Text>
      </View>
    );
  }

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;

  const width = 100;
  const pointSpacing = width / (data.length - 1);

  const points = data.map((value, index) => ({
    x: index * pointSpacing,
    y: ((maxValue - value) / range) * (height * 0.7) + height * 0.15,
  }));

  const pathData = points
    .map((point, index) => (index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`))
    .join(' ');

  const lineColor = isPositive ? colors.status.positive : colors.status.negative;
  const glowColor = isPositive ? colors.status.positive : colors.status.negative;

  return (
    <View
      style={{
        height,
        backgroundColor: colors.bg.secondary,
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
        borderColor: colors.border.default,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: height - 32,
          backgroundColor: colors.bg.primary,
          borderRadius: 8,
          overflow: 'hidden',
          borderColor: colors.border.light,
          borderWidth: 1,
        }}
      >
        {data.map((value, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 8,
              borderRightColor: colors.border.default,
              borderRightWidth: index < data.length - 1 ? 1 : 0,
            }}
          >
            <View
              style={{
                width: '60%',
                height: `${((value - minValue) / range) * 100}%`,
                backgroundColor: lineColor,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                opacity: 0.8,
                shadowColor: glowColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
