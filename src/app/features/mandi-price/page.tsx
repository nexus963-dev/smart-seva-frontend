'use client';

import { useState } from 'react';
import MandiPriceSearch, { SearchParams } from '@/components/mandi-prices/MandiPriceSearch';
import PriceResults from '@/components/mandi-prices/PriceResults';
import toast from 'react-hot-toast';



export default function MandiPricePage() {
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams: SearchParams) => {
    setLoading(true);
    setPriceData(null);

    try {
      const queryParams = new URLSearchParams({
        state: searchParams.state,
        district: searchParams.district,
        market: searchParams.market,
        commodity: searchParams.commodity
      });

      const response = await fetch(`/api/mandi-prices/prices?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch price data');
      }

      const result = await response.json();
      
      if (result.success) {
        setPriceData(result.data);
        toast({
          title: "Success",
          description: "Price data fetched successfully",
        });
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
      toast({
        title: "Error",
        description: "Failed to fetch price data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Local Mandi Prices
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get real-time market prices for agricultural commodities across thousands of mandis in India. 
          Search by location and commodity to view current prices and trends.
        </p>
      </div>
      
      <MandiPriceSearch onSearch={handleSearch} loading={loading} />
      
      <PriceResults data={priceData} />
    </div>
  );
}
