"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { apiFetch } from '@/lib/api';
import {
    Users,
    Briefcase,
    UserPlus,
    Calendar,
    Building2,
    ArrowUpRight,
    Bell,
    Search,
    TrendingUp,
    LogOut,
} from 'lucide-react';

interface Stats {
    total_tenants: number;
    total_active_jobs: number;
    total_candidates: number;
    total_employees: number;
    new_applications_today: number;
    active_events: number;
    tenants_breakdown: any[];
    recent_global_applicants: any[];
}

function StatCard({
    title,
    value,
    icon,
    trend,
    trendLabel,
}: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    trend?: number;
    trendLabel?: string;
}) {
    const isPositive = (trend ?? 0) >= 0;
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
                    <span className="text-gray-400">{icon}</span>
                    {title}
                </div>
                <ArrowUpRight size={16} className="text-gray-300" />
            </div>
            <p className="text-3xl font-black text-gray-900 tabular-nums">{value}</p>
            {trend !== undefined && (
                <p className={`text-xs font-semibold mt-1 ${isPositive ? 'text-emerald-500' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{trend}% {trendLabel || 'from last month'}
                </p>
            )}
        </div>
    );
}

function CompanyRow({ tenant }: { tenant: any }) {
    const pct = tenant.job_postings_count > 0
        ? Math.round((tenant.active_jobs_count / tenant.job_postings_count) * 100)
        : 0;

    return (
        <tr className="hover:bg-gray-50 transition-colors group">
            <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1E2A35]/10 flex items-center justify-center text-[#1E2A35] font-black text-xs">
                        {tenant.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{tenant.name}</span>
                </div>
            </td>
            <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
                        <div className="bg-[#1F7A6E] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums">{tenant.active_jobs_count}/{tenant.job_postings_count}</span>
                </div>
            </td>
            <td className="px-5 py-3.5 text-sm text-gray-600 tabular-nums">{tenant.job_requisitions_count}</td>
            <td className="px-5 py-3.5 text-sm text-gray-600 tabular-nums">{tenant.users_count}</td>
            <td className="px-5 py-3.5">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#1F7A6E] opacity-0 group-hover:opacity-100 cursor-pointer hover:underline transition-opacity">
                    View →
                </span>
            </td>
        </tr>
    );
}

export default function GlobalDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));

        apiFetch('/v1/dashboard')
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [router]);

    const handleLogout = async () => {
        try { await apiFetch('/v1/logout', { method: 'POST' }); } catch (_) { }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1F7A6E]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F6FA] flex">
            {/* Sidebar */}
            <AdminSidebar user={user} />

            {/* Main Content — offset by sidebar width */}
            <div className="flex-1 ml-56 flex flex-col min-h-screen">

                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 h-14 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                    <div>
                        <p className="text-gray-800 font-bold text-sm">Welcome back, <span className="text-[#1A2B3D]">{user.name}</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-400 text-sm w-52">
                            <Search size={14} />
                            <span className="text-xs">Search...</span>
                        </div>
                        <button className="relative text-gray-400 hover:text-gray-700 transition-colors">
                            <Bell size={18} />
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
                            <div className="w-8 h-8 rounded-full bg-[#1F7A6E]/20 border border-[#1F7A6E]/40 flex items-center justify-center text-[#1F7A6E] font-black text-xs">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={14} />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 space-y-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard
                            title="Active Jobs"
                            value={loading ? '—' : (stats?.total_active_jobs ?? 0)}
                            icon={<Briefcase size={14} />}
                            trend={3.2}
                        />
                        <StatCard
                            title="Total Candidates"
                            value={loading ? '—' : (stats?.total_candidates ?? 0)}
                            icon={<Users size={14} />}
                            trend={8.1}
                        />
                        <StatCard
                            title="New Today"
                            value={loading ? '—' : (stats?.new_applications_today ?? 0)}
                            icon={<UserPlus size={14} />}
                            trend={12}
                        />
                        <StatCard
                            title="Active Events"
                            value={loading ? '—' : (stats?.active_events ?? 0)}
                            icon={<Calendar size={14} />}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Sister Company Performance — spans 2 cols */}
                        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold text-gray-900 text-sm">Sister Company Performance</h2>
                                    <p className="text-xs text-gray-400 mt-0.5">{stats?.tenants_breakdown?.length ?? 0} companies across Droga Group</p>
                                </div>
                                <span className="text-[10px] font-black text-[#1F7A6E] uppercase tracking-widest cursor-pointer hover:underline flex items-center gap-1">
                                    Full Report <ArrowUpRight size={11} />
                                </span>
                            </div>

                            {loading ? (
                                <div className="p-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1F7A6E]" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-50">
                                                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Company</th>
                                                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Active Jobs</th>
                                                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Requisitions</th>
                                                <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Users</th>
                                                <th className="px-5 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {stats?.tenants_breakdown?.map((tenant) => (
                                                <CompanyRow key={tenant.id} tenant={tenant} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Recent Global Applicants */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-bold text-gray-900 text-sm">Recent Applicants</h2>
                                <span className="text-[10px] font-black text-[#1F7A6E] uppercase tracking-widest cursor-pointer hover:underline">
                                    See all →
                                </span>
                            </div>

                            {loading ? (
                                <div className="p-8 flex justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1F7A6E]" />
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {stats?.recent_global_applicants?.map((applicant) => (
                                        <div key={applicant.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1A2B3D] to-[#1F7A6E] flex items-center justify-center text-white font-black text-xs shrink-0">
                                                {applicant.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{applicant.name}</p>
                                                <p className="text-[11px] text-gray-400 truncate">{applicant.job_posting?.title}</p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-[#1F7A6E] bg-[#1F7A6E]/10 px-2 py-0.5 rounded-full">
                                                    {applicant.tenant?.name?.split(' ')[1] ?? applicant.tenant?.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {(!stats?.recent_global_applicants?.length) && (
                                        <div className="p-8 text-center text-xs text-gray-400 italic">No recent applicants</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Company Metrics Summary Bar */}
                    <div className="bg-[#1E2A35] rounded-2xl p-6 flex flex-wrap gap-8 items-center">
                        <div>
                            <p className="text-[#1F7A6E] text-[9px] font-black uppercase tracking-widest mb-1">Total Companies</p>
                            <p className="text-white font-black text-2xl">{stats?.total_tenants ?? '—'}</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <p className="text-[#1F7A6E] text-[9px] font-black uppercase tracking-widest mb-1">Total Employees</p>
                            <p className="text-white font-black text-2xl">{stats?.total_employees ?? '—'}</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <p className="text-[#1F7A6E] text-[9px] font-black uppercase tracking-widest mb-1">Active Pipeline</p>
                            <p className="text-white font-black text-2xl">{stats?.total_candidates ?? '—'}</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                            <p className="text-[#1F7A6E] text-[9px] font-black uppercase tracking-widest mb-1">Group Events</p>
                            <p className="text-white font-black text-2xl">{stats?.active_events ?? '—'}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-white/40 text-xs">
                            <TrendingUp size={14} />
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
