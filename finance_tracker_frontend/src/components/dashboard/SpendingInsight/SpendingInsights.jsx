import BackgroundCard from "../../ui/BackgroundCard";
import InsightItem from "./InsightItem";
import spendingInsights from "../../../data/insight"

const SpendingInsights = () => {
    return (
        <BackgroundCard
            title="Spending Insights"
            subtitle="Personalized observations"
        >
            <div className="divide-y divide-slate-100">
                {spendingInsights.map(insight => (
                    <InsightItem
                        key={insight.id}
                        insight={insight}
                    />
                ))}
            </div>
        </BackgroundCard>
    );
};

export default SpendingInsights;