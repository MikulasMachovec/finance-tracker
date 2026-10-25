package org.example.financetracker.scheduler;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.service.interfaces.BudgetService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RecurringBudgetScheduler {
    private final BudgetService budgetService;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady(){
        budgetService.createMissingBudgetsForAllUsers();
    }

    @Scheduled(cron = "0 15 2 * * *")
    public void generateRecurringBudgets() {
        budgetService.createMissingBudgetsForAllUsers();
    }
}
