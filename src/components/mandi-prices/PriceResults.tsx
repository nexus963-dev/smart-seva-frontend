'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceData {
  location: {
    state: string;
    district: string;
    market: string;
  };
  commodity: string;
  currentPrices: {
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    date: string;
    unit: string;
  };
  historicalData: Array<{
    date: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
  }>;
  lastUpdated: string;
}

interface PriceResultsProps {
  data: PriceData | null;
}

export default function PriceResults({ data }: PriceResultsProps) {
  if (!data) {
    return null;
  }

  const { location, commodity, currentPrices, historicalData, lastUpdated } = data;
  
  // Calculate price trend
  const currentPrice = currentPrices.modalPrice;
  const previousPrice = historicalData[historicalData.length - 2]?.modalPrice || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice !== 0 ? ((priceChange / previousPrice) * 100).toFixed(2) : '0';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-green-700">
                {commodity} Prices
              </CardTitle>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {location.market}, {location.district}, {location.state}
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-2 md:mt-0">
              <Calendar className="h-4 w-4 mr-1" />
              Last updated: {formatDate(lastUpdated)}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Prices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Minimum Price</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(currentPrices.minPrice)}
              </p>
              <p className="text-xs text-gray-500">per {currentPrices.unit}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Modal Price</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(currentPrices.modalPrice)}
              </p>
              <div className="flex items-center justify-center mt-1">
                {priceChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <Badge variant={priceChange >= 0 ? 'default' : 'destructive'} className="text-xs">
                  {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Maximum Price</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(currentPrices.maxPrice)}
              </p>
              <p className="text-xs text-gray-500">per {currentPrices.unit}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>30-Day Price Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value)}
                  formatter={(value: number, name: string) => [formatCurrency(value), name]}
                />
                <Line 
                  type="monotone" 
                  dataKey="modalPrice" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Modal Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="minPrice" 
                  stroke="#16a34a" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Min Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="maxPrice" 
                  stroke="#ea580c" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Max Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
