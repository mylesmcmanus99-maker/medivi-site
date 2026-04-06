import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [currency, setCurrency] = useState<'gbp' | 'eur'>('gbp');
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const products = [
    {
      id: 'hormone',
      name: 'Hormone Support',
      formula: 'Ashwagandha + Zinc',
      img: '/hormone.png',
      prices: { 
        gbp: [{total: '44.99', mo: null, label: '3-Month Supply'}, {total: '74.99', mo: '12.50', label: 'Billed Bi-Annually'}, {total: '129.99', mo: '10.83', label: 'Billed Annually'}],
        eur: [{total: '54.99', mo: null, label: '3-Month Supply'}, {total: '89.99', mo: '15.00', label: 'Billed Bi-Annually'}, {total: '154.99', mo: '12.91', label: 'Billed Annually'}]
      }
    },
    {
      id: 'circulation',
      name: 'Circulation Support',
      formula: 'Beetroot + L-Citrulline',
      img: '/circulation.png',
      prices: { 
        gbp: [{total: '39.99', mo: null, label: '3-Month Supply'}, {total: '64.99', mo: '10.83', label: 'Billed Bi-Annually'}, {total: '109.99', mo: '9.16', label: 'Billed Annually'}],
        eur: [{total: '47.99', mo: null, label: '3-Month Supply'}, {total: '79.99', mo: '13.33', label: 'Billed Bi-Annually'}, {total: '134.99', mo: '11.24', label: 'Billed Annually'}]
      }
    },
    {
      id: 'cellular',
      name: 'Cellular Support',
      formula: 'Vitamin E + Selenium',
      img: '/cellular.png',
      prices: { 
        gbp: [{total: '34.99', mo: null, label: '3-Month Supply'}, {total: '54.99', mo: '9.16', label: 'Billed Bi-Annually'}, {total: '89.99', mo: '7.49', label: 'Billed Annually'}],
        eur: [{total: '42.99', mo: null, label: '3-Month Supply'}, {total: '64.99', mo: '10.83', label: 'Billed Bi-Annually'}, {total: '109.99', mo: '9.16', label: 'Billed Annually'}]
      }
    }
  ];

  const systemPrices = { 
    gbp: [{total: '99.99', mo: null, label: '3-Month System'}, {total: '169.99', mo: '28.33', label: 'Billed Bi-Annually'}, {total: '289.99', mo: '24.16', label: 'Billed Annually'}],
    eur: [{total: '119.99', mo: null, label: '3-Month System'}, {total: '204.99', mo: '34.16', label: 'Billed Bi-Annually'}, {total: '349.99', mo: '29.16', label: 'Billed Annually'}]
  };

  const currSym = currency === 'gbp' ? '£' : '€';

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
      setTimeout(() => { setShowWaitlist(false); setStatus('idle'); setEmail(''); }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate text-navy">
      <Head>
        <title>MEDiVi | Modern Men's Healthcare</title>
      </Head>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-navy/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl text-center border border-navy/5">
            <h3 className="text-3xl font-bold mb-4">Join the Protocol</h3>
            <p className="text-charcoal mb-8 opacity-80 text-sm leading-relaxed">Manufacturing is underway in Belfast. Join the waitlist for early access and launch-day pricing.</p>
            <form onSubmit={handleWaitlist} className="space-y-4">
              {status === 'success' ? (
                <div className="py-8 animate-pulse text-teal font-bold uppercase tracking-widest text-sm">
                  PROTOCOL ACCESS SECURED. CHECK YOUR INBOX.
                </div>
              ) : (
                <>
                  <input type="email" placeholder="Enter your email" required className="w-full px-6 py-4 rounded-xl border border-slate focus:border-teal outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'submitting'} />
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-teal transition-all tracking-widest text-xs uppercase disabled:opacity-50">
                    {status === 'submitting' ? 'VERIFYING...' : 'SECURE PRIORITY ACCESS'}
                  </button>
                </>
              )}
              <button type="button" onClick={() => setShowWaitlist(false)} className="text-[10px] text-charcoal/40 uppercase tracking-[0.3em] mt-4">Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md py-6 px-10 flex justify-between items-center shadow-sm sticky top-0 z-50 border-b border-navy/5">
        <div className="text-3xl font-bold tracking-tighter uppercase">MED<span className="text-teal">iVi</span></div>
        <div className="flex items-center gap-6">
          <button onClick={() => setCurrency('gbp')} className={`text-xs font-bold transition-all ${currency === 'gbp' ? 'text-teal border-b-2 border-teal' : 'text-navy/40'}`}>UK/NI (£)</button>
          <button onClick={() => setCurrency('eur')} className={`text-xs font-bold transition-all ${currency === 'eur' ? 'text-teal border-b-2 border-teal' : 'text-navy/40'}`}>ROI (€)</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-24 text-center px-6">
        <div className="inline-block px-4 py-1 bg-teal/10 text-teal rounded-full text-[10px] font-bold tracking-[0.2em] mb-6 uppercase italic">Currently in Production • Belfast, NI</div>
        <h1 className="text-5xl md:text-8xl font-medium max-w-5xl mx-auto leading-[0.9] tracking-tighter text-navy">
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
            <h2 className="text-2xl font-bold uppercase tracking-tight text-navy">{p.name}</h2>
            <p className="text-teal font-bold text-[10px] mb-12 tracking-[0.2em] uppercase">{p.formula}</p>
            
            <div className="w-full space-y-3">
              {['3-Month', '6-Month', '12-Month'].map((tier, i) => (
                <button key={tier} onClick={() => setShowWaitlist(true)} className="w-full py-4 px-6 rounded-2xl border border-slate flex justify-between items-center font-bold hover:bg-slate/30 transition text-sm group/btn">
                  <div>
                    <span className="text-navy/40 block text-[10px] uppercase tracking-widest mb-1">{tier}</span>
                    <span className="text-navy leading-none">
                      {currSym}{p.prices[currency][i].mo || p.prices[currency][i].total}
                      {p.prices[currency][i].mo && <span className="text-[10px] font-normal opacity-50"> /mo</span>}
                    </span>
                  </div>
                  <span className="text-teal text-[9px] font-bold uppercase tracking-widest opacity-60">{p.prices[currency][i].label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-16 tracking-tight text-navy">There’s a reason people are raving about us.</h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
                <div className="space-y-4">
                    <div className="flex text-teal text-sm">★★★★★</div>
                    <p className="text-lg font-medium leading-relaxed italic text-charcoal">"The quality of the Belfast-made formula is world-class. It’s rare to find a brand this transparent about their clinical sourcing."</p>
                    <p className="text-[10px] font-bold tracking-widest text-navy/40 uppercase">— Protocol Tester 014, Belfast</p>
                </div>
                <div className="space-y-4">
                    <div className="flex text-teal text-sm">★★★★★</div>
                    <p className="text-lg font-medium leading-relaxed italic text-charcoal">"Switching to the MEDiVi system simplified my entire health routine. The results in my energy levels have been exceptional."</p>
                    <p className="text-[10px] font-bold tracking-widest text-navy/40 uppercase">— Protocol Tester 028, Dublin</p>
                </div>
            </div>
        </div>
      </section>

      {/* System Bundle */}
      <section className="bg-navy py-32 px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-30" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl mb-6 tracking-tighter">THE MEDiVi COMPLETE SYSTEM</h2>
          <p className="text-teal font-bold mb-16 max-w-2xl mx-auto text-[10px] uppercase tracking-[0.4em]">Unified cellular, hormonal & circulatory optimization</p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {['3-Month System', '6-Month System', '12-Month System'].map((tier, i) => (
              <div key={tier} className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 flex flex-col group hover:bg-white/10 transition-all">
                <p className="text-[10px] font-bold tracking-[0.3em] mb-6 text-teal uppercase">{systemPrices[currency][i].label}</p>
                <div className="mb-10 text-left">
                    <p className="text-6xl font-bold tracking-tighter">
                      {currSym}{systemPrices[currency][i].mo || systemPrices[currency][i].total}
                      {systemPrices[currency][i].mo && <span className="text-lg font-normal opacity-30">/mo</span>}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-teal tracking-widest uppercase">
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
