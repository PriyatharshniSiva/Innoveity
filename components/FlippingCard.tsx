import React from "react";

interface FlippingCardProps {
  title: string;
  frontDesc: string;
  backDesc: string;
  icon: React.ReactNode;
}

export default function FlippingCard({
  title,
  frontDesc,
  backDesc,
  icon,
}: FlippingCardProps) {
  return (
    <div className="group perspective-1000 h-80 w-full cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-[700ms] transform-style-3d ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:rotate-y-180">
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-panel rounded-2xl p-8 flex flex-col justify-between bg-white/40 backdrop-blur-md border border-white/40 shadow-md">
          <div className="flex flex-col items-center text-center h-full justify-center">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center text-primary mb-4 shadow-inner">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-textDark mb-2">{title}</h3>
            <p className="text-textDark/75 text-sm leading-relaxed">{frontDesc}</p>
          </div>
          <div className="text-center text-xs text-primary font-semibold mt-auto flex items-center justify-center space-x-1.5">
            <span className="inline-block w-4 h-px bg-primary/40"></span>
            <span>Hover to learn more</span>
            <span className="inline-block w-4 h-px bg-primary/40"></span>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-3">{title}</h3>
          <p className="text-[#4B5563] text-sm leading-relaxed font-semibold">{backDesc}</p>
        </div>
      </div>
    </div>
  );
}
