import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';

import HomeScreen from './index';
import StockListScreen from './myStocks';
import PersonalNewsScreen from './personalNews';
import PersonalNewsDetailScreen from './personalNewsDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StockListStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StockListScreen" component={StockListScreen} />
    </Stack.Navigator>
  );
}

function PersonalNewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PersonalNewsScreen" component={PersonalNewsScreen} />
      <Stack.Screen name="PersonalNewsDetailScreen" component={PersonalNewsDetailScreen} />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#0B63FF',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StockList"
        component={StockListStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarLabel: 'Stock List',
        }}
      />
      <Tab.Screen
        name="PersonalNews"
        component={PersonalNewsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
          tabBarLabel: 'Personal News',
        }}
      />
    </Tab.Navigator>
  );
}
