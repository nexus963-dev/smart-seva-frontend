import { NextResponse } from 'next/server';

export async function GET() {
  const commodities = [
    "Rice", "Wheat", "Jowar", "Bajra", "Maize", "Ragi", "Arhar (Tur)", 
    "Moong", "Urad", "Gram", "Lentil", "Groundnut", "Sesamum", 
    "Niger Seed", "Safflower", "Sunflower", "Soyabean", "Castor Seed",
    "Cotton", "Jute", "Sugarcane", "Onion", "Potato", "Tomato",
    "Brinjal", "Cabbage", "Cauliflower", "Okra", "Green Chilli",
    "Coriander", "Turmeric", "Ginger", "Garlic", "Tamarind",
    "Apple", "Banana", "Grapes", "Orange", "Mango", "Pomegranate"
  ];
  
  return NextResponse.json({ commodities: commodities.sort() });
}
