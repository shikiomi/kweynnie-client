import Link from 'next/link';

export default function Navbar() {

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">KWEYNNIE</span>
            </div>
            <div className="text-sm text-gray-500">
              Business Intelligence System
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
