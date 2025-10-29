import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, SafeAreaView, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { StockListItem } from '../src/components/StockListItem';
import { AddStockModal } from '../src/components/AddStockModal';
import { getStoredStocks, addStock } from '../src/utils/asyncStorage';
import { defaultMockStocks, Stock } from '../src/data/mockStocks';
import { colors, shadows } from '../src/utils/theme';

export default function StockListScreen() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    setIsLoading(true);
    const storedStocks = await getStoredStocks();
    const allStocks = storedStocks.length > 0 ? storedStocks : defaultMockStocks;
    setStocks(allStocks);
    setFilteredStocks(allStocks);
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);

  const handleAddStock = async (stockName: string, dateBought: string) => {
    const newStock: Stock = {
      id: Date.now().toString(),
      name: stockName,
      ticker: stockName.substring(0, 4).toUpperCase(),
      dateBought,
      currentPrice: 100,
      buyPrice: 100,
      quantity: 1,
    };

    const updatedStocks = await addStock(newStock);
    setStocks(updatedStocks);
    setFilteredStocks(updatedStocks);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.bg.primary }}
    >
      <View
        className="px-4 py-5 border-b"
        style={{
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.default,
          borderBottomWidth: 1,
          ...shadows.lg,
        }}
      >
        <Text
          className="text-4xl font-bold mb-4"
          style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
        >
          My Stocks
        </Text>

        <View className="flex-row items-center gap-3">
          <View
            className="flex-1 flex-row items-center rounded-lg px-3 py-3 border-2"
            style={[
              {
                backgroundColor: colors.bg.tertiary,
                borderColor: searchFocused ? colors.accent.hover : colors.accent.primary,
              }
            ]}
          >
            <Ionicons name="search" size={18} color={colors.accent.primary} />
            <TextInput
              placeholder="Search stocks…"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 ml-2 text-base"
              placeholderTextColor={colors.text.muted}
              style={{ color: colors.text.primary, fontFamily: 'Inter' }}
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="rounded-lg px-4 py-3 items-center justify-center"
            style={{
              backgroundColor: colors.accent.primary,
              ...shadows.tealglow,
            }}
          >
            <Ionicons name="add" size={22} color={colors.text.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="items-center justify-center py-8">
            <Text style={{ color: colors.text.muted, fontFamily: 'Inter' }}>Loading stocks...</Text>
          </View>
        ) : filteredStocks.length === 0 ? (
          <View className="items-center justify-center py-12">
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.bg.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                ...shadows.md,
              }}
            >
              <Ionicons name="briefcase-outline" size={28} color={colors.accent.primary} />
            </View>
            <Text
              className="text-lg font-semibold"
              style={{ color: colors.text.primary, fontFamily: 'DM Sans' }}
            >
              {searchQuery ? 'No stocks found' : 'No stocks added yet'}
            </Text>
            <Text
              className="text-sm mt-2"
              style={{ color: colors.text.secondary, fontFamily: 'Inter' }}
            >
              {searchQuery ? 'Try a different search' : 'Add your first stock to get started'}
            </Text>
          </View>
        ) : (
          <View className="pb-8">
            {filteredStocks.map((stock) => (
              <StockListItem
                key={stock.id}
                name={stock.name}
                ticker={stock.ticker}
                dateBought={stock.dateBought}
                currentPrice={stock.currentPrice}
                buyPrice={stock.buyPrice}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <AddStockModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddStock}
      />
    </SafeAreaView>
  );
}
