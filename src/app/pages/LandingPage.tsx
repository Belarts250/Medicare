import { Link } from "react-router";
import { Shield, Network, Lock, Server, Brain, Zap, Star, Globe, Users, TrendingUp, X, ArrowUpRight, Plus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import greenBg from "../images/green-bg.png";
import doctorImg from "../images/doctor.png";
import hospitalImg from "../images/hospital.png";

function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function LandingPage() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1);

  const features = [
    {
      icon: Network,
      title: "Federated Learning",
      description: "Train AI models collaboratively across multiple hospitals without centralizing data",
      bgColor: "bg-background",
      rounded: "rounded-none border border-border"
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Proofs",
      description: "Mathematically verify contributions without revealing sensitive information",
      bgColor: "bg-background",
      rounded: "rounded-none border-y border-r border-border"
    },
    {
      icon: Server,
      title: "Blockchain Orchestration",
      description: "Transparent, immutable record of all training activities and contributions",
      bgColor: "bg-card",
      rounded: "rounded-tr-[100px] border-y border-r border-border"
    }
  ];

  const howItWorks = [
    { step: "1", question: "Researcher creates training task", answer: "The researcher defines the model architecture and data requirements without ever seeing the raw data." },
    { step: "2", question: "Hospitals train locally", answer: "Hospitals download the model, train it on their private, local data securely." },
    { step: "3", question: "Zero-knowledge proofs verify", answer: "The system uses zero-knowledge proofs to mathematically verify that the training was done correctly without exposing the data." },
    { step: "4", question: "Blockchain aggregates models", answer: "The updated model weights are aggregated via a secure blockchain protocol, distributing rewards automatically." }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Top Bar */}
      {showTopBar && (
        <div className="w-full bg-primary text-primary-foreground py-2 px-4 flex justify-between items-center text-sm">
          <div className="flex-1 flex justify-center items-center gap-2">
            <span>🚀 Session 2026 • Early-bird registration now open</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <button onClick={() => setShowTopBar(false)} className="hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="w-full bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-3xl tracking-tight text-foreground">MEDICARE</h1>
          </div>

          <div className="hidden md:flex items-center gap-10 text-foreground">
            <Link to="#features" className="hover:opacity-70 transition-opacity">Features</Link>
            <Link to="#how-it-works" className="hover:opacity-70 transition-opacity">How it Works</Link>
            <Link to="#benefits" className="hover:opacity-70 transition-opacity">Benefits</Link>
            <Link to="#insight" className="hover:opacity-70 transition-opacity">Insight</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-foreground hover:opacity-70 transition-opacity font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              Sign Up <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Hero Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="text-sm font-bold text-primary tracking-widest uppercase mb-6">
              Zero-Knowledge Security
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
              AI Without Sharing <span className="italic font-serif font-normal block mt-2" style={{ letterSpacing: '-0.02em' }}>Data</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Train powerful medical AI models collaboratively while keeping sensitive data private. Powered by federated learning, zero-knowledge proofs, and blockchain.
            </p>

            <div className="flex items-center gap-8 mb-12">
              <Link
                to="/register?role=hospital"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                Join as Hospital
              </Link>

              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="text-foreground font-bold ml-2 text-lg">5.0</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  from 120+ <span className="underline underline-offset-2">reviews</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 h-[600px]"
          >
            {/* Top Left - Phone / Graphic */}
            <div className="bg-secondary rounded-tl-[40px] relative overflow-hidden flex items-center justify-center h-full">
              <img
                src={doctorImg}
                alt="Doctor"
                className="w-full h-full object-cover rounded-tl-[40px]"
              />
            </div>

            {/* Top Right - 3+ Core Features */}
            <div className="bg-card rounded-tr-[100px] rounded-bl-[100px] p-8 flex flex-col items-center justify-center relative">
              <div className="text-6xl font-light text-primary mb-2">3+</div>
              <div className="text-lg text-foreground mb-8">Core Features</div>
              <Globe className="w-24 h-24 text-primary opacity-80 stroke-1" />
            </div>

            {/* Bottom Left - Active Hospitals */}
            <div className="bg-secondary rounded-tr-[100px] p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="flex gap-4">
                <Star className="w-12 h-12 fill-primary text-primary" />
                <Star className="w-12 h-12 fill-primary text-primary" />
              </div>
              <div className="text-xl text-foreground text-right mt-12">Active Hospitals</div>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 rounded-full bg-card border-2 border-secondary overflow-hidden -ml-2 first:ml-0 flex items-center justify-center z-30">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary border-2 border-secondary overflow-hidden -ml-4 flex items-center justify-center z-20">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-foreground border-2 border-secondary overflow-hidden -ml-4 flex items-center justify-center z-10 text-white font-bold text-xs">
                  +98
                </div>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center ml-auto text-white">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bottom Right - Models Trained */}
            <div className="bg-primary rounded-br-[40px] p-8 flex flex-col justify-between text-primary-foreground relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="text-5xl font-light">10M+</div>
                <ArrowUpRight className="w-6 h-6" />
              </div>

              <div className="h-32 mt-8 relative w-full">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <polyline
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    points="0,40 10,35 20,40 30,25 40,25 50,30 60,10 70,15 80,5 90,15 100,0"
                  />
                </svg>
              </div>
              <div className="text-xl text-right mt-4">Models Trained</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 1: One platform for all your research (Matches "One app for all your money things") */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-6 py-24 border-t border-border"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Enterprise-grade security</h2>
          <p className="text-lg text-muted-foreground">
            Built on cutting-edge technology to ensure absolute privacy while enabling collaborative breakthroughs.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
          {/* Left Dark Green Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-primary p-12 rounded-sm text-primary-foreground flex flex-col"
          >
            <h3 className="text-3xl font-medium mb-12">Cryptographically verified</h3>
            <div className="mt-auto">
              <div className="text-center text-sm mb-4 opacity-80">PROOFS</div>
              <div className="flex items-end justify-center gap-3 h-48">
                {[40, 60, 50, 80, 100, 70, 60].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`w-8 bg-white/20 rounded-t-sm`}
                  />
                ))}
                <div className="absolute flex items-center justify-center">
                  <TrendingUp className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Light Grey Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-secondary p-12 rounded-sm rounded-br-[100px] relative overflow-hidden flex flex-col"
          >
            <h3 className="text-3xl font-medium text-foreground mb-12 z-10">Global Federated Network</h3>

            <div className="relative mt-auto flex gap-6 z-10">
              <motion.div
                initial={{ rotate: 0, y: 50, opacity: 0 }}
                whileInView={{ rotate: -5, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white p-6 rounded-lg shadow-lg transform origin-bottom-left max-w-[200px]"
              >
                <div className="text-2xl font-bold text-primary mb-1">100+</div>
                <div className="text-xs text-muted-foreground">Hospitals</div>
                <div className="flex mt-4 -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white"><Shield className="w-4 h-4" /></div>
                  <div className="w-8 h-8 rounded-full bg-foreground border-2 border-white flex items-center justify-center text-white"><Shield className="w-4 h-4" /></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ rotate: 0, y: 50, opacity: 0 }}
                whileInView={{ rotate: 5, y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-primary text-white p-6 rounded-lg shadow-lg transform origin-bottom-right max-w-[200px] mt-8"
              >
                <div className="text-2xl font-bold mb-1">10M+</div>
                <div className="text-xs opacity-80">Parameters</div>
                <div className="flex mt-4 gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Network className="w-3 h-3 text-white" /></div>
                </div>
              </motion.div>
            </div>

            <Globe className="absolute right-[-10%] bottom-[-10%] w-96 h-96 text-foreground opacity-10 stroke-1 z-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* Section 2: Values (Features) */}
      <div id="features" className="max-w-[1400px] mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 mb-16 items-end"
        >
          <div className="col-span-1">
            <div className="text-xs font-bold text-primary tracking-widest uppercase mb-4">CAPABILITIES</div>
            <h2 className="text-5xl font-medium text-foreground leading-tight tracking-tight">
              Scale your research,<br />Safely.
            </h2>
          </div>
          <div className="col-span-2 text-lg text-muted-foreground md:pl-20">
            Manages a diversified group of specialized private models with efficient tech-enabled processes.
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`${feature.bgColor} ${feature.rounded} p-12 flex flex-col h-[400px]`}
            >
              <div className="mb-8">
                <feature.icon className="w-10 h-10 text-foreground stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>

              <div className="mt-auto">
                <button className={`w-10 h-10 rounded-full flex items-center justify-center border border-border ${idx === 2 ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground hover:bg-foreground/5'} transition-colors`}>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: Numbers (Metrics Banner) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden py-32 mt-12 bg-cover bg-center"
        style={{ backgroundImage: `url(${greenBg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 items-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-7xl font-light mb-2">
                <Counter value={10} suffix="M+" />
              </div>
              <div className="text-sm opacity-80 uppercase tracking-wider">Parameters Trained</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-7xl font-light mb-2">
                <Counter value={100} suffix="+" />
              </div>
              <div className="text-sm opacity-80 uppercase tracking-wider">Active Hospitals</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-xs font-bold text-white/60 tracking-widest uppercase mb-4">NETWORK</div>
              <h2 className="text-3xl font-medium leading-tight">
                Market and build<br />the solutions
              </h2>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Section 4: FAQ (How It Works) */}
      <div id="how-it-works" className="max-w-[1400px] mx-auto px-6 py-32 border-b border-border">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-bold text-primary tracking-widest uppercase mb-4">HOW IT WORKS</div>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Frequently asked<br />questions
            </h2>
          </motion.div>

          <div className="space-y-0">
            {howItWorks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-border py-6"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                  <div className="text-muted-foreground">
                    {expandedFaq === idx ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-muted-foreground text-sm leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: CTA Banner */}
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary rounded-none p-16 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-12"
        >

          <div className="relative z-10 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              Data Never Leaves <span className="italic font-serif font-normal">Source</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-primary-foreground/80 text-lg mb-10"
            >
              Join over 100+ hospitals who choose MEDICARE for fast and secure federated learning.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-background text-foreground font-medium hover:bg-background/90 transition-colors"
              >
                Get Started Now
              </Link>
            </motion.div>
          </div>

          <div className="relative z-10 w-full md:w-1/2 flex justify-end">
            <div className="absolute -top-32 right-12 flex gap-4">
              <Star className="w-24 h-24 fill-white text-white" />
              <Star className="w-24 h-24 fill-white text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full h-full max-w-lg"
            >
              <img
                src={hospitalImg}
                alt="Hospital"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Section 6: Footer */}
      <footer className="bg-background pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 border-b border-border pb-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">

            <div className="col-span-1">
              <h4 className="font-bold text-foreground mb-6 text-sm">Account</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary">Saving</Link></li>
                <li><Link to="#" className="hover:text-primary">Joint Accounts</Link></li>
                <li><Link to="#" className="hover:text-primary">Crypto</Link></li>
                <li><Link to="#" className="hover:text-primary">Freelance</Link></li>
                <li><Link to="#" className="hover:text-primary">Commodities</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-foreground mb-6 text-sm">Help</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary">Customer Help</Link></li>
                <li><Link to="#" className="hover:text-primary">Community</Link></li>
                <li><Link to="#" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-foreground mb-6 text-sm">Finance</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary">Cards</Link></li>
                <li><Link to="#" className="hover:text-primary">Linked Accounts</Link></li>
                <li><Link to="#" className="hover:text-primary">Payment</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold text-foreground mb-6 text-sm">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary">Contact</Link></li>
                <li><Link to="#" className="hover:text-primary">Sustainability</Link></li>
                <li><Link to="#" className="hover:text-primary">Career</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col items-start md:items-end text-left md:text-right mt-12 md:mt-0">
              <h2 className="text-6xl font-medium text-foreground tracking-tight mb-8">MEDICARE</h2>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>400 Bay Street, Bay Wellington</p>
                <p>Tower, Suite 2501 Toronto,</p>
                <p>Ontario M5J 2T3</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-foreground">
                <Globe className="w-4 h-4 text-primary" /> English (UK)
              </div>
            </div>

          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© Ascone Financial Ltd 2023.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary">Terms of Use</Link>
            <Link to="#" className="hover:text-primary">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
