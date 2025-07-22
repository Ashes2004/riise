'use client';
import { motion } from 'framer-motion';

export default function FeatureSection() {
  return (
    <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          id='feature'
        >
         
          {/* Research Management */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9b87f5]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b87f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">Research Management</h3>
            <p className="text-sm text-white/60">
              Track research projects, collaborate with teams, and manage publications efficiently
            </p>
          </div>

          {/* IPR Services */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9b87f5]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b87f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <circle cx="12" cy="16" r="1"></circle>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">IPR Services</h3>
            <p className="text-sm text-white/60">
              Protect intellectual property with patent filing, trademark registration, and licensing
            </p>
          </div>

          {/* Innovation Hub */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9b87f5]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b87f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" y1="8" x2="12" y2="8"></line>
                <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">Innovation Hub</h3>
            <p className="text-sm text-white/60">
              Foster innovation through idea generation, prototyping, and technology transfer
            </p>
          </div>

          {/* Startup Incubation */}
          <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#9b87f5]/30 hover:shadow-[0_0_20px_rgba(155,135,245,0.1)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#9b87f5]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b87f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-white">Startup Incubation</h3>
            <p className="text-sm text-white/60">
              Support entrepreneurs with mentorship, funding guidance, and business development
            </p>
          </div>
        </motion.div>
  );
}

