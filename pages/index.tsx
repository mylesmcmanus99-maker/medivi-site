import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [currency, setCurrency] = useState<'gbp' | 'eur'>('gbp');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');

  const products = [
    {
      id: 'hormone',
      name: 'Hormone Support',
      formula: 'Ashwagandha + Zinc',
      img: '/hormone.png',
      // Tweaked: 12-month tier is now a better deal (approx 20% off monthly)
      prices: { gbp: ['44.99', '74.99', '129.99'], eur: ['54.99', '89.99', '154.99'] }
    },
    {
      id: 'circulation',
      name: 'Circulation Support',
      formula: 'Beetroot + L-Citrulline',
      img: '/circulation.png',
      prices: { gbp: ['39.99', '64.99', '109.99'], eur: ['47.99', '79.99', '134.99'] }
    },
    {
      id: 'cellular',
      name: 'Cellular Support',
      formula: 'Vitamin E + Selenium',
      img: '/cellular.png',
      prices: { gbp: ['34.99', '54.99', '89.99'], eur: ['42.99', '64.99', '109.99'] }
    }
  ];

  const systemPrices = { gbp: ['99.99', '169.99', '289.99'], eur: ['119.99', '204.99', '349.99'] };
  const currSym = currency === 'gbp' ? '£' : '€';

const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const response = await fetch('https://formspree.io/f/mdapyqyg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });

    if (response.ok) {
      setStatus('success');
      setTimeout(() => {
        setShowWaitlist(false);
        setStatus('idle');
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate">
      <Head>
        <title>MEDiVi | Modern Men's Healthcare</title>
      </Head>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center">
            <h3 className="text-3xl font-bold text-navy mb-4 leading-tight">Join the Protocol</h3>
            <p className="text-charcoal mb-8 opacity-80">Manufacturing is underway in Belfast. Join the waitlist for early access and launch-day pricing.</p>
            <form onSubmit={handleWaitlist} className="space-y-4">
  {status === 'success' ? (
    <div className="py-8 animate-pulse text-teal font-bold uppercase tracking-widest text-sm">
      PROTOCOL ACCESS SECURED. CHECK YOUR INBOX.
    </div>
  ) : (
    <>
      <input 
        type="email" 
        name="email"
        placeholder="Enter your email" 
        required
        className="w-full px-6 py-4 rounded-xl border border-slate focus:border-teal outline-none transition-all"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
      />
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-teal transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'VERIFYING...' : 'SECURE PRIORITY ACCESS'}
      </button>
    </>
  )}
  <button type="button" onClick={() => setShowWaitlist(false)} className="text-xs text-charcoal/50 uppercase tracking-widest font-bold">Close</button>
</form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md py-6 px-10 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="text-3xl font-bold tracking-tighter text-navy uppercase">
          MED<span className="text-teal">iVi</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setCurrency('gbp')} className={`text-xs font-bold transition-all ${currency === 'gbp' ? 'text-teal border-b-2 border-teal' : 'text-navy/40'}`}>UK/NI (£)</button>
          <button onClick={() => setCurrency('eur')} className={`text-xs font-bold transition-all ${currency === 'eur' ? 'text-teal border-b-2 border-teal' : 'text-navy/40'}`}>ROI (€)</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-24 text-center px-6">
        <div className="inline-block px-4 py-1 bg-teal/10 text-teal rounded-full text-xs font-bold tracking-[0.2em] mb-6 uppercase">Currently in Production • Belfast, NI</div>
        <h1 className="text-5xl md:text-8xl font-medium text-navy max-w-5xl mx-auto leading-[0.9] tracking-tighter">
          Healthcare for men who <span className="text-teal italic">expect more</span>
        </h1>
        <p className="mt-10 text-lg text-charcoal opacity-70 uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">The New Standard in Clinical Grade Male Protocols</p>
      </header>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-8 pb-32">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[3rem] p-10 shadow-xl flex flex-col items-center border border-transparent hover:border-teal/20 transition-all group">
            <div className="relative mb-10">
              <img src={p.img} alt={p.name} className="h-80 w-auto object-contain transition-all duration-700 group-hover:scale-105" />
              <div className="absolute -bottom-4 bg-navy text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest">COMING SOON</div>
            </div>
            <h2 className="text-2xl font-bold text-navy text-center uppercase tracking-tight">{p.name}</h2>
            <p className="text-teal font-bold text-xs mb-12 tracking-[0.2em] uppercase">{p.formula}</p>
            
            <div className="w-full space-y-3">
              {['3-Month', '6-Month', '12-Month'].map((tier, i) => (
                <button key={tier} onClick={() => setShowWaitlist(true)} className="w-full py-5 px-6 rounded-2xl border border-slate flex justify-between font-bold hover:bg-slate/30 transition text-sm group/btn">
                  <span className="text-navy/60 group-hover/btn:text-navy">{tier}</span>
                  <span className="text-teal">{currSym}{p.prices[currency][i]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* System Bundle */}
      <section className="bg-navy py-32 px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-30" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl mb-6 tracking-tighter">THE MEDiVi COMPLETE SYSTEM</h2>
          <p className="text-teal font-bold mb-16 max-w-2xl mx-auto text-sm uppercase tracking-[0.3em]">Unified cellular, hormonal & circulatory optimization</p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {['3-Month System', '6-Month System', '12-Month System'].map((tier, i) => (
              <div key={tier} className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 flex flex-col group hover:bg-white/10 transition-all">
                <p className="text-[10px] font-bold tracking-[0.3em] mb-6 text-teal uppercase">The Complete Protocol</p>
                <div className="mb-10 text-left">
                    <p className="text-xs opacity-50 uppercase tracking-widest mb-1">{tier}</p>
                    <p className="text-6xl font-bold tracking-tighter">{currSym}{systemPrices[currency][i]}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-teal tracking-widest">
                        <span className="h-1 w-1 bg-teal rounded-full animate-pulse" />
                        FREE SHIPPING INCLUDED
                    </div>
                </div>
                <button onClick={() => setShowWaitlist(true)} className="bg-white text-navy w-full py-5 rounded-2xl font-black tracking-widest uppercase hover:bg-teal hover:text-white transition-all transform active:scale-95 text-xs">Join the Waitlist</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Footer */}
      <footer className="py-24 text-center px-6 bg-slate border-t border-navy/5">
        <div className="text-3xl font-bold tracking-tighter text-navy mb-12 opacity-20 uppercase">MEDiVi</div>
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-center gap-12 text-[10px] font-bold tracking-[0.2em] text-navy/40 uppercase">
                <span>Lab Tested</span>
                <span>Belfast Made</span>
                <span>Clinical Grade</span>
            </div>
            <p className="text-[10px] uppercase leading-loose opacity-30 tracking-widest px-10">
                MEDiVi products are professional-grade food supplements. Consult your physician before starting any new protocol. 
                Shipping available across United Kingdom, Northern Ireland, and Republic of Ireland.
                <br />© 2026 MEDiVi HEALTHCARE LTD.
            </p>
        </div>
      </footer>
    </div>
  );
}
