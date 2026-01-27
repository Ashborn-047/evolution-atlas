import { useState, useEffect } from "react";
import {
    Play, Pause, ChevronLeft, ChevronRight,
    SkipBack, SkipForward, Volume2, Repeat, Shuffle,
    CloudRain, Droplets, Waves, Zap,
    Heart, ListMusic, Mic2, Radio,
    Gauge, Cpu, Thermometer, Activity
} from "lucide-react";
import { RippleEffect } from "../components/RippleEffect";
import { PondEffect } from "../components/PondEffect";
import { MercuryEffect } from "../components/MercuryEffect";
import { RainOverlay } from "../components/RainOverlay";

/**
 * MEDIA CAROUSEL EXPERIMENT
 * Unique aesthetic cards for each liquid effect
 */

export function CarouselExperiment() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(35);

    const slides = [
        { id: 0, name: "Ripple", icon: Waves },
        { id: 1, name: "Pond", icon: Droplets },
        { id: 2, name: "Rain", icon: CloudRain },
        { id: 3, name: "Mercury", icon: Zap }
    ];

    const goToSlide = (index) => setActiveIndex(index);
    const nextSlide = () => setActiveIndex((activeIndex + 1) % slides.length);
    const prevSlide = () => setActiveIndex((activeIndex - 1 + slides.length) % slides.length);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setProgress(p => p >= 100 ? 0 : p + 0.5);
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500 mb-10 pl-4 border-l-2 border-blue-500">
                04. Media Carousel
            </h2>

            <div className="relative">
                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors hidden md:flex"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors hidden md:flex"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Cards Container */}
                <div className="overflow-hidden rounded-[40px]">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {/* CARD 1: Ripple - Full Music Player */}
                        <div className="min-w-full">
                            <div className="relative h-[550px] bg-slate-900 overflow-hidden">
                                <RippleEffect id="carousel-ripple" opacity={0.4} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                                <div className="relative z-20 h-full p-8 md:p-12 flex">
                                    {/* Left Side - Album & Controls */}
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        {/* Album Art */}
                                        <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-6 shadow-2xl shadow-purple-500/30 overflow-hidden relative group">
                                            <RippleEffect id="album-ripple" opacity={0.5} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Waves className="w-24 h-24 text-white/70 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Track Info */}
                                        <div className="text-center mb-4">
                                            <h3 className="text-2xl font-bold mb-1">Liquid Waves</h3>
                                            <p className="text-slate-400">Ambient Flow • Frequency Vol. 2</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-4 mb-6">
                                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                                            </button>
                                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                                <ListMusic className="w-5 h-5 text-slate-400" />
                                            </button>
                                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                                <Radio className="w-5 h-5 text-slate-400" />
                                            </button>
                                        </div>

                                        {/* Progress */}
                                        <div className="w-full max-w-sm mb-4">
                                            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                                <span>1:24</span>
                                                <span>3:45</span>
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center gap-4">
                                            <button className="text-slate-400 hover:text-white transition-colors p-2">
                                                <Shuffle className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-400 hover:text-white transition-colors p-2">
                                                <SkipBack className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                                            >
                                                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                                            </button>
                                            <button className="text-slate-400 hover:text-white transition-colors p-2">
                                                <SkipForward className="w-5 h-5" />
                                            </button>
                                            <button className="text-slate-400 hover:text-white transition-colors p-2">
                                                <Repeat className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Side - Queue */}
                                    <div className="hidden lg:block w-72 ml-8 border-l border-white/5 pl-8">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Up Next</h4>
                                        <div className="space-y-3">
                                            {[
                                                { title: "Ocean Depths", artist: "Aqua Beats", duration: "4:12" },
                                                { title: "Surface Tension", artist: "H2O", duration: "3:28" },
                                                { title: "Tidal Motion", artist: "Wave Form", duration: "5:01" },
                                                { title: "Still Waters", artist: "Calm", duration: "3:56" }
                                            ].map((track, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
                                                        <Mic2 className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">{track.title}</p>
                                                        <p className="text-xs text-slate-500 truncate">{track.artist}</p>
                                                    </div>
                                                    <span className="text-xs text-slate-600">{track.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: Pond - Weather App */}
                        <div className="min-w-full">
                            <div className="relative h-[550px] bg-slate-900 overflow-hidden">
                                <PondEffect id="carousel-pond" opacity={0.5} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 z-10" />

                                <div className="relative z-20 h-full p-8 md:p-12 flex flex-col">
                                    <div className="flex justify-between items-start mb-auto">
                                        <div>
                                            <p className="text-slate-400 text-sm mb-1">Current Location</p>
                                            <h3 className="text-2xl font-bold">Lake District</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-6xl font-black">18°</p>
                                            <p className="text-slate-400 text-sm">Feels like 16°</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center my-8">
                                        <div className="w-32 h-32 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-xl">
                                            <Droplets className="w-16 h-16 text-blue-400" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 mt-auto">
                                        {[
                                            { label: "Humidity", value: "82%" },
                                            { label: "Wind", value: "12 km/h" },
                                            { label: "Pressure", value: "1013 hPa" },
                                            { label: "UV Index", value: "3" }
                                        ].map(stat => (
                                            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                                                <p className="text-lg font-bold text-white">{stat.value}</p>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: Rain - Lo-Fi Music Player */}
                        <div className="min-w-full">
                            <div className="relative h-[550px] bg-slate-900 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-110"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1000')" }}
                                />
                                <RainOverlay density={0.5} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                                <div className="relative z-20 h-full p-8 md:p-12 flex flex-col items-center justify-center">
                                    {/* Album Art - Animated */}
                                    <div className="w-64 h-64 rounded-3xl bg-slate-800 mb-8 shadow-2xl overflow-hidden relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=500')" }}
                                        />
                                        <RainOverlay density={0.3} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                                <CloudRain className="w-3 h-3" />
                                                Lo-Fi Beats
                                            </div>
                                        </div>
                                    </div>

                                    {/* Track Info */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-3xl font-black italic mb-2">Rainy Café</h3>
                                        <p className="text-slate-400">Chill Hop • Study Session</p>
                                    </div>

                                    {/* Waveform Visualization */}
                                    <div className="flex items-end justify-center gap-1 h-12 mb-6">
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-1 bg-blue-500/60 rounded-full animate-pulse"
                                                style={{
                                                    height: `${Math.random() * 100}%`,
                                                    animationDelay: `${i * 0.05}s`
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-6">
                                        <button className="text-slate-400 hover:text-white transition-colors">
                                            <SkipBack className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-105 hover:bg-blue-400 transition-all"
                                        >
                                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                                        </button>
                                        <button className="text-slate-400 hover:text-white transition-colors">
                                            <SkipForward className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Volume */}
                                    <div className="flex items-center gap-3 mt-6">
                                        <Volume2 className="w-4 h-4 text-slate-500" />
                                        <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="w-2/3 h-full bg-blue-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CARD 4: Mercury - Performance Dashboard */}
                        <div className="min-w-full">
                            <div className="relative h-[550px] bg-slate-900 overflow-hidden">
                                <MercuryEffect id="carousel-mercury" opacity={0.5} />
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/50 to-slate-950/80 z-10" />

                                <div className="relative z-20 h-full p-8 md:p-12">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-slate-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">System Performance</h3>
                                            <p className="text-slate-500 text-sm">Real-time Hardware Monitor</p>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Online</span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {/* CPU */}
                                        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Cpu className="w-5 h-5 text-blue-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">CPU</span>
                                            </div>
                                            <div className="text-4xl font-black mb-2">87%</div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full w-[87%] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Intel Core i9 @ 4.8GHz</p>
                                        </div>

                                        {/* GPU */}
                                        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Activity className="w-5 h-5 text-purple-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">GPU</span>
                                            </div>
                                            <div className="text-4xl font-black mb-2">92%</div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full w-[92%] bg-gradient-to-r from-purple-500 to-pink-400 rounded-full" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">RTX 4090 @ 2.5GHz</p>
                                        </div>

                                        {/* Temperature */}
                                        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Thermometer className="w-5 h-5 text-orange-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Temp</span>
                                            </div>
                                            <div className="text-4xl font-black mb-2">72°C</div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full w-[72%] bg-gradient-to-r from-orange-500 to-red-400 rounded-full" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Liquid Cooling Active</p>
                                        </div>

                                        {/* FPS */}
                                        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Gauge className="w-5 h-5 text-emerald-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">FPS</span>
                                            </div>
                                            <div className="text-4xl font-black mb-2">144</div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">V-Sync Enabled</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-3 mt-6">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => goToSlide(index)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${index === activeIndex
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                                }`}
                        >
                            <slide.icon className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{slide.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CarouselExperiment;
