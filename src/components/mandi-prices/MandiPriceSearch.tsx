'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Search } from 'lucide-react';

interface MandiPriceSearchProps {
  onSearch: (searchParams: SearchParams) => void;
  loading: boolean;
}

export interface SearchParams {
  state: string;
  district: string;
  market: string;
  commodity: string;
}

export default function MandiPriceSearch({ onSearch, loading }: MandiPriceSearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    state: '',
    district: '',
    market: '',
    commodity: ''
  });
  
  const [options, setOptions] = useState({
    states: [],
    districts: [],
    markets: [],
    commodities: []
  });
  
  const [loadingStates, setLoadingStates] = useState({
    states: false,
    districts: false,
    markets: false,
    commodities: false
  });

  // Fetch initial data
  useEffect(() => {
    fetchStates();
    fetchCommodities();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (searchParams.state) {
      fetchDistricts(searchParams.state);
      setSearchParams(prev => ({ ...prev, district: '', market: '' }));
    }
  }, [searchParams.state]);

  // Fetch markets when district changes
  useEffect(() => {
    if (searchParams.district) {
      fetchMarkets(searchParams.district);
      setSearchParams(prev => ({ ...prev, market: '' }));
    }
  }, [searchParams.district]);

  const fetchStates = async () => {
    setLoadingStates(prev => ({ ...prev, states: true }));
    try {
      const response = await fetch('/api/mandi-prices/states');
      const data = await response.json();
      setOptions(prev => ({ ...prev, states: data.states }));
    } catch (error) {
      console.error('Error fetching states:', error);
    }
    setLoadingStates(prev => ({ ...prev, states: false }));
  };

  const fetchDistricts = async (state: string) => {
    setLoadingStates(prev => ({ ...prev, districts: true }));
    try {
      const response = await fetch(`/api/mandi-prices/districts?state=${encodeURIComponent(state)}`);
      const data = await response.json();
      setOptions(prev => ({ ...prev, districts: data.districts }));
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
    setLoadingStates(prev => ({ ...prev, districts: false }));
  };

  const fetchMarkets = async (district: string) => {
    setLoadingStates(prev => ({ ...prev, markets: true }));
    try {
      const response = await fetch(`/api/mandi-prices/markets?district=${encodeURIComponent(district)}`);
      const data = await response.json();
      setOptions(prev => ({ ...prev, markets: data.markets }));
    } catch (error) {
      console.error('Error fetching markets:', error);
    }
    setLoadingStates(prev => ({ ...prev, markets: false }));
  };

  const fetchCommodities = async () => {
    setLoadingStates(prev => ({ ...prev, commodities: true }));
    try {
      const response = await fetch('/api/mandi-prices/commodities');
      const data = await response.json();
      setOptions(prev => ({ ...prev, commodities: data.commodities }));
    } catch (error) {
      console.error('Error fetching commodities:', error);
    }
    setLoadingStates(prev => ({ ...prev, commodities: false }));
  };

  const handleSearch = () => {
    if (searchParams.state && searchParams.district && searchParams.market && searchParams.commodity) {
      onSearch(searchParams);
    }
  };

  const isSearchDisabled = !searchParams.state || !searchParams.district || !searchParams.market || !searchParams.commodity || loading;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Mandi Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* State Selection */}
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select
              value={searchParams.state}
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, state: value }))}
              disabled={loadingStates.states}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {options.states.map((state: string) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Select
              value={searchParams.district}
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, district: value }))}
              disabled={!searchParams.state || loadingStates.districts}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {options.districts.map((district: string) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Market Selection */}
          <div className="space-y-2">
            <Label htmlFor="market">Market</Label>
            <Select
              value={searchParams.market}
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, market: value }))}
              disabled={!searchParams.district || loadingStates.markets}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Market" />
              </SelectTrigger>
              <SelectContent>
                {options.markets.map((market: string) => (
                  <SelectItem key={market} value={market}>
                    {market}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Commodity Selection */}
          <div className="space-y-2">
            <Label htmlFor="commodity">Commodity</Label>
            <Select
              value={searchParams.commodity}
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, commodity: value }))}
              disabled={loadingStates.commodities}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Commodity" />
              </SelectTrigger>
              <SelectContent>
                {options.commodities.map((commodity: string) => (
                  <SelectItem key={commodity} value={commodity}>
                    {commodity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSearch}
            disabled={isSearchDisabled}
            className="w-full md:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Prices
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
