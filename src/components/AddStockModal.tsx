import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert, Platform, Keyboard, Animated, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, shadows } from '../utils/theme';

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
  const [nameInputFocused, setNameInputFocused] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const translateY = useRef(new Animated.Value(0)).current;
  const keyboardListenerRef = useRef<any>(null);

  useEffect(() => {
    if (!visible) return;

    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        const keyboardHeight = e.endCoordinates?.height || 0;
        
        Animated.timing(translateY, {
          toValue: -keyboardHeight / 2,
          duration: Platform.OS === 'ios' ? 250 : 150,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: Platform.OS === 'ios' ? 250 : 150,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [visible, translateY]);

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
    Keyboard.dismiss();
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
    setNameInputFocused(false);
    Keyboard.dismiss();
    onClose();
  };

  const handleCancel = () => {
    setStockName('');
    setDateBought(new Date());
    setNameInputFocused(false);
    Keyboard.dismiss();
    onClose();
  };

  return (
    <>
      <Modal visible={visible && showModalContent} transparent animationType="slide">
      <TouchableOpacity
  onPress={handleCancel}
  style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 11, 88, 0.5)' }}
  activeOpacity={1}
>

          <Animated.View
            style={{
              transform: [{ translateY }],
              flex: 0,
            }}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation?.()}>
              <ScrollView
                ref={scrollViewRef}
                scrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View
                  className="rounded-t-2xl p-6 pt-4"
                  style={{
                    backgroundColor: 'white',
                    ...shadows.xl,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: colors.deep.blue,
                      marginHorizontal: 'auto',
                      marginBottom: 20,
                    }}
                  />

                  <Text
                    className="text-2xl font-bold mb-6"
                    style={{ color: colors.primary.dark }}
                  >
                    Add Stock
                  </Text>

                  <View className="mb-5">
                    <Text
                      className="text-sm font-semibold mb-2"
                      style={{ color: colors.primary.dark }}
                    >
                      Stock Name
                    </Text>
                    <TextInput
                      placeholder="Enter stock name (e.g., Apple Inc.)"
                      value={stockName}
                      onChangeText={setStockName}
                      onFocus={() => setNameInputFocused(true)}
                      onBlur={() => setNameInputFocused(false)}
                      className="rounded-md px-4 py-3 text-base"
                      placeholderTextColor={colors.neutral[400]}
                      style={[
                        {
                          backgroundColor: colors.neutral[50],
                          borderWidth: 2,
                          borderColor: nameInputFocused ? colors.accent.teal : colors.deep.blue,
                          color: colors.primary.dark,
                        }
                      ]}
                    />
                  </View>

                  <View className="mb-6">
                    <Text
                      className="text-sm font-semibold mb-2"
                      style={{ color: colors.primary.dark }}
                    >
                      Date Bought
                    </Text>
                    <Pressable
                      onPress={handleOpenDatePicker}
                      className="rounded-md px-4 py-3 flex-row items-center justify-between"
                      style={[
                        {
                          backgroundColor: colors.neutral[50],
                          borderWidth: 2,
                          borderColor: colors.deep.blue,
                        }
                      ]}
                    >
                      <Text
                        className="text-base"
                        style={{ color: colors.primary.dark }}
                      >
                        {dateBought.toLocaleDateString()}
                      </Text>
                      <Text className="text-lg">📅</Text>
                    </Pressable>
                  </View>

                  {showDatePicker && Platform.OS === 'ios' && (
                    <View
                      className="mb-4 rounded-md overflow-hidden"
                      style={[
                        {
                          backgroundColor: colors.neutral[100],
                          borderWidth: 1,
                          borderColor: colors.deep.blue,
                        }
                      ]}
                    >
                      <DateTimePicker
                        value={dateBought}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        textColor={colors.primary.dark}
                      />
                      <Pressable
                        onPress={handleCloseDatePicker}
                        className="py-3 items-center"
                        style={{ backgroundColor: colors.accent.teal }}
                      >
                        <Text className="text-white font-semibold">Done</Text>
                      </Pressable>
                    </View>
                  )}

                  <View className="flex-row gap-3 pt-6 pb-2 border-t" style={{ borderColor: colors.neutral[200] }}>
                    <Pressable
                      onPress={handleCancel}
                      className="flex-1 rounded-md py-3 items-center border-2"
                      style={{ borderColor: colors.neutral[400] }}
                    >
                      <Text
                        className="text-base font-semibold"
                        style={{ color: colors.neutral[600] }}
                      >
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={handleAdd}
                      className="flex-1 rounded-md py-3 items-center"
                      style={{ backgroundColor: colors.accent.teal }}
                    >
                      <Text className="text-base font-semibold text-white">
                        Add Stock
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableOpacity>

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
