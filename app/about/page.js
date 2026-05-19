'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, Sprout, Award, Globe, Users, Heart, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const stats = [{ n: '11,000+', l: 'Rural farming families' }, { n: '8,750+', l: 'Acres organic land' }, { n: '400+', l: 'Retail partners' }, { n: '8', l: 'Karnataka districts' }];
  return (
    <div className="bg-cream">
      <section className="relative h-[70vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1471289660181-7feae98d61ae?w=2000&q=80" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forestDark/40 via-forestDark/50 to-cream" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Our Story</div>
            <h1 className="font-display text-5xl md:text-7xl text-cream">AVANI means <span className="italic">Earth.</span></h1>
            <p className="text-cream/80 mt-4 max-w-xl mx-auto">A movement that began with one promise — farm with the land, not against it.</p>
          </motion.div>
        </div>
      </section>

      <section className="container py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src="https://images.pexels.com/photos/29283558/pexels-photo-29283558.jpeg?w=1200" className="rounded-3xl shadow-xl" />
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.3em] uppercase text-olive mb-2">The Mission</div>
          <h2 className="font-display text-4xl text-forest leading-tight">A brand built on <span className="italic">farmer livelihoods</span>.</h2>
          <p className="text-moss/80 mt-5 leading-relaxed">Avani Organic is promoted by <b>BHOOMI Sustainable Development Society</b>. BHOOMI works with over 11,000 farming families across 8 districts in Karnataka. These families are purely involved in organic farming, soil & water conservation, and the rearing of local livestock breeds. The grains they grow — organically — are marketed by AVANI Organic.</p>
          <p className="text-moss/80 mt-3 leading-relaxed">Every order you place strengthens a rural livelihood.</p>
        </motion.div>
      </section>

      <section className="bg-forest text-cream py-20 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-30" />
        <div className="container relative grid md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-display text-6xl text-gold">{s.n}</div>
              <div className="text-sm text-cream/70 mt-2 uppercase tracking-wider">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container py-20">
        <div className="text-center mb-12"><div className="text-xs tracking-[0.3em] uppercase text-olive mb-2">Our Process</div><h2 className="font-display text-4xl text-forest">From <span className="italic">farm to your home</span></h2></div>
        <div className="grid md:grid-cols-4 gap-5">
          {[{ i: Sprout, t: 'Sow', d: 'Native heirloom seeds, no GMOs' }, { i: Leaf, t: 'Grow', d: 'Organic methods, soil conservation' }, { i: Award, t: 'Harvest', d: 'Hand-picked, sun-dried' }, { i: Heart, t: 'Deliver', d: 'Straight to your kitchen' }].map((s, i) => (
            <motion.div key={s.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative bg-white border border-beige rounded-2xl p-6 text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-olive/20 text-olive mx-auto flex items-center justify-center"><s.i className="w-7 h-7" /></div>
              <div className="absolute -top-3 left-4 bg-forest text-cream text-[10px] font-bold rounded-full px-2.5 py-1">STEP {i + 1}</div>
              <div className="font-display text-2xl text-forest mt-4">{s.t}</div>
              <p className="text-sm text-moss mt-2">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.3em] uppercase text-olive mb-2">Certifications</div>
          <h2 className="font-display text-4xl text-forest leading-tight">Earned, not <span className="italic">claimed.</span></h2>
          <p className="text-moss/80 mt-4">Every batch of Avani goes through rigorous quality checks. From soil testing to packaging, traceability is built into every step.</p>
          <ul className="mt-6 space-y-2 text-sm text-forest">
            {['India Organic Certified', 'NPOP Compliant', 'PGS-India Verified', 'Farmer-Owned Cooperative'].map(c => (
              <li key={c} className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-olive" /> {c}</li>
            ))}
          </ul>
        </motion.div>
        <motion.img initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src="https://images.unsplash.com/photo-1492496913980-501348b61469?w=1200&q=80" className="rounded-3xl shadow-xl" />
      </section>

      <section className="container pb-20 text-center">
        <Link href="/shop" className="inline-flex items-center gap-2 bg-forest text-cream rounded-full px-8 py-4 hover:bg-olive transition btn-glow">Shop our products <ChevronRight className="w-4 h-4" /></Link>
      </section>
    </div>
  );
}
