import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import './App.css'

const SPICES = [
  { id: 1, name: "Royal Garam Masala", price: 249, desc: "A majestic blend of 15 whole spices, roasted and ground to perfection.", image: "/product_packet.png", longDesc: "Our signature blend featuring premium cardamom, cinnamon, and cloves." },
  { id: 2, name: "Turmeric Gold", price: 199, desc: "High-curcumin Lakadong turmeric for health and vibrant color.", image: "/hero_spices.png", longDesc: "Pure turmeric sourced directly from the hills of Meghalaya." },
  { id: 3, name: "Kashmiri Chilli", price: 180, desc: "The perfect balance of vibrant red color and mild heat.", image: "/spice_mix_2.png", longDesc: "Carefully dried peppers for authentic Kashmiri flavor." },
  { id: 4, name: "Cardamom Bliss", price: 450, desc: "Extra bold green cardamom pods for intense aroma.", image: "/spice_mix_2.png" },
  { id: 5, name: "Black Pepper", price: 210, desc: "Tellicherry black pepper for a sharp, woody bite.", image: "/product_packet.png" },
  { id: 6, name: "Coriander Power", price: 140, desc: "Freshly roasted and ground coriander seeds.", image: "/hero_spices.png" },
  { id: 7, name: "Cumin Magic", price: 160, desc: "Earthy and aromatic premium cumin powder.", image: "/spice_mix_2.png" },
  { id: 8, name: "Dry Ginger", price: 220, desc: "Potent and citrusy dry ginger powder.", image: "/product_packet.png" },
  { id: 9, name: "Fennel Fresh", price: 150, desc: "Sweet and cooling fennel seeds for a refreshing touch.", image: "/hero_spices.png" },
  { id: 10, name: "Cloves Imperial", price: 380, desc: "Hand-picked whole cloves for intense warmth.", image: "/spice_mix_2.png" }
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

function Navbar({ scrolled, cartCount }) {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="spice-icon">🌿</span>
          Masala<span className="logo-accent">Bliss</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/collections" className="nav-link">Collections</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="nav-actions">
          <Link to="/order" className="cart-icon-wrapper" style={{ marginRight: '1.5rem', textDecoration: 'none' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
             {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/order" className="btn-navbar" style={{ textDecoration: 'none' }}>Order Now</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-content">
        <div className="logo logo-white" style={{color: '#fff', marginBottom: '2rem'}}>
          <span className="spice-icon">🌿</span>
          Masala<span className="logo-accent">Bliss</span>
        </div>
        <div className="social-links">
          <a href="https://facebook.com" className="social-icon" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
        <div className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">Our Legacy</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <p style={{ opacity: 0.5, fontSize: '0.85rem', marginTop: '3rem' }}>© 2025 Masala Bliss Spices. Crafted with ❤️ for your kitchen.</p>
      </div>
    </footer>
  );
}

function Home({ onAddToCart }) {
  return (
    <main>
      <section id="home" style={{ padding: 0 }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="hero-slider"
        >
          <SwiperSlide className="hero-slide">
            <div className="container">
              <div className="product-grid">
                <div className="hero-slide-content">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-badge">Premium Collection 2025</motion.div>
                  <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="hero-title-minimal">The Art of <span>Spices</span></motion.h1>
                </div>
                <div className="hero-image-side">
                  <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} src="/hero_spices.png" className="hero-main-img" alt="Spices" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="hero-slide">
            <div className="container">
              <div className="product-grid">
                <div className="hero-slide-content">
                  <div className="hero-badge">Direct from Source</div>
                  <h1 className="hero-title-minimal">Pure <span>& Potent</span></h1>
                </div>
                <div className="hero-image-side">
                  <img src="/spice_mix_2.png" className="hero-main-img" alt="Spices Close-up" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* About Us Preview */}
      <section className="about-preview" style={{ padding: '8rem 0', background: '#fff' }}>
        <div className="container">
          <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div {...fadeIn}>
              <div className="hero-badge">Our Heritage</div>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: '1rem' }}>A Tradition of <span>Pure Blends</span></h2>
              <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2rem' }}>
                For three generations, we have mastered the art of spice blending. Our legacy is built on the simple promise of purity—sourcing directly from heritage farms and using traditional stone-grinding methods.
              </p>
              <Link to="/about" className="btn-secondary">Read Our Full Story</Link>
            </motion.div>
            <motion.div {...fadeIn}>
              <img src="/spice_mix_2.png" alt="Our Story" style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="featured-products">
        <div className="container">
          <motion.h2 {...fadeIn} className="section-title">Featured <span>Blends</span></motion.h2>
          <div className="quality-grid">
            {SPICES.slice(0, 3).map((spice) => (
              <motion.div key={spice.id} {...fadeIn} className="modern-card">
                <img src={spice.image} alt={spice.name} style={{ width: '100%', borderRadius: '20px', marginBottom: '1.5rem' }} />
                <h3>{spice.name}</h3>
                <p className="text-muted">{spice.desc}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>₹{spice.price}</span>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => onAddToCart(spice)} className="btn-primary" style={{ flex: 1, padding: '0.8rem' }}>Add to Cart</button>
                    <Link to={`/order?id=${spice.id}`} className="btn-secondary" style={{ flex: 1, padding: '0.8rem', textAlign: 'center', textDecoration: 'none' }}>Order Now</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Link to="/collections" className="btn-secondary">Show More Collections</Link>
          </div>
        </div>
      </section>

      {/* Quality Highlights (formerly Why Masala Bliss) */}
      <section className="quality-section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="quality-grid">
            {[
              { icon: "🌿", title: "Direct Sourcing", text: "We skip the middleman, working directly with heritage spice farmers." },
              { icon: "🛡️", title: "Lab Tested", text: "Every batch is tested for purity and potency in certified quality labs." },
              { icon: "♻️", title: "Freshness Locked", text: "Our vacuum-sealed packaging keeps the aroma intact for months." }
            ].map((item, index) => (
              <motion.div key={index} {...fadeIn} className="modern-card">
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CollectionsPage({ onAddToCart }) {
  return (
    <section className="collections-page">
      <div className="container">
        <motion.h2 {...fadeIn} className="section-title">Our Full <span>Spices Collection</span></motion.h2>
        <div className="quality-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {SPICES.map((spice) => (
            <motion.div key={spice.id} {...fadeIn} className="modern-card">
              <img src={spice.image} alt={spice.name} style={{ width: '100%', borderRadius: '20px', marginBottom: '1.5rem' }} />
              <h3>{spice.name}</h3>
              <p className="text-muted">{spice.desc}</p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>₹{spice.price}</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => onAddToCart(spice)} className="btn-primary" style={{ flex: 1, padding: '0.8rem' }}>Add to Cart</button>
                  <Link to={`/order?id=${spice.id}`} className="btn-secondary" style={{ flex: 1, padding: '0.8rem', textAlign: 'center', textDecoration: 'none' }}>Order Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="about-page">
      <div className="container">
        <motion.h2 {...fadeIn} className="section-title">Our <span>Legacy & Quality</span></motion.h2>
        
        <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '4rem', alignItems: 'center' }}>
          <motion.div {...fadeIn}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Heritage in Every Grain</h3>
            <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              For over three generations, Masala Bliss has been the cornerstone of kitchens across the country. Our story began in the spice markets of Kochi, where my grandfather hand-picked each spice, ensuring only the most aromatic and pure blends reached our customers.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.8, fontSize: '1.1rem', marginTop: '1rem' }}>
              Today, we combine traditional stone-grinding techniques with modern laboratory testing to bring you spices that are not just flavorful, but truly medicinal in their purity.
            </p>
          </motion.div>
          <motion.div {...fadeIn}>
            <img src="/hero_spices.png" alt="Legacy" style={{ width: '100%', borderRadius: '40px' }} />
          </motion.div>
        </div>

        <div className="quality-grid" style={{ marginTop: '8rem' }}>
          {[
            { icon: "🌿", title: "Direct Sourcing", text: "We skip the middleman, working directly with heritage spice farmers." },
            { icon: "🛡️", title: "Lab Tested", text: "Every batch is tested for purity and potency in certified quality labs." },
            { icon: "♻️", title: "Freshness Locked", text: "Our vacuum-sealed packaging keeps the aroma intact for months." }
          ].map((item, index) => (
            <motion.div key={index} {...fadeIn} className="modern-card">
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderPage({ cart }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const productId = params.get('id');
  
  const singleProduct = productId ? SPICES.find(s => s.id === parseInt(productId)) : null;
  const itemsToOrder = singleProduct ? [singleProduct] : (cart || []);

  return (
    <section id="order" className="order-page">
      <div className="container">
        <motion.div {...fadeIn} className="order-card-container">
          <div className="order-info">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              {singleProduct ? 'Quick ' : 'Review '} <span>Order</span>
            </h2>
            <p className="order-desc">
              {singleProduct 
                ? `You are ordering the ${singleProduct.name}. Good choice!`
                : cart.length > 0 
                  ? `You have ${cart.length} item(s) in your cart ready for checkout.`
                  : "Your cart is currently empty. Explore our collection to add some spice!"}
            </p>
            
            <div className="order-summary-box" style={{ background: 'var(--bg-light)', padding: '1.5rem', borderRadius: '20px', marginTop: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Items Summary</h4>
              {itemsToOrder.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {itemsToOrder.map((item, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                      <span>{item.name}</span>
                      <span style={{ fontWeight: 600 }}>₹{item.price}</span>
                    </li>
                  ))}
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                    <span>Total Amount</span>
                    <span>₹{itemsToOrder.reduce((sum, item) => sum + item.price, 0)}</span>
                  </li>
                </ul>
              ) : (
                <p className="text-muted">No items selected.</p>
              )}
            </div>
          </div>
          
          <div className="order-form-container">
            <form className="modern-form">
              <div className="form-group">
                <label>Shipping Details</label>
                <input type="text" placeholder="Full Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Full Address" className="form-input" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Zip Code" className="form-input" />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" className="form-input" />
                </div>
              </div>
              <button type="button" className="btn-primary w-100" disabled={itemsToOrder.length === 0}>
                {singleProduct ? 'Purchase Now' : 'Place All Orders'}
              </button>
              <p className="form-note">Free shipping on orders above ₹999</p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h2 {...fadeIn} className="section-title">Get In <span>Touch</span></motion.h2>
        <div className="contact-grid">
          <motion.div {...fadeIn} className="contact-info-cards">
            <div className="contact-mini-card"><span className="card-icon">📍</span><div><h4>Our Spice Lab</h4><p>12, Heritage Lane, Spice Market, Kochi - 682002</p></div></div>
            <div className="contact-mini-card"><span className="card-icon">📞</span><div><h4>Call Us</h4><p>+91 98765 43210</p></div></div>
            <div className="contact-mini-card"><span className="card-icon">✉️</span><div><h4>Email Inquiries</h4><p>hello@masalabliss.com</p></div></div>
          </motion.div>
          <motion.div {...fadeIn} className="contact-form-wrapper">
            <form className="modern-form glass-form">
              <h3>Send a Message</h3>
              <div className="form-group"><input type="text" placeholder="Your Name" className="form-input" /></div>
              <div className="form-group"><input type="email" placeholder="Your Email" className="form-input" /></div>
              <div className="form-group"><textarea placeholder="How can we spice up your day?" className="form-input" rows="4"></textarea></div>
              <button type="button" className="btn-primary">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // Optional: Add a subtle toast or notification here
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar scrolled={scrolled} cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/collections" element={<CollectionsPage onAddToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/order" element={<OrderPage cart={cart} />} />
          <Route path="/cart" element={<OrderPage cart={cart} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
