'use client'

import { useState } from 'react';

interface SearchResult {
  id?: string;
  title: string;
  description?: string;
  thumbnail?: string;
  channelId?: string;
  videoId?: string; // for YouTube videos
  link?: string; // for Google results
}

export default function VideoSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'videos' | 'google'>('videos');

  const API_KEY_YT = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const API_KEY_GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_CSE_API_KEY;
  const CX = process.env.NEXT_PUBLIC_GOOGLE_CSE_ID; // Custom Search Engine ID

  // Function to fetch YouTube videos
  const fetchVideos = async (searchText: string) => {
    if (!API_KEY_YT || !CX) {
      alert('API keys missing');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchText)}&type=video&maxResults=10&key=${API_KEY_YT}`
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      const videos: SearchResult[] = data.items.map((item: any) => ({
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId,
      }));
      setResults(videos);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch videos');
    }
    setLoading(false);
  };

  // Function to fetch Google search results
  const fetchGoogleResults = async (searchText: string) => {
    if (!API_KEY_GOOGLE || !CX) {
      alert('API keys missing');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY_GOOGLE}&cx=${CX}&q=${encodeURIComponent(searchText)}&num=10`
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      const resultsData: SearchResult[] = data.items.map((item: any) => ({
        title: item.title,
        description: item.snippet,
        link: item.link,
      }));
      setResults(resultsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch results');
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    if (mode === 'videos') fetchVideos(query);
    else fetchGoogleResults(query);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 min-h-screen flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-green-800 text-center">
        Agriculture Knowledge Hub
      </h1>

      {/* Input & Mode toggle */}
      <div className="w-full flex flex-col md:flex-row items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('videos')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === 'videos' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-green-500 transition`}
          >
            Videos
          </button>
          <button
            onClick={() => setMode('google')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === 'google' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-green-500 transition`}
          >
            Google Search
          </button>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition"
        >
          Search
        </button>
      </div>

      {/* Error & Loading */}
      {loading && <p className="text-yellow-600 mb-4">Loading results...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Results Display */}
      <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => (
          mode === 'videos' && item.videoId ? (
            // YouTube Video Card
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${item.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-3 bg-white">
                <h3 className="text-lg font-semibold text-green-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </a>
          ) : (
            // Google Search Result Card
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </a>
          )
        ))}
      </div>
    </div>
  );
}