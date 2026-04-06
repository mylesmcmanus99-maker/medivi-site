import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [currency, setCurrency] = useState<'gbp' | 'eur'>('gbp');

  const products = [
    {
      id: 'hormone',
      name: 'Hormone Support',
      formula: 'Ashwagandha + Zinc',
      img: '/hormone.png',
      prices: { gbp: ['44.99', '79.99', '139.99'], eur: ['54.99', '94.99', '164.99'] }
    },
    {
      id: 'circulation',
      name: 'Circulation Support',
      formula: 'Beetroot + L-Citrulline',
      img: '/circulation.png',
      prices: { gbp: ['39.99', '69.99', '119.99'], eur: ['47.99', '84.99', '144.99'] }
    },
    {
      id: 'cellular',
      name: 'Cellular Support',
      formula: 'Vitamin E + Selenium',
      img: '/cellular.png',
      prices: { gbp: ['34.99', '59.99', '99.99'], eur: ['42.99', '72.99', '119.99'] }
    }
  ];

  const systemPrices = { gbp: ['99.99', '179.99', '299.99'], eur: ['119.99', '214.99', '359.99'] };
  const currSym = currency === 'gbp' ? '£' : '€';

  return (
    <div className="min-h-screen">
      <Head>
        <title>MEDiVi | Men's Healthcare</title>
      </Head>

      {/* Navigation */}
      <nav className="bg-white py-6 px-10 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="text-3xl font-bold tracking-tighter text-navy uppercase">
          MED<span className="text-teal">iVi</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setCurrency('gbp')} className={`text-xs font-bold ${currency === 'gbp' ? 'text-teal border-b-2 border-teal' : 'text-navy'}`}>UK/NI (£)</button>
          <button onClick={() => setCurrency('eur')} className={`text-xs font-bold ${currency === 'eur' ? 'text-teal border-b-2 border-teal' : 'text-navy'}`}>ROI (€)</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-24 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-navy max-w-4xl mx-auto leading-[1.1]">
          Men’s healthcare, built for men who <span className="text-teal italic">expect more</span>
        </h1>
        <p className="mt-8 text-xl text-charcoal opacity-80 uppercase tracking-widest">Clinical Grade Protocols</p>
      </header>

      {/* Product Cards */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-8 pb-32">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[2rem] p-10 shadow-xl flex flex-col items-center border border-slate/50 hover:border-teal/30 transition-all">
            <img src={p.img} alt={p.name} className="h-72 w-auto object-contain mb-8 hover:scale-105 transition-transform" />
            <h2 className="text-2xl font-bold text-navy text-center uppercase tracking-tight">{p.name}</h2>
            <p className="text-teal font-bold text-sm mb-10 tracking-widest uppercase">{p.formula}</p>
            
            <div className="w-full space-y-3">
              {['3-Month', '6-Month', '12-Month'].map((tier, i) => (
                <button key={tier} className="w-full py-4 px-6 rounded-xl border border-slate flex justify-between font-bold hover:bg-navy hover:text-white transition group">
                  <span>{tier}</span>
                  <span className="text-teal group-hover:text-white">{currSym}{p.prices[currency][i]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bundle System */}
      <section className="bg-navy py-24 px-8 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">THE MEDiVi COMPLETE SYSTEM</h2>
          <p className="text-slate/70 mb-16 max-w-2xl mx-auto text-lg uppercase tracking-widest">Total daily support for the modern man</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {['3-Month System', '6-Month System', '12-Month System'].map((tier, i) => (
              <div key={tier} className="bg-charcoal/30 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col">
                <p className="text-xs font-bold tracking-[0.2em] mb-4 opacity-60 uppercase">{tier}</p>
                <p className="text-5xl font-bold mb-10 tracking-tight">{currSym}{systemPrices[currency][i]}</p>
                <button className="bg-teal hover:bg-white hover:text-navy text-white w-full py-5 rounded-2xl font-black transition-all transform active:scale-95">ADD TO BASKET</button>
                {i >= 1 && <p className="mt-6 text-[10px] font-bold tracking-[0.3em] text-teal animate-pulse">** FREE SHIPPING INCLUDED **</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center px-6 bg-slate">
        <div className="text-sm tracking-[0.5em] font-bold mb-8 opacity-40">MEDiVi HEALTHCARE</div>
        <div className="max-w-2xl mx-auto text-[10px] uppercase leading-relaxed opacity-40">
          medivi.co.uk | medivi.ie <br />
          These products are food supplements. Free shipping on 6/12 month systems to NI, UK, and ROI.
        </div>
      </footer>
    </div>
  );
}
