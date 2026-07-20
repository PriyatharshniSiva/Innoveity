import React from 'react';
import Link from 'next/link';

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
}

export default function CtaBanner({ title, subtitle, buttonText, buttonLink }: CtaBannerProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#185D46] rounded-3xl p-8 sm:p-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#14b8a6]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side: Avatar Cluster (Decorative) */}
        <div className="flex -space-x-4 relative z-10 hidden lg:flex items-center">
          <img className="w-16 h-16 rounded-full border-4 border-[#185D46] object-cover" src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Avatar" />
          <img className="w-16 h-16 rounded-full border-4 border-[#185D46] object-cover transform -translate-y-4" src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Avatar" />
          <img className="w-16 h-16 rounded-full border-4 border-[#185D46] object-cover" src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Avatar" />
          <img className="w-16 h-16 rounded-full border-4 border-[#185D46] object-cover transform -translate-y-4" src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Avatar" />
        </div>

        {/* Center/Right Content */}
        <div className="flex-1 text-center md:text-left relative z-10 lg:pl-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#ccfbf1] text-sm sm:text-base font-medium max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex-shrink-0 relative z-10">
          <Link href={buttonLink}>
            <button className="bg-white text-[#185D46] hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 px-8 py-3.5 rounded-full font-bold shadow-lg flex items-center group">
              {buttonText}
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
