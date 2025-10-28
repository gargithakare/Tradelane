import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';

import HomeScreen from './index';
import StockListScreen from './myStocks';
import PersonalNewsScreen from './personalNews';
import PersonalNewsDetailScreen from './personalNewsDetail';
import { colors } from '../src/utils/theme';

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
          borderTopColor: colors.deep.blue,
          borderTopWidth: 2,
          backgroundColor: 'white',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: colors.primary.dark,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 12,
        },
        tabBarActiveTintColor: colors.accent.teal,
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
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
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="StockList"
        component={StockListStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
          tabBarLabel: 'Stocks',
        }}
      />
      <Tab.Screen
        name="PersonalNews"
        component={PersonalNewsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
          tabBarLabel: 'News',
        }}
      />
    </Tab.Navigator>
  );
}
