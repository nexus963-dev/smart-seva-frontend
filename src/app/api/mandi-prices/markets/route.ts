import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district');
  
  // Sample market data - in production, fetch from actual API
  const marketData: { [key: string]: string[] } = {
    "Mumbai": ["Vashi APMC", "Turbhe APMC", "Mumbai Central Market"],
    "Pune": ["Pune APMC", "Hadapsar Market", "Market Yard"],
    "Nagpur": ["Nagpur APMC", "Kalamna Market", "Sitabuldi Market"],
    "Ahmedabad": ["Ahmedabad APMC", "Jamalpur Market", "Khodiyar Market"],
    "Surat": ["Surat APMC", "Varachha Market", "Udhna Market"],
    "Ludhiana": ["Ludhiana Mandi", "Grain Market", "Vegetable Market"],
    "Chennai": ["Koyambedu Market", "Chromepet Market", "Perambur Market"],
    "Bangalore": ["Yeshwantpur APMC", "Binny Mills Market", "KR Market"]
  };
  
  const markets = district ? (marketData[district] || [`${district} APMC`, `${district} Market`]) : [];
  
  return NextResponse.json({ markets });
}
