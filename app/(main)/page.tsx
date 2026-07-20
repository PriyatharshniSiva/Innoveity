"use client";

import React from 'react';
import EdukaHero from '@/components/EdukaLayout/EdukaHero';
import EdukaFeatures from '@/components/EdukaLayout/EdukaFeatures';
import EdukaHomeJourney from '@/components/EdukaLayout/EdukaHomeJourney';

import EdukaCourseGrid from '@/components/EdukaLayout/EdukaCourseGrid';
import EdukaStatsParallax from '@/components/EdukaLayout/EdukaStatsParallax';
import EdukaTestimonials from '@/components/EdukaLayout/EdukaTestimonials';
import Link from 'next/link';

import PremiumServices from '@/components/PremiumServices';
import EdukaServicesRow from '@/components/EdukaLayout/EdukaServicesRow';
import EdukaPresence from '@/components/EdukaLayout/EdukaPresence';
import EdukaOverview from '@/components/EdukaLayout/EdukaOverview';
import FAQAccordion from '@/components/FAQAccordion';

export default function Home() {
  const features = [
    { 
      title: "Educational Solutions", 
      description: "Faculty development, placement assistance & curriculum enhancement.", 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> 
    },
    { 
      title: "Corporate Training", 
      description: "ESG consulting, digital transformation & corporate skill development.", 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"></path></svg> 
    },
    { 
      title: "Community Engagement", 
      description: "Webinars, skill challenges, and community outreach programs.", 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> 
    },
    { 
      title: "Change Management", 
      description: "Empowering organizations to navigate transformation effectively.", 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> 
    },
  ];

  const stats = [
    { label: "Minds Stimulated", value: "50,000+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> },
    { label: "Corporate Clients", value: "120+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"></path></svg> },
    { label: "Institutions Partnered", value: "35+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> },
    { label: "Google Rating", value: "4.8", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> }
  ];

  const services = [
    {
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "For Institutions",
      title: "Faculty & Student Development",
      description: "AICTE-recognized faculty development and student placement training with 85% placement improvement.",
      meta: "50+ Colleges Partnered",
      link: "/services"
    },
    {
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "For Corporates",
      title: "Corporate L&D & ESG",
      description: "Customized corporate training and comprehensive ESG framework implementation.",
      meta: "100+ Corporate Clients",
      link: "/services"
    },
    {
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Community",
      title: "Webinars & Symposiums",
      description: "Educational events, competitive talent programs, and social impact initiatives for underserved regions.",
      meta: "2000+ Students Annually",
      link: "/services"
    }
  ];

  const testimonials = [
    {
      quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.",
      name: "Rajesh Kumar",
      date: "Verified August 15, 2024"
    },
    {
      quote: "Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.",
      name: "Priya Sharma",
      date: "Verified Jul 2024"
    },
    {
      quote: "Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team's performance improved significantly.",
      name: "Dr. Amit Patel",
      date: "Verified Jun 2024"
    },
    {
      quote: "INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.",
      name: "Sarah Johnson",
      date: "Verified May 2024"
    },
    {
      quote: "Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.",
      name: "Vikram Singh",
      date: "Verified Apr 2024"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <EdukaHero 
        title={
          <>
            Bridging Education <br />
            <span className="text-[#F59E0B]">↔ Industry Future</span>
          </>
        }
        description="Transforming education through innovative solutions, corporate training, and sustainable development initiatives across India."
        primaryButtonText="About Us"
        primaryButtonLink="/about"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/services"
        backgroundImage="/inv1.jpg"
      />

      <EdukaHomeJourney />

      {/* Corporate Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-gradient-to-br from-[#185D4610]/30 to-[#f0f9ff]/20 backdrop-blur-xl rounded-[24px] p-8 md:p-12 border border-[#185D4630] border-l-[6px] border-l-[#185D46] shadow-[0_20px_50px_rgba(12,74,65,0.05)] relative overflow-hidden group">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#185D46] mb-6 tracking-tight leading-tight">
            Leading Corporate Training & College Development Partner in Tamil Nadu
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            INNOVEITY transforms institutions and organizations through proven training solutions. We've achieved 85% average placement improvement across 50+ engineering colleges and trained 2000+ students annually in Chennai, Coimbatore, Madurai, and throughout Tamil Nadu.
          </p>
          <div className="mb-10">
            <h3 className="font-bold text-[#185D46] mb-6 text-xl tracking-wide">
              Key Highlights:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "85% average placement improvement for engineering colleges",
                "2000+ students trained annually with industry-relevant skills",
                "50+ Tamil Nadu colleges and universities as active partners",
                "AICTE-recognized faculty development programs aligned with NEP 2020",
                "ISO-certified trainers with 15+ years of industry experience",
                "Flexible delivery: on-site, online, or hybrid training models",
                "Bilingual training capability in English and Tamil",
                "ROI guarantee: 200-300% for corporate L&D programs"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-700">
                  <span className="text-[#185D46] font-black text-xl mr-3 mt-0.5 leading-none">✓</span>
                  <span className="font-semibold leading-relaxed text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/contact" className="inline-block">
            <button className="px-8 py-4 bg-[#185D46] hover:bg-[#185D46]/90 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center cursor-pointer">
              Schedule Free Consultation
            </button>
          </Link>
        </section>
      </div>

      {/* FAQ Section */}
      <div 
        className="w-full bg-[#f4faf6] border-y border-[#185D46]/20/50 relative py-12"
        style={{
          backgroundImage: 'radial-gradient(#185D4630 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      >
        <FAQAccordion />
      </div>

      <EdukaStatsParallax 
        stats={stats}
        backgroundImage="/inv6.jpg"
      />

      <PremiumServices />

      <EdukaTestimonials 
        badge="Testimonials"
        title="What Our Clients Say"
        testimonials={testimonials}
      />

      <EdukaServicesRow />

      <EdukaPresence />

      <EdukaOverview />
    </div>
  );
}
