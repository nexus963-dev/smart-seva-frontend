import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');
  
  // Sample district data - in production, fetch from actual API
  const districtsData: { [key: string]: string[] } = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Dhule", "Kolhapur", "Sangli"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Kapurthala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Udaipur", "Ajmer", "Bharatpur"],
    "Haryana": ["Gurgaon", "Faridabad", "Hisar", "Panipat", "Karnal", "Ambala", "Yamunanagar"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman"]
  };
  
  const districts = state ? (districtsData[state] || []) : [];
  
  return NextResponse.json({ districts: districts.sort() });
}
