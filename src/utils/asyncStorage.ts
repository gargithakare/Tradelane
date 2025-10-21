import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stock } from '../data/mockStocks';

const STOCKS_KEY = '@trendlane_stocks';

export async function getStoredStocks(): Promise<Stock[]> {
  try {
    const data = await AsyncStorage.getItem(STOCKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading stocks from AsyncStorage:', error);
    return [];
  }
}

export async function saveStocks(stocks: Stock[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STOCKS_KEY, JSON.stringify(stocks));
  } catch (error) {
    console.error('Error saving stocks to AsyncStorage:', error);
  }
}

export async function addStock(stock: Stock): Promise<Stock[]> {
  try {
    const stocks = await getStoredStocks();
    const newStocks = [...stocks, stock];
    await saveStocks(newStocks);
    return newStocks;
  } catch (error) {
    console.error('Error adding stock:', error);
    return [];
  }
}

export async function deleteStock(stockId: string): Promise<Stock[]> {
  try {
    const stocks = await getStoredStocks();
    const newStocks = stocks.filter((s) => s.id !== stockId);
    await saveStocks(newStocks);
    return newStocks;
  } catch (error) {
    console.error('Error deleting stock:', error);
    return [];
  }
}
