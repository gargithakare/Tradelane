import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddStockModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (stockName: string, dateBought: string) => void;
}

export function AddStockModal({ visible, onClose, onAdd }: AddStockModalProps) {
  const [stockName, setStockName] = useState('');
  const [dateBought, setDateBought] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModalContent, setShowModalContent] = useState(true);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setShowModalContent(true);
    }

    if (selectedDate) {
      setDateBought(selectedDate);
    }
  };

  const handleOpenDatePicker = () => {
    if (Platform.OS === 'android') {
      setShowModalContent(false);
    }
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
    if (Platform.OS === 'android') {
      setShowModalContent(true);
    }
  };

  const handleAdd = () => {
    if (!stockName.trim()) {
      Alert.alert('Error', 'Please enter a stock name');
      return;
    }
    onAdd(stockName, dateBought.toISOString().split('T')[0]);
    setStockName('');
    setDateBought(new Date());
    onClose();
  };

  const handleCancel = () => {
    setStockName('');
    setDateBought(new Date());
    onClose();
  };

  return (
    <>
      <Modal visible={visible && showModalContent} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-gray-900 mb-6">Add Stock</Text>

            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Stock Name</Text>
              <TextInput
                placeholder="Enter stock name (e.g., Apple Inc.)"
                value={stockName}
                onChangeText={setStockName}
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Date Bought</Text>
              <Pressable
                onPress={handleOpenDatePicker}
                className="border border-gray-300 rounded-lg px-4 py-3 flex-row items-center justify-between"
              >
                <Text className="text-base text-gray-900">{dateBought.toLocaleDateString()}</Text>
                <Text className="text-lg">📅</Text>
              </Pressable>
            </View>

            {showDatePicker && Platform.OS === 'ios' && (
              <View className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <DateTimePicker
                  value={dateBought}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor="#000000"
                />
                <Pressable
                  onPress={handleCloseDatePicker}
                  className="bg-blue-500 rounded-lg py-2 items-center"
                >
                  <Text className="text-white font-semibold">Done</Text>
                </Pressable>
              </View>
            )}

            <View className="flex-row gap-3 pt-4 border-t border-gray-200">
              <Pressable
                onPress={handleCancel}
                className="flex-1 border border-gray-400 rounded-lg py-3 items-center"
              >
                <Text className="text-base font-semibold text-gray-700">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAdd}
                className="flex-1 bg-blue-600 rounded-lg py-3 items-center"
              >
                <Text className="text-base font-semibold text-white">Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={dateBought}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </>
  );
}
