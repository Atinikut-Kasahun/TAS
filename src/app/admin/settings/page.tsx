"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { apiFetch } from '@/lib/api';
import { Bell, Search, UserPlus, X, LogOut } from 'lucide-react';

export default function GlobalSettings() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users');

    // Users and Tenants State
    const [globalUsers, setGlobalUsers] = useState<any[]>([]);
    const [tenants, setTenants] = useState<any[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        name: '',
        email: '',
        password: '',
        tenant_id: '',
        role_slug: 'ta_manager', // default
    });
    const [submitting, setSubmitting] = useState(false);
    const [modalError, setModalError] = useState('');

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
        fetchData();
    }, [router]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, tenantsData] = await Promise.all([
                apiFetch('/v1/global-users'),
                apiFetch('/v1/tenants')
            ]);
            setGlobalUsers(usersData?.users || []);
            setTenants(tenantsData || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try { await apiFetch('/v1/logout', { method: 'POST' }); } catch (_) { }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setModalError('');
        try {
            const res = await apiFetch('/v1/global-users', {
                method: 'POST',
                body: JSON.stringify(newUserForm),
            });
            if (res?.user) {
                setGlobalUsers([...globalUsers, res.user]);
                setIsModalOpen(false);
                setNewUserForm({ name: '', email: '', password: '', tenant_id: '', role_slug: 'ta_manager' });
            }
        } catch (err: any) {
            setModalError(err.message || 'Failed to create user.');
        } finally {
            setSubmitting(false);
        }
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

            {/* Main Content */}
            <div className="flex-1 ml-56 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 h-14 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div>
                        <h1 className="text-gray-800 font-bold text-sm">Global Settings</h1>
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
                <main className="flex-1 p-8">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex min-h-[calc(100vh-8rem)]">
                        {/* Vertical Tabs */}
                        <div className="w-64 border-r border-gray-100 p-6 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-[#1F7A6E]/10 text-[#1F7A6E]' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('company')}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'company' ? 'bg-[#1F7A6E]/10 text-[#1F7A6E]' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                Company Info
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'users' ? 'bg-[#1F7A6E]/10 text-[#1F7A6E]' : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                Users & Permissions
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 p-8">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Settings</h2>
                                    <p className="text-gray-500 text-sm">Manage your personal admin profile here.</p>
                                    {/* Placeholder for Profile form */}
                                </div>
                            )}

                            {activeTab === 'company' && (
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Company Information</h2>
                                    <p className="text-gray-500 text-sm">System-wide configurations and logos.</p>
                                    {/* Placeholder for Company form */}
                                </div>
                            )}

                            {activeTab === 'users' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Users & Permissions</h2>
                                            <p className="text-gray-500 text-xs mt-1">Manage access across all sister companies centrally.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-[#1F7A6E] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#165a51] transition-colors shadow-sm"
                                        >
                                            <UserPlus size={16} />
                                            Add New User
                                        </button>
                                    </div>

                                    {loading ? (
                                        <div className="flex justify-center p-12">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1F7A6E]" />
                                        </div>
                                    ) : (
                                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-gray-50 text-xs font-black uppercase tracking-widest text-gray-400">
                                                    <tr>
                                                        <th className="px-6 py-4 border-b border-gray-200">User</th>
                                                        <th className="px-6 py-4 border-b border-gray-200">Company</th>
                                                        <th className="px-6 py-4 border-b border-gray-200">Role</th>
                                                        <th className="px-6 py-4 border-b border-gray-200">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {globalUsers.map(u => {
                                                        const role = u.roles?.[0]?.name || 'No Role';
                                                        return (
                                                            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded-full bg-[#1A2B3D]/10 flex items-center justify-center text-[#1A2B3D] font-bold text-xs shrink-0">
                                                                            {u.name.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-bold text-gray-900 leading-tight">{u.name}</p>
                                                                            <p className="text-xs text-gray-500">{u.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                                                                        {u.tenant?.name || 'Unknown'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-xs font-medium text-gray-600">
                                                                    {role}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1F7A6E] cursor-pointer hover:underline">
                                                                        Edit
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {globalUsers.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="text-center p-8 text-sm text-gray-500 italic">No users found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-[#1A2B3D]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Add New User</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateUser} className="p-6 space-y-4 overflow-y-auto">
                            {modalError && (
                                <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
                                    {modalError}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1F7A6E] focus:border-transparent outline-none transition-shadow"
                                    value={newUserForm.name}
                                    onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1F7A6E] focus:border-transparent outline-none transition-shadow"
                                    value={newUserForm.email}
                                    onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Assign to Company</label>
                                <select
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1F7A6E] focus:border-transparent outline-none transition-shadow bg-white"
                                    value={newUserForm.tenant_id}
                                    onChange={e => setNewUserForm({ ...newUserForm, tenant_id: e.target.value })}
                                >
                                    <option value="" disabled>Select a sister company...</option>
                                    {tenants.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Role / Permissions</label>
                                <select
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1F7A6E] focus:border-transparent outline-none transition-shadow bg-white"
                                    value={newUserForm.role_slug}
                                    onChange={e => setNewUserForm({ ...newUserForm, role_slug: e.target.value })}
                                >
                                    <option value="admin">Global Admin</option>
                                    <option value="hr_manager">HR Manager</option>
                                    <option value="hiring_manager">Hiring Manager</option>
                                    <option value="ta_manager">Talent Acquisition</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Temporary Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1F7A6E] focus:border-transparent outline-none transition-shadow"
                                    value={newUserForm.password}
                                    onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}
                                    minLength={8}
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 bg-[#1F7A6E] text-white text-sm font-bold rounded-xl hover:bg-[#165a51] transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
