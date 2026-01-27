import { ClickRippleEffect } from "../components/ClickRippleEffect";

/**
 * RESPONSIVE BUTTONS EXPERIMENT
 * Button with embedded click-triggered water ripple effect
 */
export function ButtonsExperiment() {
    return (
        <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500 mb-10 pl-4 border-l-2 border-blue-500">
                02. Responsive Buttons
            </h2>

            <div className="flex justify-center">
                {/* Button with ripple effect inside */}
                <button className="relative h-20 px-16 rounded-2xl bg-slate-800 border border-white/10 text-white font-bold uppercase tracking-widest text-sm overflow-hidden cursor-pointer hover:border-white/20 transition-all">
                    <ClickRippleEffect />
                    <span className="relative z-20 pointer-events-none">Click for Ripple</span>
                </button>
            </div>
        </section>
    );
}

export default ButtonsExperiment;
