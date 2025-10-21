export interface Stock {
  id: string;
  name: string;
  ticker: string;
  dateBought: string;
  currentPrice: number;
  buyPrice: number;
  quantity: number;
}

export const defaultMockStocks: Stock[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    dateBought: '2023-06-15',
    currentPrice: 227.50,
    buyPrice: 150.00,
    quantity: 10,
  },
  {
    id: '2',
    name: 'Microsoft',
    ticker: 'MSFT',
    dateBought: '2023-08-20',
    currentPrice: 338.40,
    buyPrice: 280.00,
    quantity: 5,
  },
  {
    id: '3',
    name: 'Tesla',
    ticker: 'TSLA',
    dateBought: '2023-09-10',
    currentPrice: 210.35,
    buyPrice: 200.00,
    quantity: 15,
  },
];
