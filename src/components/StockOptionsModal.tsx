import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../utils/theme';

interface StockOptionsModalProps {
  visible: boolean;
  stockName: string;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function StockOptionsModal({
  visible,
  stockName,
  onClose,
  onEdit,
  onDelete,
}: StockOptionsModalProps) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

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
  }, [visible, scaleAnim, opacityAnim]);

  const handleClose = () => {
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

  const handleEdit = () => {
    handleClose();
    setTimeout(() => onEdit(), 200);
  };

  const handleDelete = () => {
    handleClose();
    setTimeout(() => onDelete(), 200);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            width: '100%',
            maxWidth: 300,
          }}
        >
          <View
            className="rounded-3xl p-6"
            style={{
              backgroundColor: colors.bg.secondary,
              ...shadows.xl,
            }}
          >
            <Text
              className="text-xl font-bold text-center mb-6"
              style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
            >
              {stockName}
            </Text>

            <View className="gap-3">
              <Pressable
                onPress={handleEdit}
                className="flex-row items-center rounded-lg px-4 py-4"
                style={{
                  backgroundColor: '#00C2B2',
                }}
              >
                <Ionicons name="pencil" size={18} color="white" />
                <Text
                  className="flex-1 text-base font-semibold ml-3"
                  style={{ color: 'white', fontFamily: 'Poppins' }}
                >
                  Edit Stock
                </Text>
              </Pressable>

              <Pressable
                onPress={handleDelete}
                className="flex-row items-center rounded-lg px-4 py-4"
                style={{
                  backgroundColor: '#FF4C4C',
                  ...shadows.md,
                }}
              >
                <Ionicons name="trash" size={18} color="white" />
                <Text
                  className="flex-1 text-base font-semibold ml-3"
                  style={{ color: 'white', fontFamily: 'Poppins' }}
                >
                  Delete Stock
                </Text>
              </Pressable>

              <Pressable
                onPress={handleClose}
                className="rounded-lg px-4 py-3 mt-2"
                style={{
                  backgroundColor: colors.border.default,
                }}
              >
                <Text
                  className="text-base font-semibold text-center"
                  style={{ color: colors.text.secondary, fontFamily: 'Poppins' }}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
