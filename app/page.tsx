import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimations from './components/ui/scroll-animations';

export default function Home() {

  return (
    <>
      <ScrollAnimations />
      <section className="pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tighter">
              The power tool for <span className="gradient-text"> your data.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              KWEYNNIE Hardware's business intelligence system for expense tracking, inventory management, and sales monitoring.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/login/user" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold">
                  Login as User
                </Link>
                <Link href="/login/admin" className="btn-secondary text-purple-600 px-8 py-4 rounded-lg font-semibold">
                  Login as Administrator
                </Link>
              </div>
            </div>
            <div className="relative">
              <svg viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-lg mx-auto">
                <rect x="150" y="20" width="220" height="410" rx="30" fill="#FFF" stroke="#e5e7eb" strokeWidth="4" className="shadow-2xl"/>
                <rect x="170" y="70" width="180" height="10" rx="5" fill="#f3f4f6"/>
                <rect x="170" y="90" width="120" height="10" rx="5" fill="#f3f4f6"/>

                <g transform="translate(-20, 20)">
                  <path d="M145.4,242.3c-7.9-10-18.4-23.7-22.6-39.7c-5.4-20.5,1.7-41.2,14.6-56.7c1.8-2.2,3.8-4.2,5.9-6c3.2-2.7,6.8-4.8,10.7-6.2c-1.3-3.6-2.1-7.4-2.1-11.4c0-16.8,11.6-30.4,26-30.4s26,13.6,26,30.4c0,4-0.8,7.8-2.1,11.4c10.3,3.8,18.8,12.3,22.6,22.6c10.5,28.8-1.5,61.1-23.2,77.7l-4.1,3.1v100.8h-48V245.4Z" fill="#e0e7ff"/>
                  <path d="M198.8,221.7c-21.7-16.6-33.7-48.9-23.2-77.7c3.8-10.3,12.3-18.8,22.6-22.6c1.3-3.6,2.1-7.4,2.1-11.4c0-16.8-11.6-30.4-26-30.4s-26,13.6-26,30.4c0,4,0.8,7.8,2.1,11.4c-3.9,1.4-7.5,3.5-10.7,6.2c-2.1,1.8-4.1,3.8-5.9,6c-12.9,15.5-20,36.2-14.6,56.7c4.2,16,14.7,29.7,22.6,39.7l4.1-3.1" fill="#c7d2fe"/>
                  <path d="M168.8,83.7c0-12.4,8.7-22.4,19.5-22.4s19.5,10,19.5,22.4c0,3-0.6,5.8-1.6,8.5c-3.1-2.9-6.9-5-11.1-5.9c-4.4-1-9-0.9-13.2,0.3c-2.3,0.7-4.4,1.8-6.3,3.2C169.2,88.7,168.8,86.2,168.8,83.7Z" fill="#4a433d"/>
                </g>
                <g transform="translate(180, 0)">
                  <path d="M164.1,200.2c-1.7-16.1-9-31.1-20.1-42.2c-1.3-1.3-2.7-2.5-4.1-3.7c-2.7-2.1-5.7-3.8-8.8-5c1.1-3.3,1.7-6.8,1.7-10.4c0-15.3-10.5-27.7-23.5-27.7s-23.5,12.4-23.5,27.7c0,3.6,0.6,7.1,1.7,10.4c-8.9,3.5-16.2,10.8-19.9,20.1c-9.1,22.9,0.3,48.1,18.8,61.9l3.5,2.6v92.2h43.9V202.8Z" fill="#fef3c7"/>
                  <path d="M117.6,180.1c-9.5,26.4-0.1,55.5,22.3,71.1l3.5-2.6v-92.2l-3.5-2.6c-18.5-13.8-28-39-18.8-61.9c3.7-9.3,11-16.6,19.9-20.1c-1.1-3.3-1.7-6.8-1.7-10.4c0-15.3,10.5-27.7,23.5-27.7s23.5,12.4,23.5,27.7c0,3.6-0.6,7.1-1.7,10.4c3.1,1.2,6.1,2.9,8.8,5c1.4,1.2,2.8,2.4,4.1,3.7c11.1,11.1,18.4,26.1,20.1,42.2l-0.8-0.6" fill="#eab308"/>
                  <path d="M137.8,157.9c-4.3-12.7-14.7-22.3-27.4-25.1c-1.1-3.3-1.7-6.8-1.7-10.4c0-11,7.2-20,16-20s16,9,16,20c0,3.6-0.6,7.1-1.7,10.4c3.1,1.2,6.1,2.9,8.8,5c1.4,1.2,2.8,2.4,4.1,3.7c2,2,3.8,4.3,5.2,6.7C150.3,152.1,144.9,155.6,137.8,157.9Z" fill="#a16207"/>
                  <path d="M108.8,112.4c0-15.3,10.5-27.7,23.5-27.7s23.5,12.4,23.5,27.7c0,3.6-0.6,7.1-1.7,10.4c3.1,1.2,6.1,2.9,8.8,5c1.4,1.2,2.8,2.4,4.1,3.7c11.1,11.1,18.4,26.1,20.1,42.2l0.8,0.6c-1.7-16.1-9-31.1-20.1-42.2c-1.3-1.3-2.7-2.5-4.1-3.7c-2.7-2.1-5.7-3.8-8.8-5c1.1-3.3,1.7-6.8,1.7-10.4c0-15.3-10.5-27.7-23.5-27.7s-23.5,12.4-23.5,27.7c0,3.6,0.6,7.1,1.7,10.4c-8.9,3.5-16.2,10.8-19.9,20.1c-0.4-1.2-0.7-2.4-1-3.6C109.1,123.6,108.8,118.1,108.8,112.4Z" fill="#8b5cf6"/>
                </g>

                <rect x="170" y="320" width="180" height="80" rx="10" fill="#f3f4f6"/>
                <rect x="180" y="360" width="15" height="30" fill="#a5b4fc"/>
                <rect x="205" y="340" width="15" height="50" fill="#a5b4fc"/>
                <rect x="230" y="350" width="15" height="40" fill="#818cf8"/>
                <rect x="255" y="365" width="15" height="25" fill="#a5b4fc"/>
                <rect x="280" y="330" width="15" height="60" fill="#a5b4fc"/>
                <rect x="305" y="355" width="15" height="35" fill="#a5b4fc"/>
                
                <g className="float-1">
                  <rect x="330" y="150" width="150" height="80" rx="10" fill="#fff" className="shadow-xl" stroke="#e5e7eb"/>
                  <rect x="345" y="165" width="120" height="8" rx="4" fill="#fde68a"/>
                  <rect x="345" y="185" width="80" height="8" rx="4" fill="#f3f4f6"/>
                  <rect x="345" y="205" width="100" height="8" rx="4" fill="#f3f4f6"/>
                </g>
                <g className="float-2">
                  <rect x="80" y="230" width="170" height="90" rx="10" fill="#fff" className="shadow-xl" stroke="#e5e7eb"/>
                  <path d="M 95 290 C 115 270, 145 270, 165 290 S 195 310, 215 290 L 230 300" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <circle cx="95" cy="290" r="4" fill="#818cf8"/>
                  <circle cx="165" cy="290" r="4" fill="#818cf8"/>
                  <circle cx="215" cy="290" r="4" fill="#818cf8"/>
                </g>
                <g className="float-3">
                  <rect x="360" y="250" width="130" height="60" rx="10" fill="#fff" className="shadow-xl" stroke="#e5e7eb"/>
                  <circle cx="380" cy="280" r="8" fill="#e0e7ff"/>
                  <rect x="395" y="276" width="60" height="8" rx="4" fill="#e0e7ff"/>
                  <circle cx="470" cy="265" r="2" fill="#d1d5db"/>
                  <circle cx="475" cy="265" r="2" fill="#d1d5db"/>
                  <circle cx="480" cy="265" r="2" fill="#d1d5db"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}