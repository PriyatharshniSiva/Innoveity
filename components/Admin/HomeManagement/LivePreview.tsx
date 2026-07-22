"use client";

import React from "react";
import { useHomeManagement } from "./HomeManagementState";
import EdukaHero from "@/components/EdukaLayout/EdukaHero";
import EdukaStatsParallax from "@/components/EdukaLayout/EdukaStatsParallax";
import { Users, Building2, GraduationCap, Star } from "lucide-react";
import EdukaHomeJourney from '@/components/EdukaLayout/EdukaHomeJourney';
import PremiumServices from '@/components/PremiumServices';
import EdukaServicesRow from '@/components/EdukaLayout/EdukaServicesRow';
import EdukaPresence from '@/components/EdukaLayout/EdukaPresence';
import EdukaOverview from '@/components/EdukaLayout/EdukaOverview';
import FAQAccordion from '@/components/FAQAccordion';
import EdukaTestimonials from '@/components/EdukaLayout/EdukaTestimonials';

const getIcon = (name: string) => {
  switch (name) {
    case "Users": return <Users className="w-12 h-12" />;
    case "Building2": return <Building2 className="w-12 h-12" />;
    case "GraduationCap": return <GraduationCap className="w-12 h-12" />;
    case "Star": return <Star className="w-12 h-12" />;
    default: return <Users className="w-12 h-12" />;
  }
};

export default function LivePreview() {
  const { hero, stats } = useHomeManagement();

  const formattedStats = stats.map(s => ({
    label: s.label,
    value: s.value,
    icon: getIcon(s.iconName)
  }));

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
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col h-[800px] sticky top-8">


      {/* Scaled Preview Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative custom-scrollbar">
        <div className="w-full bg-white">
          <EdukaHero 
            title={
              <>
                {hero.titleLine1} <br />
                <span className="text-[#F59E0B]">{hero.titleHighlight}</span>
              </>
            }
            description={hero.description}
            primaryButtonText={hero.primaryButtonText}
            primaryButtonLink="/about"
            secondaryButtonText={hero.secondaryButtonText}
            secondaryButtonLink="/services"
            backgroundImage={hero.backgroundImage}
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
              <div className="inline-block cursor-pointer px-8 py-4 bg-[#185D46] hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center">
                Schedule Free Consultation
              </div>
            </section>
          </div>

          {/* FAQ Section */}
          <div 
            className="w-full bg-[#f4faf6] border-y border-primary/20/50 relative py-12"
            style={{
              backgroundImage: 'radial-gradient(var(--color-primary)30 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}
          >
            <FAQAccordion />
          </div>

          <EdukaStatsParallax 
            stats={formattedStats}
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
      </div>
    </div>
  );
}
