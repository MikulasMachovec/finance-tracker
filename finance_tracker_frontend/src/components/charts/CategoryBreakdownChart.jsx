import BackgroundCard from "../ui/BackgroundCard";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from "recharts";

import CustomSector from "./CustomSector";
import CustomLegend from "./CustomLegend";
import CustomPieLabel from "./CustomPieLabel";
import { useState } from "react";


const CategoryBreakdownChart = ({ categoryBreakdown }) => {

    const [ showLegend, setShowLegend ] = useState(false);
    return (
        <BackgroundCard 
            title="Spending by Category"
            subtitle="Current month"
        >
            <ResponsiveContainer
                width="100%"
                height={260}
            >
                <PieChart>
                <Pie
                    data={categoryBreakdown}
                    dataKey="amount"
                    nameKey="categoryName"
                    shape={CustomSector}
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    label={showLegend ? CustomPieLabel : false}
                    labelLine={false}
                />

                    <Tooltip 
                        formatter={(value, name) => [
                            `${Number(value).toLocaleString()} €`, name
                        ]}
                    />
                </PieChart>
                
            </ResponsiveContainer>
    {/* Pie chart legend */}
            <div className="relative mt-5 flex justify-center">
                <button
                    onClick={() => setShowLegend(prev => !prev)}
                    className="
                        flex items-center gap-2
                        rounded-full
                        border border-slate-200
                        bg-white
                        px-5 py-2
                        text-sm font-medium text-slate-600
                        shadow-sm
                        transition-all duration-200
                        hover:border-slate-300
                        hover:bg-slate-50
                        hover:shadow
                    "
                >
                    {showLegend ? "▲ Hide details" : "▼ Show details"}
                </button>

                {showLegend && (
                    <div
                        className="
                            absolute
                            top-full
                            z-20
                            mt-3
                            w-80
                            rounded-xl
                            border border-slate-200
                            bg-white
                            p-4
                            shadow-xl
                        "
                    >
                        
                        <CustomLegend data={categoryBreakdown} />
                    </div>
                )}

                
            </div>
                
            
        </BackgroundCard>
    )
};

export default CategoryBreakdownChart;