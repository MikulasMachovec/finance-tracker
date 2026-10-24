import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaWallet,
    FaPiggyBank,
  } from "react-icons/fa6";
  
import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../../utils/formatCurrency";
import { usePreferences } from "../../../context/preferencesContext";
  
  const SummaryCards = ({
    income,
    expense,
    balance,
    savingsPercentage,
  }) => {

    const { preferences } = usePreferences();
    
    const cards = [
      {
        title: "Income",
        value: formatCurrency( income, preferences.currency ),
        icon: FaArrowTrendUp,
        color: "bg-green-500",
      },
      {
        title: "Expenses",
        value: formatCurrency( expense, preferences.currency ),
        icon: FaArrowTrendDown,
        color: "bg-red-500",
      },
      {
        title: "Balance",
        value: formatCurrency( balance, preferences.currency ),
        icon: FaWallet,
        color: "bg-blue-500",
      },
      {
        title: "Savings",
        value: `${savingsPercentage}%`,
        icon: FaPiggyBank,
        color: "bg-purple-500",
      },
    ];
  
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  
        {cards.map((card) => (
          <SummaryCard
            key={card.title}
            {...card}
          />
        ))}
  
      </section>
    );
  };
  
  export default SummaryCards;