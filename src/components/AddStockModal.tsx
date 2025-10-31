import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert, Platform, Keyboard, Animated, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, shadows } from '../utils/theme';

interface AddStockModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (stockName: string, dateBought: string) => void;
  mode?: 'add' | 'edit';
  initialStockName?: string;
  initialDateBought?: string;
  onEdit?: (stockName: string, dateBought: string) => void;
}

export function AddStockModal({
  visible,
  onClose,
  onAdd,
  mode = 'add',
  initialStockName = '',
  initialDateBought = '',
  onEdit,
}: AddStockModalProps) {
  const [stockName, setStockName] = useState(initialStockName);
  const [dateBought, setDateBought] = useState<Date>(
    initialDateBought ? new Date(initialDateBought) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModalContent, setShowModalContent] = useState(true);
  const [nameInputFocused, setNameInputFocused] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const translateY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setStockName(initialStockName || '');
      setDateBought(initialDateBought ? new Date(initialDateBought) : new Date());
      setNameInputFocused(false);
    }
  }, [visible, initialStockName, initialDateBought]);

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

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
  }, [visible, translateY, scaleAnim, opacityAnim]);

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

    if (mode === 'edit' && onEdit) {
      onEdit(stockName, dateBought.toISOString().split('T')[0]);
    } else {
      onAdd(stockName, dateBought.toISOString().split('T')[0]);
    }

    setStockName('');
    setDateBought(new Date());
    setNameInputFocused(false);
    Keyboard.dismiss();

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    });
  };

  const handleCancel = () => {
    setStockName('');
    setDateBought(new Date());
    setNameInputFocused(false);
    Keyboard.dismiss();
    
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    });
  };

  return (
    <>
      <Modal visible={visible && showModalContent} transparent animationType="slide">
        <Pressable
          onPress={handleCancel}
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 11, 88, 0.8)' }}
        >
          <Animated.View
            style={{
              transform: [{ translateY }, { scale: scaleAnim }],
              opacity: opacityAnim,
              flex: 0,
            }}
          >
            <ScrollView
                ref={scrollViewRef}
                scrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <View
                  className="rounded-t-3xl p-6 pt-4"
                  style={{
                    backgroundColor: colors.bg.secondary,
                    ...shadows.xl,
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: colors.accent.teal,
                      marginHorizontal: 'auto',
                      marginBottom: 24,
                      ...shadows.tealglow,
                    }}
                  />

                  <Text
                    className="text-3xl font-bold mb-6"
                    style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
                  >
                    {mode === 'edit' ? 'Edit Stock' : 'Add Stock'}
                  </Text>

                  <View className="mb-5">
                    <Text
                      className="text-sm font-semibold mb-2"
                      style={{ color: colors.text.secondary, fontFamily: 'Poppins' }}
                    >
                      Stock Name
                    </Text>
                    <TextInput
                      placeholder="Enter stock name (e.g., Apple Inc.)"
                      value={stockName}
                      onChangeText={setStockName}
                      onFocus={() => setNameInputFocused(true)}
                      onBlur={() => setNameInputFocused(false)}
                      className="rounded-lg px-4 py-4 text-base"
                      placeholderTextColor={colors.text.muted}
                      style={[
                        {
                          backgroundColor: colors.bg.tertiary,
                          borderWidth: 2,
                          borderColor: nameInputFocused ? colors.accent.tealLight : colors.accent.teal,
                          color: colors.text.primary,
                          fontFamily: 'Poppins',
                        },
                        nameInputFocused && shadows.tealglow,
                      ]}
                    />
                  </View>

                  <View className="mb-6">
                    <Text
                      className="text-sm font-semibold mb-2"
                      style={{ color: colors.text.secondary, fontFamily: 'Poppins' }}
                    >
                      Date Bought
                    </Text>
                    <Pressable
                      onPress={handleOpenDatePicker}
                      className="rounded-lg px-4 py-4 flex-row items-center justify-between border-2"
                      style={[
                        {
                          backgroundColor: colors.bg.tertiary,
                          borderColor: colors.accent.teal,
                        }
                      ]}
                    >
                      <Text
                        className="text-base"
                        style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
                      >
                        {dateBought.toLocaleDateString()}
                      </Text>
                      <Text className="text-lg">📅</Text>
                    </Pressable>
                  </View>

                  {showDatePicker && Platform.OS === 'ios' && (
                    <View
                      className="mb-4 rounded-lg overflow-hidden border"
                      style={[
                        {
                          backgroundColor: colors.bg.tertiary,
                          borderColor: colors.accent.teal,
                          borderWidth: 2,
                        }
                      ]}
                    >
                      <DateTimePicker
                        value={dateBought}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        textColor={colors.text.primary}
                      />
                      <Pressable
                        onPress={handleCloseDatePicker}
                        className="py-3 items-center"
                        style={{ 
                          backgroundColor: colors.accent.teal,
                          ...shadows.tealglow,
                        }}
                      >
                        <Text className="text-white font-semibold" style={{ fontFamily: 'Poppins' }}>Done</Text>
                      </Pressable>
                    </View>
                  )}

                  <View className="flex-row gap-3 pt-6 pb-2 border-t" style={{ borderColor: colors.bg.tertiary }}>
                    <Pressable
                      onPress={handleCancel}
                      className="flex-1 rounded-lg py-4 items-center border-2"
                      style={{ borderColor: colors.highlight.yellow }}
                    >
                      <Text
                        className="text-base font-semibold"
                        style={{ color: colors.highlight.yellow, fontFamily: 'Poppins' }}
                      >
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={handleAdd}
                      className="flex-1 rounded-lg py-4 items-center"
                      style={{
                        backgroundColor: colors.accent.teal,
                        ...shadows.tealglow,
                      }}
                    >
                      <Text className="text-base font-semibold text-white" style={{ fontFamily: 'Poppins' }}>
                        {mode === 'edit' ? 'Edit Stock' : 'Add Stock'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
          </Animated.View>
        </Pressable>
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
