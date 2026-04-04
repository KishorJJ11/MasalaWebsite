import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import logoImg from './assets/logo.png'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import './App.css'

/* ─── CONFIG ─────────────────────────────────────────────────── */
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"
const TELEGRAM_CHAT_ID   = "YOUR_CHAT_ID"

/* ─── DATA ───────────────────────────────────────────────────── */
const SPICES = [
  { id: 1,  name: "Chicken 65 Masala",       price: 69,  quantity: "100g", category: "Non-Veg",   desc: "A fiery and aromatic blend for the perfect South Indian Chicken 65.",    image: "/product_packet.png",    longDesc: "Our Chicken 65 masala is crafted with premium red chillies and a secret blend of spices to give you that authentic restaurant flavor at home." },
  { id: 2,  name: "Tandoori Masala",          price: 96,  quantity: "100g", category: "Non-Veg",   desc: "Smoky and rich blend for authentic Tandoori dishes.",                    image: "/hero_spices.png",       longDesc: "Specially ground to bring out the smoky essence in your grills and tikka." },
  { id: 3,  name: "Chicken Kozhambu Masala",  price: 59,  quantity: "100g", category: "Non-Veg",   desc: "Traditional South Indian Chicken Curry blend.",                          image: "/spice_mix_2.png",       longDesc: "A comforting blend that recreates the magic of home-style chicken gravy." },
  { id: 4,  name: "Fish Fry Masala",          price: 86,  quantity: "100g", category: "Non-Veg",   desc: "The ultimate seasoning for crispy and delicious fish fry.",             image: "/product_packet.png" },
  { id: 5,  name: "Fish Kozhambu Masala",     price: 55,  quantity: "100g", category: "Non-Veg",   desc: "Tangy and spicy blend for traditional fish curry.",                     image: "/spice_mix_2.png" },
  { id: 6,  name: "Mutton Kozhambu Masala",   price: 67,  quantity: "100g", category: "Non-Veg",   desc: "Rich and robust spices for deep-flavored mutton gravy.",                image: "/hero_spices.png" },
  { id: 7,  name: "Mutton Chukka Masala",     price: 129, quantity: "100g", category: "Non-Veg",   desc: "Intense and spicy blend for the legendary Mutton Chukka.",             image: "/spice_mix_2.png" },
  { id: 8,  name: "Channa Masala",            price: 90,  quantity: "100g", category: "Veg",       desc: "Perfectly balanced spices for heartwarming Chickpea curry.",            image: "/product_packet.png" },
  { id: 9,  name: "Biriyani Masala",          price: 212, quantity: "100g", category: "Veg",       desc: "The king of spices for the most aromatic Biriyani.",                    image: "/hero_spices.png" },
  { id: 10, name: "Karuppu Kavuni Health Mix",price: 45,  quantity: "100g", category: "Health Mix", desc: "Nutritious mix for weight loss and overall health.",                    image: "/spice_mix_2.png" },
  { id: 11, name: "Millet Health Mix",        price: 48,  quantity: "100g", category: "Health Mix", desc: "Powerhouse of nutrients for an energetic day.",                        image: "/product_packet.png" },
  { id: 12, name: "Sprouted Health Mix",      price: 52,  quantity: "100g", category: "Health Mix", desc: "Gentle and nutritious, perfect for babies and growing children.",     image: "/hero_spices.png" },
  { id: 13, name: "Idli Podi",               price: 51,  quantity: "100g", category: "Podi",      desc: "Traditional accompaniment for fluffy Idlis and crispy Dosas.",         image: "/spice_mix_2.png" },
  { id: 14, name: "Sambar Podi",             price: 62,  quantity: "100g", category: "Podi",      desc: "The heart of every South Indian meal, aromatic and pure.",             image: "/product_packet.png" },
  { id: 15, name: "Kuzhambu Masala",         price: 65,  quantity: "100g", category: "Veg",       desc: "Versatile blend for all types of South Indian gravies.",               image: "/hero_spices.png" },
  { id: 16, name: "Puliyodharai Paste",      price: 44,  quantity: "100g", category: "Podi",      desc: "Tangy Tamarind paste for authentic Temple-style rice.",                image: "/spice_mix_2.png" },
  { id: 17, name: "Dry Chilli Powder",       price: 53,  quantity: "100g", category: "Podi",      desc: "Pure, high-quality dried red chilli powder for that perfect heat.",    image: "/product_packet.png" },
]

const CATEGORIES = ["All", "Non-Veg", "Veg", "Health Mix", "Podi"]

/* ─── SCROLL TO TOP ──────────────────────────────────────────── */
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ─── FADE VARIANTS ──────────────────────────────────────────── */
const fadeIn = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.1 },
  transition:  { duration: 0.7, ease: "easeOut" },
}

const stagger = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, amount: 0.1 },
  transition:  { duration: 0.7, ease: "easeOut", delay },
})

/* ─── ICONS ──────────────────────────────────────────────────── */
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

const IconWhatsApp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.66 1.438 5.168L2 22l4.978-1.404A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
  </svg>
)

const IconInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const IconArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar({ scrolled, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isSubPage = location.pathname !== '/'

  useEffect(() => { setMenuOpen(false) }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar ${scrolled || isSubPage ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="navbar-logo-link">
            <img src={logoImg} alt="RM Masalas Logo" className="navbar-logo" />
          </Link>

          <div className="nav-links">
            {[['/', 'Home'], ['/collections', 'Collections'], ['/blogs', 'Blogs'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="nav-link">{label}</Link>
            ))}
          </div>

          <div className="nav-actions">
            <Link to="/cart" className="cart-icon-wrapper desktop-only" style={{ textDecoration: 'none' }}>
              <IconCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to="/collections" className="btn-navbar desktop-only" style={{ textDecoration: 'none' }}>Order Now</Link>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
            >
              <span className={`bar ${menuOpen ? 'open' : ''}`} />
              <span className={`bar ${menuOpen ? 'open' : ''}`} />
              <span className={`bar ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu open"
          >
            <button className="mobile-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close Menu">✕</button>

            <nav className="mobile-nav-links">
              {[['/', 'Home'], ['/collections', 'Collections'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label], i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <Link to={to} className="mobile-nav-link">{label}</Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <Link to="/cart" className="btn-primary mobile-order-btn" style={{ textDecoration: 'none' }}>
                  🛒 View Cart ({cartCount})
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <img src={logoImg} alt="RM Masalas Logo" className="footer-logo logo-circle" />
            <h3 className="footer-tagline">Aroma of Tradition,<br/>Taste of Home</h3>
          </div>

          <div className="footer-col">
            <h4>Quick Explore</h4>
            <ul className="footer-links">
              {[['/', 'Home'], ['/collections', 'Collections'], ['/about', 'Our Legacy'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect With Us</h4>
            <p className="footer-contact-info">rmmasalas@gmail.com</p>
            <p className="footer-contact-info">+91 86674 25703</p>
            <div className="footer-socials">
              <a href="https://wa.me/918667425703" className="social-icon-v2" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
              <a href="https://instagram.com/rm_masalas" className="social-icon-v2" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 RM Masalas. All rights reserved.</p>
          <p>Packed with ❤️ by Rethinaselvi</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── FLOATING BTNS ──────────────────────────────────────────── */
function FloatingButtons({ showTop }) {
  return (
    <div className="floating-btns">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="float-btn float-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <IconArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/918667425703"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-wa"
        aria-label="Chat on WhatsApp"
      >
        <IconWhatsApp />
      </a>
    </div>
  )
}

/* ─── PRODUCT CARD ───────────────────────────────────────────── */
function ProductCard({ spice, onAddToCart }) {
  const navigate = useNavigate()

  return (
    <motion.div
      {...fadeIn}
      className="modern-card interact-card"
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onClick={() => navigate(`/product/${spice.id}`)}
    >
      <div className="product-card-img-wrap">
        <img src={spice.image} alt={spice.name} loading="lazy" />
      </div>
      <h3 className="product-card-name">{spice.name}</h3>
      <p className="product-card-desc">{spice.desc}</p>
      <div className="product-card-footer">
        <div className="product-card-price-row">
          <span className="product-price">₹{spice.price}</span>
          <span className="product-qty">for {spice.quantity}</span>
        </div>
        <div className="product-card-actions" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onAddToCart(spice)}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            Add to Cart
          </button>
          <Link to={`/checkout?id=${spice.id}`} className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>Order Now</Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── HOME PAGE ──────────────────────────────────────────────── */
function Home({ onAddToCart }) {
  const heroSlides = [
    { image: "/hero_1.png", badge: "Premium Quality", title: "Aroma of <span>Tradition</span>", subtitle: "Bringing the authentic village-style spice blends to your modern kitchen.", cta: "Explore Collections", link: "/collections" },
    { image: "/hero_2.png", badge: "Small-Batch Freshness", title: "Taste of <span>Home</span>", subtitle: "Freshly ground, aromatic blends crafted with love and no preservatives.", cta: "Shop Now", link: "/collections" },
    { image: "/hero_3.png", badge: "Direct Sourcing", title: "Purity <span>Guaranteed</span>", subtitle: "The finest ingredients sourced directly from traditional organic farms.", cta: "Our Story", link: "/about" },
  ]

  const stats = [
    { number: "17+", label: "Premium Blends" },
    { number: "500+", label: "Happy Families" },
    { number: "100%", label: "Natural & Pure" },
    { number: "5★",   label: "Customer Rating" },
  ]

  const whyUs = [
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Small Batches", text: "We craft each blend in small batches to ensure maximum aroma and freshness in every pack." },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, title: "Traditional Sourcing", text: "Finest ingredients sourced directly from trusted farms — capturing the true essence of home cooking." },
    { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: "Pure & Natural", text: "No artificial colors or preservatives — just pure, freshly ground goodness in every pinch." },
  ]

  return (
    <main>
      {/* Hero Slider */}
      <section id="home" className="hero-section-new">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          className="main-hero-swiper"
        >
          {heroSlides.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="hero-slide-content"
                style={{ backgroundImage: `linear-gradient(rgba(15,5,0,0.55), rgba(15,5,0,0.60)), url(${item.image})` }}
              >
                <div className="hero-text-wrapper">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-badge-v2">
                    ✦ {item.badge}
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="hero-title-v2"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="hero-subtitle-v2">
                    {item.subtitle}
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="hero-cta-v2">
                    <Link to={item.link} className="btn-primary-v2">{item.cta} →</Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Stats Strip */}
      <section className="stats-strip" style={{ padding: 0 }}>
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} {...stagger(i * 0.1)} className="stat-item">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products">
        <div className="container">
          <motion.h2 {...fadeIn} className="section-title">Featured <span>Blends</span></motion.h2>
          <motion.p {...stagger(0.1)} className="section-subtitle">Handpicked bestsellers crafted in small batches for the finest aroma.</motion.p>
          <div className="quality-grid">
            {[SPICES[0], SPICES[8], SPICES[11]].map(spice => (
              <ProductCard key={spice.id} spice={spice} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div className="show-more-wrap">
            <Link to="/collections" className="btn-secondary">View Full Collection →</Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-hero-grid">
            <motion.div {...fadeIn}>
              <div className="hero-badge">Aroma of Tradition</div>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: '1rem' }}>
                Taste of <span>Home</span>
              </h2>
              <p className="about-preview-text">
                At RM Masalas, we carry forward the comforting taste of home into every kitchen. Our freshly ground blends are crafted in small batches to ensure the highest quality aroma, taste, and freshness in every pinch.
              </p>
              <Link to="/about" className="btn-secondary">Discover Our Story →</Link>
            </motion.div>
            <motion.div {...stagger(0.2)}>
              <div className="about-img-wrap">
                <img src="/spice_mix_2.png" alt="RM Masalas" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="quality-section">
        <div className="container">
          <motion.h2 {...fadeIn} className="section-title">Why Choose <span>RM Masalas</span></motion.h2>
          <motion.p {...stagger(0.1)} className="section-subtitle">Because your family deserves nothing but the purest and most flavourful spices.</motion.p>
          <div className="quality-grid">
            {whyUs.map((item, i) => (
              <motion.div key={i} {...stagger(i * 0.12)} className="quality-card">
                <div className="quality-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─── COLLECTIONS PAGE ───────────────────────────────────────── */
function CollectionsPage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? SPICES
    : SPICES.filter(s => s.category === activeCategory)

  return (
    <section className="collections-page">
      <div className="container">
        <motion.h1 {...fadeIn} className="section-title">Our Full <span>Spice Collection</span></motion.h1>
        <motion.p {...stagger(0.1)} className="section-subtitle">17 handcrafted blends — each made fresh in small batches with no preservatives.</motion.p>

        {/* Filter Pills */}
        <div className="filter-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="quality-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map(spice => (
              <ProductCard key={spice.id} spice={spice} onAddToCart={onAddToCart} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT PAGE ─────────────────────────────────────────────── */
function AboutPage() {
  return (
    <div className="about-page">
      {/* Brand Hero Story */}
      <section className="about-hero-section">
        <div className="container">
          <motion.div {...fadeIn} className="about-story-header">
            <div className="hero-badge" style={{ margin: '0 auto 1.5rem' }}>Our Authentic Journey</div>
            <h1 className="section-title">Aroma of <span>Tradition</span></h1>
          </motion.div>

          <div className="about-content-grid">
            <motion.div {...stagger(0.15)} className="about-text-content">
              <p className="lead-text">
                At RM Masalas, we believe that every meal tells a story, and every spice adds a chapter to it.
              </p>
              <p>
                Rooted in tradition, we bring you freshly ground masalas that capture the true essence of home cooking.
                We carefully source the finest ingredients and craft each blend in small batches to ensure the right aroma,
                taste, and freshness in every pinch.
              </p>
              <p>
                RM Masalas isn't just about spices; it's about carrying forward the comforting taste of home into every kitchen,
                making every meal warm, flavorful, and memorable.
              </p>
              <div className="brand-closure-v2">
                RM Masalas — Aroma of tradition, taste of home.
              </div>
            </motion.div>

            <motion.div {...stagger(0.3)} className="about-image-wrapper">
              <img src="/hero_1.png" alt="Traditional Spices at RM Masalas" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="founder-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="founder-note-card"
          >
            <div className="quote-mark-large">"</div>
            <h2 className="section-title">Founder's <span>Note</span></h2>

            <div className="founder-message-content">
              <p style={{ color: 'var(--text-h)', fontWeight: 600 }}>
                "RM Masalas began with a simple promise I made to myself — to bring the same freshness and authenticity
                I use in my own kitchen to families who value true taste.
              </p>
              <p>
                I personally visit wholesale distributors to select and inspect each ingredient, ensuring that only the finest
                spices go into every batch we grind. This hands-on approach is my way of preserving the purity and aroma
                that turn everyday meals into something special.
              </p>
              <p>
                For me, masalas are not just about adding flavor; they are about preserving traditions, nurturing families,
                and bringing the comfort of home to every plate.
              </p>
              <p>
                Thank you for making RM Masalas a part of your kitchen and your family's meals."
              </p>
            </div>

            <div className="founder-sign-block">
              <div className="sign-info">
                <h4>Rethinaselvi</h4>
                <p>Founder, RM Masalas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ─── PRODUCT DETAIL PAGE ────────────────────────────────────── */
function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams()
  const spice  = SPICES.find(s => s.id === parseInt(id))
  const navigate = useNavigate()

  if (!spice) return <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>Product not found.</div>

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="detail-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="detail-image-wrap">
            <img src={spice.image} alt={spice.name} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="detail-info">
            <Link to="/collections" className="back-link">← Back to Collections</Link>
            <h1 className="detail-title">{spice.name}</h1>
            <div className="detail-meta">
              <span className="detail-category">{spice.category}</span>
              <span className="detail-qty">{spice.quantity} Pack</span>
            </div>
            <div className="detail-price">₹{spice.price}</div>
            <p className="detail-desc">{spice.longDesc || spice.desc}</p>
            
            <div className="detail-actions">
              <button 
                onClick={() => { onAddToCart(spice); navigate('/cart'); }} 
                className="btn-primary"
                style={{ padding: '1rem 2.5rem' }}
              >
                Add to Cart
              </button>
              <Link 
                to={`/checkout?id=${spice.id}`} 
                className="btn-secondary"
                style={{ padding: '1rem 2.5rem', textAlign: 'center' }}
              >
                Order Now
              </Link>
            </div>

            <div className="detail-highlights">
              <div className="highlight-item">✓ 100% Natural</div>
              <div className="highlight-item">✓ No Preservatives</div>
              <div className="highlight-item">✓ Handcrafted</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─── CART PAGE ─────────────────────────────────────────────── */
function CartPage({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <section className="cart-page-section">
      <div className="container">
        <motion.h1 {...fadeIn} className="section-title">Your <span>Shopping Cart</span></motion.h1>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link to="/collections" className="btn-primary">Explore Products</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <motion.div 
                  key={`${item.id}-${index}`} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="cart-item-card"
                >
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="cart-item-price">₹{item.price}</div>
                  <button onClick={() => onRemove(index)} className="cart-remove-btn" title="Remove item">✕</button>
                </motion.div>
              ))}
            </div>

            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({cart.length})</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span style={{ color: '#27ae60' }}>FREE</span>
              </div>
              <div className="summary-total">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              <Link to="/checkout" className="btn-primary w-100" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── CHECKOUT PAGE ──────────────────────────────────────────── */
function CheckoutPage({ cart }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { search }     = useLocation()
  const params         = new URLSearchParams(search)
  const singleId       = params.get('id')
  
  const singleProduct  = singleId ? SPICES.find(s => s.id === parseInt(singleId)) : null
  const itemsToOrder   = singleProduct ? [singleProduct] : cart
  const totalAmount    = itemsToOrder.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    const itemsList = itemsToOrder.map(item => `- ${item.name} (₹${item.price})`).join('\n')
    const message = `
🔔 *New Order Received!*

👤 *Customer:* ${data.name}
📞 *Phone:* ${data.phone}
📍 *Address:* ${data.address}
📌 *Pincode:* ${data.pincode}

📦 *Products:*
${itemsList}

💰 *Total Amount:* ₹${totalAmount}
    `

    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      })

      if (response.ok) setSuccess(true)
      else alert("Oops! Telegram integration not configred yet. Pls set YOUR_BOT_TOKEN in App.jsx.")
    } catch (err) {
      console.error(err)
      alert("Failed to send order. Please try again or contact via WhatsApp.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Order Placed Successfully! 🎉</h2>
        <p>Our team will contact you shortly for confirmation.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: '2rem' }}>Back to Home</Link>
      </div>
    )
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <div className="order-card-container">
          <div className="order-info">
            <h2 className="section-title">Finalize <span>Order</span></h2>
            <div className="order-summary-box">
              {itemsToOrder.map((item, i) => (
                <div key={i} className="order-item">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
              <div className="order-total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="order-form-container">
            <form className="modern-form glass-form" onSubmit={handleSubmit}>
              <h3>Shipping Details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" type="text" required placeholder="Enter your name" className="form-input" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="form-input" />
              </div>
              <div className="form-group">
                <label>Complete Address</label>
                <textarea name="address" required placeholder="Street, Area, City" className="form-input" rows="3" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input name="pincode" type="text" required placeholder="6-digit code" className="form-input" maxLength={6} />
              </div>
              <button type="submit" disabled={loading || itemsToOrder.length === 0} className="btn-primary w-100">
                {loading ? 'Processing...' : 'Confirm via Telegram'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── BLOGS PAGE ─────────────────────────────────────────────── */
function BlogsPage() {
  const blogs = [
    { 
      id: 1, 
      title: "The Secret to Perfect Sambar", 
      date: "Oct 12, 2024", 
      img: "/hero_3.png", 
      excerpt: "Discover the age-old tradition behind our signature Sambar Podi and how it brings the authentic south Indian flavor to your table..." 
    },
    { 
      id: 2, 
      title: "Nutrition in Traditional Blends", 
      date: "Oct 10, 2024", 
      img: "/product_packet.png", 
      excerpt: "Why sprouted grains and millets are the powerhouse of nutrition for your growing family's daily energy needs..." 
    },
  ]

  return (
    <section className="blogs-page">
      <div className="container">
        <motion.h1 {...fadeIn} className="section-title">Spice <span>Stories</span></motion.h1>
        <motion.p {...stagger(0.1)} className="section-subtitle">Insights into the world of traditional Indian spices and healthy living.</motion.p>
        
        <div className="quality-grid">
          {blogs.map(blog => (
            <motion.div key={blog.id} {...fadeIn} className="modern-card interact-card">
              <div className="product-card-img-wrap" style={{ height: '220px' }}>
                <img src={blog.img} alt={blog.title} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{blog.date}</span>
                <h3 style={{ margin: '0.5rem 0 1rem', fontSize: '1.4rem' }}>{blog.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{blog.excerpt}</p>
                <button className="btn-secondary">Read Full Story →</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT PAGE ───────────────────────────────────────────── */
function ContactPage() {
  const contacts = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      label: "WhatsApp & Call",
      value: "+91 86674 25703"
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: "Email Support",
      value: "rmmasalas@gmail.com"
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label: "Contact Person",
      value: "Rethinaselvi"
    },
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h1 {...fadeIn} className="section-title">Get In <span>Touch</span></motion.h1>
        <motion.p {...stagger(0.1)} className="section-subtitle">We'd love to hear from you. Reach out for orders, queries, or just to say hello!</motion.p>

        <div className="contact-grid">
          <motion.div {...stagger(0.15)} className="contact-info-cards">
            {contacts.map((c, i) => (
              <div key={i} className="contact-mini-card">
                <span className="card-icon-svg">{c.icon}</span>
                <div>
                  <h4>{c.label}</h4>
                  <p>{c.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...stagger(0.25)} className="contact-form-wrapper">
            <form className="modern-form glass-form">
              <h3>Send a Message</h3>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="What should we call you?" className="form-input" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" className="form-input" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="How can we spice up your day?" className="form-input" rows="5" />
              </div>
              <button type="button" className="btn-primary" style={{ padding: '1rem 2rem' }}>Send Message →</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── APP ROOT ───────────────────────────────────────────────── */
function App() {
  const [scrolled,  setScrolled]  = useState(false)
  const [showTop,   setShowTop]   = useState(false)
  const [cart,      setCart]      = useState([])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const addToCart      = (product) => setCart(prev => [...prev, product])
  const removeFromCart = (index)   => setCart(prev => prev.filter((_, i) => i !== index))

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar scrolled={scrolled} cartCount={cart.length} />
        <Routes>
          <Route path="/"            element={<Home            onAddToCart={addToCart} />} />
          <Route path="/collections" element={<CollectionsPage onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />
          <Route path="/cart"        element={<CartPage        cart={cart} onRemove={removeFromCart} />} />
          <Route path="/checkout"    element={<CheckoutPage    cart={cart} />} />
          <Route path="/blogs"       element={<BlogsPage />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="*"            element={<Home            onAddToCart={addToCart} />} />
        </Routes>
        <Footer />
        <FloatingButtons showTop={showTop} />
      </div>
    </Router>
  )
}

export default App
