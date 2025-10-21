export interface NewsItem {
  id: string;
  nameOfStock: string;
  headline: string;
  summary: string;
  date: string;
  newsContent: string;
  ticker: string;
}

export const mockNewsData: NewsItem[] = [
  {
    id: '1',
    nameOfStock: 'Apple Inc.',
    ticker: 'AAPL',
    headline: 'Apple Reports Record Q4 Revenue',
    summary: 'Apple announced its strongest quarter ever with a 15% year-over-year increase in revenue.',
    date: '2024-01-15',
    newsContent: 'Apple Inc. reported record-breaking quarterly earnings, driven by strong iPhone and Services segment performance. The company exceeded analyst expectations with a 15% year-over-year revenue increase. CEO Tim Cook attributed the success to strong demand in emerging markets and growing services adoption worldwide. The company announced a $25 billion share buyback program.',
  },
  {
    id: '2',
    nameOfStock: 'Microsoft',
    ticker: 'MSFT',
    headline: 'Microsoft Expands Cloud Infrastructure',
    summary: 'Microsoft announced plans to invest $10 billion in cloud and AI infrastructure development.',
    date: '2024-01-14',
    newsContent: 'Microsoft announced a $10 billion investment in cloud computing and artificial intelligence infrastructure. The company plans to expand its Azure data centers across Europe and Asia-Pacific regions. This move is part of Microsoft\'s strategic push to compete with Amazon Web Services and Google Cloud in the rapidly growing cloud market.',
  },
  {
    id: '3',
    nameOfStock: 'Tesla',
    ticker: 'TSLA',
    headline: 'Tesla Launches New EV Model',
    summary: 'Tesla unveiled its latest electric vehicle with enhanced battery technology and range.',
    date: '2024-01-13',
    newsContent: 'Tesla unveiled its newest electric vehicle model featuring advanced battery technology with a range of over 500 miles per charge. The new model includes next-generation autonomous driving capabilities and is expected to be priced competitively in the mid-range EV market. Production is scheduled to begin in Q2 2024.',
  },
  {
    id: '4',
    nameOfStock: 'Amazon',
    ticker: 'AMZN',
    headline: 'Amazon Acquisition Deal Closes',
    summary: 'Amazon completed acquisition of a major logistics startup for $5 billion.',
    date: '2024-01-12',
    newsContent: 'Amazon completed its acquisition of a leading logistics technology company for $5 billion. The acquisition strengthens Amazon\'s supply chain capabilities and reduces delivery times. The company plans to integrate the acquired technology into its existing Fulfillment network to improve operational efficiency.',
  },
  {
    id: '5',
    nameOfStock: 'Google',
    ticker: 'GOOGL',
    headline: 'Google AI Breakthrough Announced',
    summary: 'Google unveiled new AI model with improved language understanding capabilities.',
    date: '2024-01-11',
    newsContent: 'Google announced a major breakthrough in artificial intelligence with a new language model that demonstrates improved understanding and reasoning capabilities. The company plans to integrate this technology across its product suite starting with Search and Assistant applications.',
  },
  {
    id: '6',
    nameOfStock: 'Meta',
    ticker: 'META',
    headline: 'Meta Reports Strong Ad Revenue Growth',
    summary: 'Meta\'s advertising business surges with 23% year-over-year growth in Q4.',
    date: '2024-01-10',
    newsContent: 'Meta reported strong quarterly results with advertising revenue up 23% year-over-year. The company\'s metaverse division continues to refine its products as it works toward profitability. Management remains optimistic about AI-driven advertising tools that help businesses target customers more effectively.',
  },
];
