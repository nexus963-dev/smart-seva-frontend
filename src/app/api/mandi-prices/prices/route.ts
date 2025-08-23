import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  const district = searchParams.get('district');
  const market = searchParams.get('market');
  const commodity = searchParams.get('commodity');
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock price data - in production, fetch from Agmarknet API
  const generateMockPrices = () => {
    const basePrice = Math.floor(Math.random() * 5000) + 1000;
    const variation = Math.floor(Math.random() * 500);
    
    return {
      minPrice: basePrice - variation,
      maxPrice: basePrice + variation,
      modalPrice: basePrice,
      date: new Date().toISOString().split('T')[0],
      unit: "Quintal"
    };
  };
  
  // Generate historical data for trends
  const historicalData = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const prices = generateMockPrices();
    
    historicalData.push({
      date: date.toISOString().split('T')[0],
      minPrice: prices.minPrice,
      maxPrice: prices.maxPrice,
      modalPrice: prices.modalPrice
    });
  }
  
  const currentPrices = generateMockPrices();
  
  const response = {
    success: true,
    data: {
      location: {
        state,
        district,
        market
      },
      commodity,
      currentPrices,
      historicalData,
      lastUpdated: new Date().toISOString()
    }
  };
  
  return NextResponse.json(response);
}
