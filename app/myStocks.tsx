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
      style={{ backgroundColor: colors.neutral[50] }}
    >
      <View
        className="border-b px-4 py-4"
        style={{
          backgroundColor: 'white',
          borderColor: colors.deep.blue,
          borderWidth: 1,
          ...shadows.md,
        }}
      >
        <Text
          className="text-3xl font-bold mb-4"
          style={{ color: colors.primary.dark }}
        >
          My Stocks
        </Text>

        <View className="flex-row items-center gap-3">
          <View
            className="flex-1 flex-row items-center rounded-md px-3 py-3 border-2"
            style={[
              {
                backgroundColor: colors.neutral[50],
                borderColor: searchFocused ? colors.accent.teal : colors.deep.blue,
              }
            ]}
          >
            <Ionicons name="search" size={18} color={colors.accent.teal} />
            <TextInput
              placeholder="Search stocks…"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 ml-2 text-base"
              placeholderTextColor={colors.neutral[400]}
              style={{ color: colors.primary.dark }}
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="rounded-md px-4 py-3 items-center justify-center"
            style={{
              backgroundColor: colors.accent.teal,
              ...shadows.md,
            }}
          >
            <Ionicons name="add" size={22} color="white" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {isLoading ? (
          <View className="items-center justify-center py-8">
            <Text style={{ color: colors.neutral[500] }}>Loading stocks...</Text>
          </View>
        ) : filteredStocks.length === 0 ? (
          <View className="items-center justify-center py-12">
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.neutral[100],
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Ionicons name="briefcase-outline" size={28} color={colors.accent.teal} />
            </View>
            <Text
              className="text-lg font-semibold"
              style={{ color: colors.primary.dark }}
            >
              {searchQuery ? 'No stocks found' : 'No stocks added yet'}
            </Text>
            <Text
              className="text-sm mt-2"
              style={{ color: colors.neutral[500] }}
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
