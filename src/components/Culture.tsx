"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const defaultCulturePoints = [
    { heading: "Continuous Growth", text: "We invest heavily in the professional development of our team members." },
    { heading: "Inclusive Environment", text: "Diversity is our strength. We welcome talent from all backgrounds." },
    { heading: "Health & Wellness", text: "Comprehensive benefits to keep you and your family healthy." }
];

export default function Culture({ settings }: { settings?: any }) {
    const [cultureText, setCultureText] = useState({
        heading: "Life at Droga Group",
        bullets: defaultCulturePoints
    });
    const [cultureImages, setCultureImages] = useState({ img1: '', img2: '', img3: '' });
    const [teamDiversity, setTeamDiversity] = useState([
        { label: 'Addis Ababa', value: 45 },
        { label: 'Dire Dawa', value: 20 },
        { label: 'Hawassa', value: 35 }
    ]);

    useEffect(() => {
        if (settings?.site_culture_text) {
            try { setCultureText(JSON.parse(settings.site_culture_text)); } catch (e) { }
        }
        if (settings?.site_culture_images) {
            try { setCultureImages(JSON.parse(settings.site_culture_images)); } catch (e) { }
        }
        if (settings?.site_team_diversity) {
            try { setTeamDiversity(JSON.parse(settings.site_team_diversity)); } catch (e) { }
        }
    }, [settings]);

    const getImageUrl = (path: string, fallback: string) => {
        if (!path) return fallback;
        if (path.startsWith('http')) return path;
        return `${API_URL.split('/api')[0]}/storage/${path}`;
    };

    return (
        <section className="py-24 bg-cream/50" id="about-us">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-24 items-center">
                {/* Left Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-accent font-bold text-xs uppercase tracking-widest mb-6 block">Our DNA</span>
                    <h2 className="text-5xl font-bold text-primary mb-6">
                        {cultureText.heading}
                    </h2>
                    <div className="space-y-8">
                        {cultureText.bullets.map((point: any, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="flex items-start gap-5">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold mt-1 group-hover:bg-accent group-hover:text-white transition-colors">•</span>
                                    <div>
                                        <p className="text-primary text-xl font-bold mb-1">{point.heading || point.text}</p>
                                        <p className="text-primary/50 text-sm font-medium">{point.text || point.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Visual Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]"
                >
                    {/* Image 1 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage: `url('${getImageUrl(cultureImages.img1, "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80")}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    {/* Image 2 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage: `url('${getImageUrl(cultureImages.img2, "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80")}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    {/* Image 3 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage: `url('${getImageUrl(cultureImages.img3, "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80")}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    {/* Team Distribution Chart Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[40px] p-8 shadow-2xl shadow-primary/5 border border-primary/5 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-lg font-bold text-primary">Team Diversity</h4>
                                <p className="text-xs text-primary/40 font-medium">Distribution by region</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-xs">📊</div>
                            </div>
                        </div>

                        {/* Animated Bar Chart */}
                        <div className="space-y-6">
                            {teamDiversity.map((row, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                                        <span>{row.label}</span>
                                        <span>{row.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-cream rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: row.value + '%' as any }}
                                            viewport={{ once: false }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className={`h-full ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Floating Stats */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-cream flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-primary/40 uppercase">Total Members</p>
                                    <p className="text-2xl font-bold text-primary">200+</p>
                                </div>
                                <span className="text-2xl">🌍</span>
                            </div>
                            <div className="p-6 rounded-3xl bg-primary flex justify-between items-center text-white">
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase">Global Hubs</p>
                                    <p className="text-2xl font-bold">15</p>
                                </div>
                                <span className="text-2xl opacity-40">📍</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
