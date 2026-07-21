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
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const revalidate = 0; // Ensure live data fetching

export default async function Home() {
  const homeData = await prisma.homeContent.findUnique({
    where: { id: 1 },
  });

  // Default fallback if database is empty
  let data = null;
  if (homeData) {
    data = JSON.parse(homeData.contentJson);
  }

  // Use dynamic data or fallback to defaults (using safe optional chaining)
  const heroTitleLine1 = data?.hero?.titleLine1 || "Bridging Education";
  const heroTitleHighlight = data?.hero?.titleHighlight || "↔ Industry Future";
  const heroDesc = data?.hero?.description || "Transforming education through innovative solutions, corporate training, and sustainable development initiatives across India.";
  const heroBg = data?.hero?.backgroundImage || "/inv1.jpg";
  const heroPrimaryBtn = data?.hero?.primaryButtonText || "About Us";
  const heroSecondaryBtn = data?.hero?.secondaryButtonText || "Learn More";

  // Mapped Stats from dynamic JSON
  const dynamicStats = data?.stats?.map((s: any) => ({
    label: s.label,
    value: s.value,
    icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
  })) || [];

  const testimonialsData = await prisma.testimonial.findMany({
    orderBy: { id: "desc" }
  });

  // Mapped Testimonials from database
  const dynamicTestimonials = testimonialsData.map(t => ({
    quote: t.quote,
    name: t.author,
    date: "Verified " + new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }));

  return (
    <div className="bg-white min-h-screen">
      <EdukaHero 
        title={
          <>
            {heroTitleLine1} <br />
            <span className="text-[#F59E0B]">{heroTitleHighlight}</span>
          </>
        }
        description={heroDesc}
        primaryButtonText={heroPrimaryBtn}
        primaryButtonLink="/about"
        secondaryButtonText={heroSecondaryBtn}
        secondaryButtonLink="/services"
        backgroundImage={heroBg}
      />

      <EdukaHomeJourney data={data?.homeJourney} />

      {/* Corporate Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-gradient-to-br from-[#185D4610]/30 to-[#f0f9ff]/20 backdrop-blur-xl rounded-[24px] p-8 md:p-12 border border-[#185D4630] border-l-[6px] border-l-[#185D46] shadow-[0_20px_50px_rgba(12,74,65,0.05)] relative overflow-hidden group">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#185D46] mb-6 tracking-tight leading-tight">
            {data?.corporateHighlights?.title || "Leading Corporate Training & College Development Partner in Tamil Nadu"}
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            {data?.corporateHighlights?.description || "INNOVEITY transforms institutions and organizations through proven training solutions."}
          </p>
          <div className="mb-10">
            <h3 className="font-bold text-[#185D46] mb-6 text-xl tracking-wide">
              Key Highlights:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {(data?.corporateHighlights?.highlightsList || [
                { text: "85% average placement improvement for engineering colleges" },
                { text: "2000+ students trained annually with industry-relevant skills" },
                { text: "50+ Tamil Nadu colleges and universities as active partners" },
                { text: "AICTE-recognized faculty development programs aligned with NEP 2020" },
                { text: "ISO-certified trainers with 15+ years of industry experience" },
                { text: "Flexible delivery: on-site, online, or hybrid training models" },
                { text: "Bilingual training capability in English and Tamil" },
                { text: "ROI guarantee: 200-300% for corporate L&D programs" }
              ]).map((item: any, idx: number) => (
                <li key={idx} className="flex items-start text-slate-700">
                  <span className="text-[#185D46] font-black text-xl mr-3 mt-0.5 leading-none">✓</span>
                  <span className="font-semibold leading-relaxed text-base md:text-lg">{item.text || item}</span>
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
        <FAQAccordion data={data?.faqs} />
      </div>

      <EdukaStatsParallax 
        stats={dynamicStats.length > 0 ? dynamicStats : [
          { label: "Minds Stimulated", value: "50,000+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> },
          { label: "Corporate Clients", value: "120+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"></path></svg> },
          { label: "Institutions Partnered", value: "35+", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> },
          { label: "Google Rating", value: "4.8", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> }
        ]}
        backgroundImage="/inv6.jpg"
      />

      <PremiumServices data={data?.premiumServices} />

      <EdukaTestimonials 
        badge="Testimonials"
        title={data?.testimonials?.title || "What Our Clients Say"}
        testimonials={dynamicTestimonials.length > 0 ? dynamicTestimonials : [
          {
            quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.",
            name: "Rajesh Kumar",
            date: "Verified August 15, 2024"
          }
        ]}
      />

      <EdukaServicesRow data={data?.servicesRow} />

      <EdukaPresence data={data?.presence} />

      <EdukaOverview data={data?.overview} />
    </div>
  );
}
