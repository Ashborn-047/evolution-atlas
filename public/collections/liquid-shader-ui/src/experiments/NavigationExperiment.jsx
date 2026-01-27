import { Search } from "lucide-react";
import { RainOverlay } from "../components/RainOverlay";

/**
 * ADVANCED NAVIGATION EXPERIMENT
 * Glass navbar with rain effect
 */
export function NavigationExperiment() {
    return (
        <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500 mb-10 pl-4 border-l-2 border-blue-500">
                01. Advanced Navigation
            </h2>

            {/* Glass Navbar Component */}
            <div className="relative h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-between px-8 group">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop')" }}
                />
                <RainOverlay density={0.3} />
                <div className="relative z-20 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white text-black font-black italic rounded flex items-center justify-center">
                        L
                    </div>
                    <span className="font-bold tracking-tighter">LIQUID_SYS</span>
                </div>
                <div className="relative z-20 hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {['Terminal', 'Shaders', 'Vault', 'Network'].map(item => (
                        <span
                            key={item}
                            className="cursor-pointer hover:text-white transition-colors hover:scale-105"
                        >
                            {item}
                        </span>
                    ))}
                </div>
                <button className="relative z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                    <Search className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}

export default NavigationExperiment;
