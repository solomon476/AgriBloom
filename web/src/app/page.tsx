export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-tight">
          Manage Your Farm, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Grow Your Profit</span>
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          The lightweight, offline-first platform designed for Kenyan farmers. Digitize your crop cycles, automate expense logging, and simplify your operations.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started
          </button>
          <button className="bg-white hover:bg-gray-50 text-primary border border-primary/20 px-8 py-3 rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md">
            Learn More
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12">
        {[
          { title: 'Offline-First', desc: 'Log data without internet. Syncs automatically when connected.', icon: '📶' },
          { title: 'Smart Tracking', desc: 'Track inputs, labor, and harvests from planting to market.', icon: '🌱' },
          { title: 'M-Pesa Integrated', desc: 'Record payments effortlessly with automated tracking.', icon: '📱' },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow flex flex-col items-start gap-4">
            <div className="text-4xl bg-primary/5 p-3 rounded-xl">{feature.icon}</div>
            <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
            <p className="text-foreground/70">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
