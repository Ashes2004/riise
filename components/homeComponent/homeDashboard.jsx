import React from 'react';
import FeatureSection from './FeatureSection';


export default function HomeDashboard() {
  // Add styles for orbit animation
 

  return (
    <section
      className="relative w-full mt-5 overflow-hidden bg-[#0a0613] pb-10 pt-36 font-light text-white antialiased md:pb-16 md:pt-20"
      style={{
        background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)',
      }}
    >
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />
 
      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <div>
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs text-[#9b87f5]">
            RESEARCH • IPR • INNOVATION • STARTUPS
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            Empowering <span className="text-[#9b87f5]">Innovation</span> Through Research Excellence
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/60 md:text-xl">
            A comprehensive platform for managing research initiatives, intellectual property rights, 
            fostering innovation, and nurturing startup ecosystems in academic and industrial environments.
          </p>
 
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:mb-16 sm:flex-row">
            <a
              href='/'
              className="neumorphic-button hover:shadow-[0_0_20px_rgba(155, 135, 245, 0.5)] relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Explore Features</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </a>
          </div>
        </div>

        <FeatureSection/>

        {/* Statistics */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-light text-[#9b87f5] md:text-4xl">500+</div>
            <div className="text-sm text-white/60">Active Research Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-[#9b87f5] md:text-4xl">150+</div>
            <div className="text-sm text-white/60">Patents Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-[#9b87f5] md:text-4xl">75+</div>
            <div className="text-sm text-white/60">Startups Incubated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
