import { Droplets, User } from "lucide-react";
import { RainOverlay } from "../components/RainOverlay";
import { PondEffect } from "../components/PondEffect";
import { MercuryEffect } from "../components/MercuryEffect";

/**
 * SURFACE CARDS EXPERIMENT
 * Profile, content, and atmosphere cards with liquid backgrounds
 */
export function CardsExperiment() {
    return (
        <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500 mb-10 pl-4 border-l-2 border-blue-500">
                03. Surface Cards
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Card - Mercury */}
                <div className="relative aspect-[4/5] rounded-[40px] bg-slate-900 border border-white/5 overflow-hidden p-8 flex flex-col items-center justify-center text-center group">
                    <MercuryEffect id="profile-card" opacity={0.2} />
                    <div className="relative z-10">
                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                            <MercuryEffect id="avatar-merc" opacity={0.6} />
                            <User className="w-10 h-10 text-white relative z-10" />
                        </div>
                        <h3 className="text-xl font-bold uppercase italic">Julian Voids</h3>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                            Lead Architect
                        </p>
                    </div>
                </div>

                {/* Content Card - Pond */}
                <div className="relative aspect-[4/5] rounded-[40px] bg-slate-900 border border-white/5 overflow-hidden group">
                    <PondEffect id="content-card" opacity={0.6} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                    <div className="absolute bottom-10 left-10 right-10 z-20">
                        <h3 className="text-3xl font-black italic uppercase leading-none mb-4">
                            Deep <br />Simulation
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Organic fluid motion using WebGL point-displacement and vertex shaders.
                        </p>
                    </div>
                </div>

                {/* Minimal List Card - Rain */}
                <div className="relative aspect-[4/5] rounded-[40px] bg-slate-900 border border-white/5 overflow-hidden p-10 flex flex-col justify-between">
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-125"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000')" }}
                    />
                    <RainOverlay density={0.4} />
                    <div className="relative z-20 flex justify-between">
                        <Droplets className="w-6 h-6 text-blue-500" />
                        <div className="flex gap-1">
                            <div className="w-8 h-1 bg-white rounded-full" />
                            <div className="w-8 h-1 bg-white/20 rounded-full" />
                        </div>
                    </div>
                    <div className="relative z-20">
                        <h3 className="text-4xl font-black italic uppercase leading-none mb-4">
                            Moody <br />Atmosphere
                        </h3>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                            View Atmospheric Collection
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CardsExperiment;
