'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Leaf,
  ShieldCheck,
  Truck,
  Sprout,
  Heart,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
  Search,
  Zap,
} from 'lucide-react';

import {
  PRODUCTS,
  CATEGORIES,
  CATEGORY_IMAGES,
  CATEGORY_ICONS,
} from '@/lib/products';

import ProductCard from '@/components/ProductCard';

// ============================================================
// IMAGES
// ============================================================

// Hero image
const HERO_IMG =
  'https://images.pexels.com/photos/16970055/pexels-photo-16970055.jpeg?auto=compress&cs=tinysrgb&w=2000';

// About section placeholder
// Replace this with your own image later.
// Example: '/products/about-banner.jpg'
const ABOUT_IMAGE = '/products/farm2.jpg';

// Newsletter / CTA image
const FAMILY_IMG =
  'https://images.unsplash.com/photo-1615743837666-21eb0cc0f342?w=1200&q=80';


// ============================================================
// COUNTER
// ============================================================

function Counter({ to, suffix = '+' }) {
  return (
    <span className="font-display text-5xl md:text-6xl text-forest">
      {to.toLocaleString()}
      {suffix}
    </span>
  );
}


// ============================================================
// HOME PAGE
// ============================================================

export default function HomePage() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 200]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0]
  );

  // First 8 products
  const featured = PRODUCTS.slice(0, 8);

  // Since badges/discounts were removed from products.js,
  // use another group of products for Customer Favorites.
  const favorites = PRODUCTS.slice(8, 16);

  return (
    <div className="overflow-hidden">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      >

        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMG}
            alt="Organic farm"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-forestDark/40 via-forestDark/20 to-cream" />
        </motion.div>


        {/* Floating decorative elements */}

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute text-cream/40 hidden md:block"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + (i * 15) % 90}%`,
              fontSize: `${24 + i * 6}px`,
            }}
          >
            ✨
          </motion.div>
        ))}


        {/* Hero content */}

        <div className="relative container py-20 text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/90 text-forest text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Leaf className="w-3.5 h-3.5" />

            100% Organic • Karnataka Farmers • Since 2008
          </motion.div>


          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] text-balance drop-shadow-2xl"
          >
            Pure. Organic.
            <br />

            <span className="italic text-gold">
              From the Earth.
            </span>
          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
            className="mt-6 text-lg md:text-xl text-cream/90 max-w-2xl mx-auto"
          >
            Heirloom rice, ancient millets, cold-pressed oils &
            farm-fresh goodness — grown by 11,000+ Karnataka
            farmers, delivered straight to your home.
          </motion.p>


          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >

            <Link
              href="/shop"
              className="btn-glow group bg-gold text-forestDark font-semibold rounded-full px-8 py-4 flex items-center gap-2 hover:bg-cream"
            >
              Shop Now

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>


            <Link
              href="/#categories"
              className="backdrop-blur bg-cream/10 border border-cream/30 text-cream rounded-full px-8 py-4 hover:bg-cream/20 transition font-medium"
            >
              Explore Categories
            </Link>

          </motion.div>


          {/* Search */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="mt-10 max-w-xl mx-auto"
          >

            <form
              action="/shop"
              className="flex items-center bg-cream rounded-full shadow-2xl p-1.5 border border-cream/50"
            >

              <Search className="w-4 h-4 ml-4 text-moss" />

              <input
                name="q"
                placeholder="Search rice, millets, oils..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-forest placeholder:text-moss/60 outline-none"
              />

              <button
                className="bg-forest text-cream rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-olive transition"
              >
                Search
              </button>

            </form>

          </motion.div>

        </div>


        {/* Marquee */}

        <div className="absolute bottom-0 left-0 right-0 bg-forest text-cream py-3 overflow-hidden">

          <div className="flex animate-marquee whitespace-nowrap">

            {[0, 1].map((_, k) => (
              <span
                key={k}
                className="px-4 text-sm tracking-wide"
              >
                ✨ 100% Organic Certified • 🌾 Heirloom Varieties • 🚜 Direct from Farmers • 🌿 Zero Chemicals • ✨ Free Shipping above ₹999 • 🍒 Fresh Harvest •
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          CATEGORIES
      ====================================================== */}

      <section
        id="categories"
        className="py-24 container"
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-14"
        >

          <div className="text-xs tracking-[0.3em] uppercase text-olive mb-3">
            Shop by Category
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-forest">
            From farm{' '}
            <span className="italic">
              to your kitchen
            </span>
          </h2>

          <p className="text-moss/80 mt-3 max-w-xl mx-auto">
            Explore 12 categories of farm-fresh organic goodness
          </p>

        </motion.div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {CATEGORIES.map((c, i) => (

            <motion.div
              key={c}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.05,
              }}
            >

              <Link
                href={`/shop?category=${encodeURIComponent(c)}`}
                className="group block relative overflow-hidden rounded-2xl aspect-[4/5] card-hover"
              >

                <img
                  src={CATEGORY_IMAGES[c]}
                  alt={c}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forestDark/90 via-forestDark/30 to-transparent" />

                <div className="absolute top-3 right-3 text-3xl group-hover:scale-125 transition">
                  {CATEGORY_ICONS[c]}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-cream">

                  <div className="font-display text-2xl leading-tight">
                    {c}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition">
                    Shop now
                    <ChevronRight className="w-3 h-3" />
                  </div>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </section>


      {/* ======================================================
          ABOUT / IMAGE PLACEHOLDER
      ====================================================== */}

      <section className="py-24 bg-beige/40 relative overflow-hidden">

        {/* Decorative background */}

        <div className="absolute -top-20 -right-20 w-96 h-96 bg-olive/10 rounded-full blur-3xl" />

        <div className="container relative">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* IMAGE PLACEHOLDER */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="relative"
            >

              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-beige aspect-[4/3]">

                <img
                  src={ABOUT_IMAGE}
                  alt="Avani Organics"
                  className="w-full h-full object-cover"
                />

                

              </div>

            </motion.div>


            {/* ABOUT TEXT */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >

              <div className="text-xs tracking-[0.3em] uppercase text-olive mb-3">
                Our Story
              </div>

              <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight">
                AVANI means{' '}
                <span className="italic">
                  Earth.
                </span>
              </h2>

              <p className="text-moss/80 mt-5 leading-relaxed">
                Avani Organics is a brand promoted by{' '}
                <b>BHOOMI Sustainable Development Society</b>.
                We work hand-in-hand with 11,000+ rural farming
                families across 8 districts of Karnataka —
                supporting organic farming, soil & water
                conservation, and the rearing of native livestock
                breeds.
              </p>

              <p className="text-moss/80 mt-4 leading-relaxed">
                From seed to your kitchen, every grain carries a
                farmer's promise.
              </p>


              {/* Stats */}

              <div className="grid grid-cols-3 gap-6 mt-10">

                {[
                  {
                    n: 11000,
                    l: 'Farming Families',
                  },
                  {
                    n: 8750,
                    l: 'Acres Organic Land',
                  },
                  {
                    n: 400,
                    l: 'Retail Partners',
                  },
                ].map((s) => (

                  <div key={s.l}>

                    <Counter to={s.n} />

                    <div className="text-xs uppercase tracking-wider text-moss mt-1">
                      {s.l}
                    </div>

                  </div>

                ))}

              </div>


              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-forest font-semibold border-b-2 border-gold pb-1 hover:gap-3 transition-all"
              >
                Know more about us

                <ArrowRight className="w-4 h-4" />
              </Link>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <section className="py-24 container">

        <div className="flex flex-wrap items-end justify-between mb-12 gap-4">

          <div>

            <div className="text-xs tracking-[0.3em] uppercase text-olive mb-3">
              Featured
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-forest">
              Our products{' '}
              <span className="italic">
                this season
              </span>
            </h2>

          </div>


          <Link
            href="/shop"
            className="text-forest font-semibold hover:text-olive flex items-center gap-2"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {featured.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              index={i}
            />
          ))}

        </div>

      </section>


      {/* ======================================================
          WHY CHOOSE US
      ====================================================== */}

      <section
        id="why"
        className="py-24 bg-forest text-cream relative overflow-hidden"
      >

        <div className="absolute inset-0 grain opacity-30" />

        <div className="absolute -top-20 left-10 w-72 h-72 bg-olive/20 rounded-full blur-3xl" />

        <div className="container relative">

          <div className="text-center mb-14">

            <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
              Why Avani
            </div>

            <h2 className="font-display text-4xl md:text-5xl">
              Goodness you can{' '}
              <span className="italic text-gold">
                taste & trust
              </span>
            </h2>

          </div>


          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

            {[
              {
                icon: Leaf,
                t: '100% Organic',
                d: 'Certified pure, no synthetics',
              },
              {
                icon: Sprout,
                t: 'Farm Fresh',
                d: 'Harvested within days',
              },
              {
                icon: Truck,
                t: 'Fast Delivery',
                d: 'Pan-India shipping',
              },
              {
                icon: ShieldCheck,
                t: 'Lab Tested',
                d: 'Every batch checked',
              },
              {
                icon: Heart,
                t: 'Farmer First',
                d: 'Fair price guaranteed',
              },
              {
                icon: Star,
                t: 'Native Heirlooms',
                d: 'Traditional varieties',
              },
            ].map((f, i) => {

              const Icon = f.icon;

              return (
                <motion.div
                  key={f.t}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="bg-cream/5 backdrop-blur border border-cream/10 rounded-2xl p-5 hover:border-gold/40 hover:bg-cream/10 transition"
                >

                  <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-4">

                    <Icon className="w-6 h-6" />

                  </div>

                  <div className="font-display text-xl">
                    {f.t}
                  </div>

                  <div className="text-xs text-cream/70 mt-1">
                    {f.d}
                  </div>

                </motion.div>
              );

            })}

          </div>

        </div>

      </section>


      {/* ======================================================
          CUSTOMER FAVORITES
      ====================================================== */}

      <section className="py-24 container">

        <div className="flex flex-wrap items-end justify-between mb-12 gap-4">

          <div>

            <div className="text-xs tracking-[0.3em] uppercase text-olive mb-3">
              Top Picks
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-forest">
              Customer{' '}
              <span className="italic">
                favorites
              </span>
            </h2>

          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {favorites.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              index={i}
            />
          ))}

        </div>

      </section>


      {/* ======================================================
          TESTIMONIALS
      ====================================================== */}

      <section className="py-24 bg-beige/40 relative overflow-hidden">

        <div className="container">

          <div className="text-center mb-14">

            <div className="text-xs tracking-[0.3em] uppercase text-olive mb-3">
              Loved by Families
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-forest">
              What our customers{' '}
              <span className="italic">
                say
              </span>
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                n: 'Priya Sharma',
                loc: 'Bengaluru',
                r: 5,
                t: 'The Rajamudi rice is incredible. My family loves the aroma and taste. Reminds me of my grandmother’s kitchen.',
              },
              {
                n: 'Anand Kumar',
                loc: 'Mysuru',
                r: 5,
                t: 'Switched my entire pantry to Avani. The cold-pressed coconut oil is the real deal — you can taste the difference.',
              },
              {
                n: 'Lakshmi Iyer',
                loc: 'Chennai',
                r: 5,
                t: 'I love that I’m supporting Karnataka farmers directly. Packaging is gorgeous and the millets are top quality.',
              },
            ].map((t, i) => (

              <motion.div
                key={t.n}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: i * 0.1,
                }}
                className="bg-white rounded-2xl p-6 relative shadow-md hover:shadow-xl transition"
              >

                <Quote className="absolute -top-3 -left-3 w-10 h-10 text-gold bg-cream rounded-full p-2" />


                <div className="flex gap-1 mb-3">

                  {[...Array(t.r)].map((_, k) => (
                    <Star
                      key={k}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}

                </div>


                <p className="text-forest/80 leading-relaxed italic">
                  “{t.t}”
                </p>


                <div className="mt-5 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-forest text-cream flex items-center justify-center font-bold">
                    {t.n[0]}
                  </div>

                  <div>

                    <div className="font-semibold text-forest">
                      {t.n}
                    </div>

                    <div className="text-xs text-moss">
                      {t.loc}
                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          NEWSLETTER / CTA
      ====================================================== */}

      <section className="py-24 container">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          className="relative rounded-3xl overflow-hidden bg-forest text-cream p-10 md:p-16"
        >

          <img
            src={FAMILY_IMG}
            alt="Organic farming family"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-forestDark via-forestDark/80 to-transparent" />


          <div className="relative max-w-xl">

            <Zap className="w-8 h-8 text-gold mb-4" />

            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Get{' '}
              <span className="italic text-gold">
                10% off
              </span>{' '}
              your first organic order
            </h2>

            <p className="mt-4 text-cream/80">
              Subscribe for farm stories, seasonal recipes &
              exclusive offers delivered right to your inbox.
            </p>


            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-8 bg-gold text-forestDark font-semibold px-7 py-3.5 rounded-full hover:bg-cream transition btn-glow"
            >
              Start Shopping

              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </motion.div>

      </section>

    </div>
  );
}