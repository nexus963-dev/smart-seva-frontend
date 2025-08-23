// 'use client';
// import React, { useRef, useState } from 'react';

// export default function PlantDetectionPage() {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [result, setResult] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileName, setFileName] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!fileInputRef.current?.files?.[0]) return;
//     const formData = new FormData();
//     formData.append('file', fileInputRef.current.files[0]);
//     setIsLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch {
//       setResult({ error: 'Prediction failed. Please try again.' });
//     }
//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-green-50 flex flex-col items-center justify-center py-10">
//       <div className="bg-white/90 rounded-2xl shadow-lg max-w-xl w-full p-8">
//         <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">🌱 Plant Disease Detection</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer flex flex-col items-center border-2 border-dashed border-green-300 rounded-xl p-6 w-full text-green-700 hover:bg-green-50 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V7a4 4 0 018 0v9M5 19h14M12 19v-4" />
//             </svg>
//             <span className="font-semibold">Click or drag an image here to upload</span>
//             <input
//               id="file-upload"
//               type="file"
//               ref={fileInputRef}
//               accept="image/*"
//               className="hidden"
//               onChange={(e) =>
//                 setFileName(e.target.files?.[0]?.name || '')
//               }
//             />
//             {fileName && <span className="mt-2 text-teal-700">{fileName}</span>}
//           </label>
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition self-stretch"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Detecting...' : 'Detect Disease'}
//           </button>
//         </form>
//         {result && (
//           <div className="mt-8 bg-teal-50 border border-green-200 rounded-xl p-4">
//             <h3 className="text-xl font-bold text-green-700">Prediction Result:</h3>
//             <pre className="bg-white rounded-md p-4 text-gray-800 mt-2 overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';
export default function FlaskEmbedPage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        src="http://127.0.0.1:5000"
        className="w-full h-full border-none"
        style={{ display: 'block' }}
        title="Flask App"
      />
    </div>
  );
}

