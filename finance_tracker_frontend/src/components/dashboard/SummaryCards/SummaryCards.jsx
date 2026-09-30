import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaWallet,
    FaPiggyBank,
  } from "react-icons/fa6";
  
import SummaryCard from "./SummaryCard";
import useDashboard from "../../../hooks/useDashboard";
  
  const SummaryCards = ({
    income,
    expense,
    balance,
    savingsPercentage,
  }) => {
    
    const cards = [
      {
        title: "Income",
        value: `${income.toLocaleString()}€`,
        change: "12%",
        trend: "up",
        icon: FaArrowTrendUp,
        color: "bg-green-500",
      },
      {
        title: "Expenses",
        value: `${expense.toLocaleString()}€`,
        change: "8%",
        trend: "down",
        icon: FaArrowTrendDown,
        color: "bg-red-500",
      },
      {
        title: "Balance",
        value: `${balance.toLocaleString()}€`,
        change: "5%",
        trend: "up",
        icon: FaWallet,
        color: "bg-blue-500",
      },
      {
        title: "Savings",
        value: `${savingsPercentage}%`,
        change: "3%",
        trend: "up",
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