export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-t from-white/5 to-white/10 backdrop-blur-md border-t border-white/10 text-white overflow-hidden" 
    style={{
        background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)',
      }}>
      {/* Background Earth Image */}
      <img
        src="https://blocks.mvp-subha.me/assets/earth.png"
        alt="Earth"
        className="absolute left-1/2 top-[-80px] -translate-x-1/2 opacity-5 w-72 md:w-96 pointer-events-none z-0"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Grid Layout: Contact Short Form + Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Compact Contact Box */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-md bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b87f5]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-md bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b87f5]"
              />
              <button
                type="submit"
                className="w-full bg-[#9b87f5] hover:bg-[#8f76f5] transition-colors text-white font-medium py-2 px-4 rounded-md shadow-[0_0_10px_rgba(155,135,245,0.3)]"
              >
                Send
              </button>
            </form>
          </div>

          {/* Footer Info + Links */}
          <div className="flex flex-col md:items-end text-white/70">
            <h3 className="text-xl font-semibold text-white mb-2">RIISE</h3>
            <p className="mb-4 max-w-md text-sm">
              Research · Innovation · Incubation · Startups · Entrepreneurship. Empowering the next generation of innovators.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-[#9b87f5] transition">About</a>
              <a href="#" className="hover:text-[#9b87f5] transition">Services</a>
              <a href="#" className="hover:text-[#9b87f5] transition">Startups</a>
              <a href="#" className="hover:text-[#9b87f5] transition">Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-center text-white/50">
          © {new Date().getFullYear()} RIISE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
