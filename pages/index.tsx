import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [currency, setCurrency] = useState<'gbp' | 'eur'>('gbp');

  const products = [
    {
      id: 'hormone',
      name: 'Hormone Support',
      formula: 'Ashwagandha + Zinc',
      prices: { gbp: ['44.99', '79.99', '139.99'], eur: ['54.99', '94.99', '164.99'] }
    },
    {
      id: 'circulation',
      name: 'Circulation Support',
      formula: 'Beetroot + L-Citrulline',
      prices: { gbp: ['39.99', '69.99', '119.99'], eur: ['47.99', '84.99', '144.99'] }
    },
    {
      id: 'cellular',
      name: 'Cellular Support',
      formula: 'Vitamin E + Selenium',
      prices: { gbp: ['34.99', '59.99', '99.99'], eur: ['42.99', '72.99', '119.99'] }
    }
  ];

  const system = {
    name: 'MEDiVi Complete System',
    prices: { gbp: ['99.99', '179.99', '299.99'], eur: ['119.99', '214.99', '359.99'] }
  };

  const currSym = currency === 'gbp' ? '£' : '€';

  return (
    <div className="bg-slate min-h-screen text-charcoal">
      <Head>
        <title>MEDiVi | Modern Men's Healthcare</title>
        <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white py-6 px-8 flex justify-between items-center shadow-sm">
        <div className="text-3xl font-bold tracking-tighter text-navy">
          MED<span className="text-teal">iVi</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrency('gbp')}
            className={`px-3 py-1 rounded text-sm font-bold ${currency === 'gbp' ? 'bg-navy text-white' : 'bg-gray-100'}`}
          >UK (£)</button>
          <button 
            onClick={() => setCurrency('eur')}
            className={`px-3 py-1 rounded text-sm font-bold ${currency === 'eur' ? 'bg-navy text-white' : 'bg-gray-100'}`}
          >ROI (€)</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6 leading-tight">
          Men’s healthcare, built for men who <span className="text-teal underline decoration-2 underline-offset-8">expect more</span>
        </h1>
        <p className="text-xl opacity-80">Precision-formulated supplements for daily male vitality.</p>
      </header>

      {/* Individual Products */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal flex flex-col">
              <h2 className="text-2xl font-bold text-navy">{p.name}</h2>
              <p className="text-teal font-medium mb-8 italic">{p.formula}</p>
              
              <div className="space-y-3">
                {['3-Month', '6-Month', '12-Month'].map((tier, i) => (
                  <button key={tier} className="w-full flex justify-between items-center p-4 rounded-xl border border-slate hover:bg-teal hover:text-white transition group">
                    <span className="font-bold">{tier}</span>
                    <span className="text-lg font-bold">{currSym}{p.prices[currency][i]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Complete System Bundle */}
        <section className="bg-navy rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-widest">{system.name}</h2>
            <p className="mb-12 text-slate opacity-90 max-w-2xl mx-auto">The total protocol. Includes Hormone, Circulation, and Cellular support formulas in one optimized daily system.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {['3-Month Supply', '6-Month Supply', '12-Month Supply'].map((tier, i) => (
                <div key={tier} className="bg-charcoal p-6 rounded-2xl border border-slate/20">
                  <p className="text-sm uppercase tracking-widest mb-2 opacity-70">{tier}</p>
                  <p className="text-4xl font-bold mb-6">{currSym}{system.prices[currency][i]}</p>
                  <button className="bg-teal hover:bg-white hover:text-navy text-white w-full py-4 rounded-xl font-bold transition duration-300">
                    SELECT BUNDLE
                  </button>
                  {i >= 1 && <p className="mt-3 text-xs font-bold tracking-widest text-teal">** FREE SHIPPING INCLUDED **</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate text-center px-6">
        <div className="text-xl font-bold text-navy mb-4">MEDiVi</div>
        <p className="text-sm opacity-60 mb-6">Built for the man who expects more from his healthcare.</p>
        <div className="text-[10px] uppercase tracking-tighter opacity-40 max-w-3xl mx-auto leading-relaxed">
          Disclaimer: These statements have not been evaluated by health authorities. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before starting any supplement regimen. Free shipping applies to 6 and 12-month system orders within the UK, NI, and ROI.
        </div>
      </footer>
    </div>
  );
}
