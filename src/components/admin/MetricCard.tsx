import React from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon }) => {
    return (
        <div className="bg-white border border-workableGray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-workableGray-500 text-sm font-medium uppercase tracking-wider">{title}</span>
                {icon && <div className="text-workableGray-400">{icon}</div>}
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-workableGray-900">{value}</h3>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>
        </div>
    );
};
