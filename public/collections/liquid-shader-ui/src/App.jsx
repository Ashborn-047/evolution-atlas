import { useState, useEffect } from "react";
import {
    Waves,
    CloudRain,
    Droplets,
    Zap,
    ChevronDown,
    Monitor,
    Cpu,
    Shield,
    Layout,
    Github,
    Twitter,
    Menu,
    X
} from "lucide-react";
import { RainOverlay } from "./components/RainOverlay";
import { RippleEffect } from "./components/RippleEffect";
import { PondEffect } from "./components/PondEffect";
import { MercuryEffect } from "./components/MercuryEffect";
import { ExperimentsView } from "./views/ExperimentsView";

// Shader variant configurations
const configs = {
    ripple: {
        title: "Interactive Ripple",
        desc: "Gentle WebGL fluid waves that react directly to your mouse movements.",
        icon: <Waves className="w-5 h-5" />,
        tag: "WebGL Interaction"
    },
    pond: {
        title: "Rainy Pond",
        desc: "Simulates rain falling onto a surface of water using procedural ripples.",
        icon: <CloudRain className="w-5 h-5" />,
        tag: "Fluid Simulation"
    },
    rain: {
        title: "Rainy Window",
        desc: "A steady glass pane view with rain falling outside using Canvas 2D.",
        icon: <Droplets className="w-5 h-5" />,
        tag: "Canvas Overlay"
    },
    mercury: {
        title: "Liquid Mercury",
        desc: "A heavy, hyper-reflective metallic surface mimicking molten silver.",
        icon: <Zap className="w-5 h-5" />,
        tag: "Metal Shader"
    }
};

// Background component that uses the split effects
function BackgroundEffect({ variant }) {
    switch (variant) {
        case "ripple":
            return <RippleEffect id="hero" />;
        case "pond":
            return <PondEffect id="hero" />;
        case "mercury":
            return <MercuryEffect id="hero" />;
        case "rain":
            return (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-[10px] scale-110 opacity-50"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop')" }}
                    />
                    <RainOverlay density={0.4} />
                </>
            );
        default:
            return <RippleEffect id="hero" />;
    }
}

export default function App() {
    const [activeVariant, setActiveVariant] = useState("ripple");
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentView, setCurrentView] = useState("home");
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setMobileMenu(false);
    }, [currentView]);

    const renderContent = () => {
        if (currentView === "experiments") return <ExperimentsView />;

        return (
            <>
                {/* HERO */}
                <section className="relative z-30 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="text-center max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                            Interactive Fluid Dynamics
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase italic">
                            Organic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10">
                                Flow.
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                            A collection of high-performance liquid shaders for next-generation web experiences.
                        </p>
                    </div>
                    <div className="absolute bottom-10 animate-bounce text-slate-500">
                        <ChevronDown className="w-6 h-6" />
                    </div>
                </section>

                {/* SELECTOR */}
                <section className="relative z-30 py-24 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-end">
                        <div>
                            <div className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">Laboratory</div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight italic uppercase">Atmosphere.</h2>
                            <div className="grid gap-3">
                                {Object.keys(configs).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setActiveVariant(v)}
                                        className={`group relative text-left p-6 rounded-2xl border transition-all duration-500 ${activeVariant === v
                                            ? "bg-white border-white text-black translate-x-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                                            : "bg-white/5 border-white/5 hover:border-white/20 text-white"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${activeVariant === v ? "text-slate-500" : "text-blue-400"}`}>
                                                {configs[v].tag}
                                            </span>
                                            {configs[v].icon}
                                        </div>
                                        <h3 className="text-xl font-bold uppercase italic">{configs[v].title}</h3>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[40px] bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
                            <div className="mb-8 p-4 bg-white/5 rounded-2xl inline-block">{configs[activeVariant].icon}</div>
                            <h3 className="text-3xl font-bold mb-6 italic uppercase tracking-tighter">{configs[activeVariant].title}</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-10">{configs[activeVariant].desc}</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    <Monitor className="w-4 h-4 text-blue-500" /> Fully Responsive Viewport
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    <Cpu className="w-4 h-4 text-blue-500" /> Hardware Accelerated Core
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    <Shield className="w-4 h-4 text-blue-500" /> Optimized 60FPS Refresh
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    return (
        <div className="relative min-h-screen w-full bg-slate-950 text-white font-sans selection:bg-white/20">

            {/* NAVIGATION */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? "bg-slate-950/80 backdrop-blur-xl border-white/5 py-4" : "bg-transparent border-transparent py-8"
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase cursor-pointer"
                        onClick={() => setCurrentView("home")}
                    >
                        <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-sm">L</div>
                        <span className="hidden sm:inline italic">LIQUID_UI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <button onClick={() => setCurrentView("experiments")} className={`hover:text-white transition-colors flex items-center gap-2 ${currentView === 'experiments' ? 'text-white' : ''}`}>
                            <Layout className="w-3 h-3" /> Experiments
                        </button>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <Github className="w-3 h-3" /> GitHub
                        </a>
                    </div>

                    <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-white">
                        {mobileMenu ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {mobileMenu && (
                <div className="fixed inset-0 z-[60] bg-slate-950 p-12 flex flex-col justify-center gap-8">
                    {['home', 'experiments'].map(view => (
                        <button key={view} onClick={() => setCurrentView(view)} className="text-5xl font-black italic uppercase text-white text-left capitalize">{view}</button>
                    ))}
                    <button onClick={() => setMobileMenu(false)} className="absolute top-10 right-10 text-slate-500 font-bold uppercase tracking-widest text-xs">Close Menu</button>
                </div>
            )}

            {/* HERO BACKGROUND ENGINE */}
            {currentView === "home" && (
                <div className="fixed inset-0 pointer-events-none">
                    <BackgroundEffect variant={activeVariant} key={activeVariant} />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-10" />
                </div>
            )}

            {/* CONTENT */}
            <main className="relative">{renderContent()}</main>

            {/* FOOTER */}
            <footer className="relative z-30 pt-32 pb-12 px-6 border-t border-white/5 bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter uppercase mb-6">
                                <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm">L</div>
                                Liquid_UI
                            </div>
                            <p className="text-slate-500 max-w-sm italic">High-fidelity fluid dynamics and interactive shaders for high-end web design.</p>
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-white">Navigation</h4>
                            <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                                {['experiments', 'home'].map(v => (
                                    <li key={v}><button onClick={() => setCurrentView(v)} className="hover:text-white capitalize">{v}</button></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Twitter className="w-4 h-4" /></div>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"><Github className="w-4 h-4" /></div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest text-slate-600">
                        © 2024 Liquid UI Laboratory. Built with Three.js & Passion.
                    </div>
                </div>
            </footer>
        </div>
    );
}
