import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, SafeAreaView, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import { StockListItem } from '../src/components/StockListItem';
import { AddStockModal } from '../src/components/AddStockModal';
import { getStoredStocks, addStock } from '../src/utils/asyncStorage';
import { defaultMockStocks, Stock } from '../src/data/mockStocks';

export default function StockListScreen() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">My Stocks</Text>
        
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search stocks…"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-blue-600 rounded-lg px-4 py-2 items-center justify-center"
          >
            <Text className="text-white font-semibold">Add</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {isLoading ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-600">Loading stocks...</Text>
          </View>
        ) : filteredStocks.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-500">
              {searchQuery ? 'No stocks found' : 'No stocks added yet'}
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
