import Link from 'next/link';
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold font-mono mb-2">OOPs!! Sorry</h1>
      <p className="text-lg text-gray-400 mb-2">
        Looks like you’ve stumbled upon a page that doesn’t exist! 🎥
      </p>
      <div className="flex items-center text-lg mt-4">
        <span className="text-gray-400 mr-2 italic font-mono">How about we take you back to safety?</span>
        <Link href="/" className="text-purple-700 hover:underline text-xl font-mono">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
