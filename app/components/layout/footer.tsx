import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
        <div className="pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm ml-5 mb-3">&copy; 2025 Kweynnie. All rights reserved.</p>
        </div>
    </footer>
  );
}
