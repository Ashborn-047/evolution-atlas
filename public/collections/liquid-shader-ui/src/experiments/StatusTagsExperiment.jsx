import { CloudRain } from "lucide-react";
import { RainOverlay } from "../components/RainOverlay";

/**
 * STATUS TAGS EXPERIMENT
 * Weather status tag with rain effect
 */
export function StatusTagsExperiment() {
    return (
        <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500 mb-10 pl-4 border-l-2 border-blue-500">
                05. Dynamic Status Tags
            </h2>

            <div className="flex justify-center">
                {/* Weather Status - Rain */}
                <div className="relative h-24 w-72 rounded-2xl bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center gap-3">
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-md opacity-20"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000')" }}
                    />
                    <RainOverlay density={0.8} />
                    <CloudRain className="w-5 h-5 text-blue-400 relative z-10" />
                    <span className="font-bold text-slate-300 uppercase tracking-widest text-sm relative z-10">
                        Local: 14°C
                    </span>
                </div>
            </div>
        </section>
    );
}

export default StatusTagsExperiment;
