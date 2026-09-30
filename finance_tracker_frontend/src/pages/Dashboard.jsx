import { useState } from "react";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart";
import IncomeExpenseChart from "../components/charts/IncomeExpensChart";
import MonthlyBudgetProgress from "../components/dashboard/MonthlyBudget/MonthlyBudgetProgress";
import RecentTransactions from "../components/dashboard/RecentSpending/RecentTransactions";
import SpendingInsights from "../components/dashboard/SpendingInsight/SpendingInsights";
import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import PageHeader from "../components/layout/PageHeader";
import Modal from "../components/ui/modal/Modal";
import Button from "../components/ui/Button";
import TransactionForm from "../components/forms/TransactionForm";
import useTransaction from "../hooks/useTransaction";
import toast from "react-hot-toast";
import useDashboard from "../hooks/useDashboard";
import useBudget from "../hooks/useBudgets";

const Dashboard = () => {

  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const { 
    transactions,
    addTransaction 
    } = useTransaction();

  const {
    income,
    expense,
    balance,
    savingsPercentage,
	  monthlyFinance,
    categoryBreakdown
  } = useDashboard(refreshKey);

  const { budgets } = useBudget();  

  const handleAddTransaction = async ( transaction ) =>{ 
        
    await addTransaction(transaction)

    setShowAddModal(false);

    toast.success(
        "Transaction created successfully"
    );

    setRefreshKey(prev => prev + 1);
    }

  return (
    <>
      
      <PageHeader
          title="Dashboard"
          subtitle="Track your income, expenses and financial health."
          buttonText="Add Transaction"
          onButtonClick={() => setShowAddModal(true)}
      />
  
      <SummaryCards 
			income={income}
			expense={expense}
			balance={balance}
			savingsPercentage={savingsPercentage}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">
              <IncomeExpenseChart monthlyFinance={monthlyFinance} />
          </div>

          <CategoryBreakdownChart categoryBreakdown={categoryBreakdown} />

          <div className="xl:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>

          <SpendingInsights />

          <div className="xl:col-span-3">
            <MonthlyBudgetProgress budgets={budgets} />
          </div>
      </div>

      {/* Add transaction modal */}
      <Modal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add Transaction"
                size="lg"
                footer={
                    <>
                        <Button
                            onClick={() => setShowAddModal(false)}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="transaction-form"
                        >
                            Save Transaction
                        </Button>
                    
                    </>
                }
            >
                <TransactionForm
                    onSubmit={handleAddTransaction}
                />
            </Modal>
        

    </>
  );
};
  
  export default Dashboard;