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

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  visible,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, scaleAnim, opacityAnim, translateY]);

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
      Animated.timing(translateY, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
      translateY.setValue(50);
    });
  };

  const handleConfirm = () => {
    console.log('Delete confirmed from modal');
    handleClose();
    setTimeout(() => {
      console.log('Calling onConfirm callback');
      onConfirm();
    }, 200);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Animated.View
          style={{
            transform: [
              { scale: scaleAnim },
              { translateY: translateY },
            ],
            opacity: opacityAnim,
            width: '100%',
            maxWidth: 300,
          }}
        >
          <View
            className="rounded-3xl p-6"
            style={{
              backgroundColor: '#121212',
              ...shadows.xl,
            }}
          >
            <View className="items-center mb-4">
              <View
                className="rounded-full items-center justify-center mb-3"
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'rgba(255, 76, 76, 0.1)',
                }}
              >
                <Ionicons name="warning" size={28} color="#FF4C4C" />
              </View>
            </View>

            <Text
              className="text-lg font-bold text-center mb-2"
              style={{ color: colors.text.primary, fontFamily: 'Poppins' }}
            >
              Are you sure you want to delete this stock?
            </Text>

            <Text
              className="text-sm text-center mb-6"
              style={{ color: colors.text.secondary, fontFamily: 'Inter' }}
            >
              This action cannot be undone.
            </Text>

            <View className="gap-3">
              <Pressable
                onPress={handleConfirm}
                className="rounded-lg px-4 py-4 items-center"
                style={{
                  backgroundColor: '#FF4C4C',
                  ...shadows.md,
                }}
              >
                <Text
                  className="text-base font-bold"
                  style={{ color: 'white', fontFamily: 'Poppins' }}
                >
                  Yes, Delete
                </Text>
              </Pressable>

              <Pressable
                onPress={handleClose}
                className="rounded-lg px-4 py-4 items-center"
                style={{
                  backgroundColor: '#2C2C2E',
                }}
              >
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.text.secondary, fontFamily: 'Poppins' }}
                >
                  No, Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
