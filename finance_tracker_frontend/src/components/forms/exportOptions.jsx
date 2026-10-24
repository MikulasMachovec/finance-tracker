import { useState } from "react";
import { FaExchangeAlt, FaTags, FaWallet, FaCalendarAlt } from "react-icons/fa";

const exportOptions = [
    {
        value: "transactions",
        label: "All transactions",
        description: "Export all your transactions.",
        icon: FaExchangeAlt,
    },
    {
        value: "dateRange",
        label: "Transactions by date",
        description: "Export transactions from a specific period.",
        icon: FaCalendarAlt,
    },
    {
        value: "categories",
        label: "Categories",
        description: "Export all your categories.",
        icon: FaTags,
    },
    {
        value: "budgets",
        label: "Budgets",
        description: "Export your budget limits and periods.",
        icon: FaWallet,
    },
];

export default function ExportOptions({ onChange }) {
    const [exportType, setExportType] = useState("transactions");
    const [fromDate, setFormDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleExportTypeChange = (value) => {
        setExportType(value);

        onChange?.({
            exportType: value,
            fromDate: value === "dateRange" ? fromDate : "",
            toDate: value === "dateRange" ? toDate : "",
        });
    };

    const handleDateChange = (field, value) => {
        const nextFromDate = field === "fromDate" ? value : fromDate;
        const nextToDate = field === "toDate" ? value : toDate;

        if (field === "fromDate") setFormDate(value);
        if (field === "toDate") setToDate(value);

        onChange?.({
            exportType,
            fromDate: nextFromDate,
            toDate: nextToDate,
        });
    };
    const invalidDateRange = 
        fromDate && toDate && fromDate > toDate;

    return(
        <div className="
                flex 
                flex-col 
                gap-5
            ">
            {/* Heading */}
            <div>
                <p className="
                        text-sm 
                        text-slate-500
                        dark:text-slate-300
                        ">
                    Select the data you want to download.
                </p>
            </div>

            {/* export option */}
            <div className="
                    flex 
                    flex-col 
                    gap-2.5
                    ">
                {exportOptions.map((option) => {
                    const Icon = option.icon;
                    const selected = exportType === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                handleExportTypeChange(option.value)
                            }
                            aria-pressed={selected}
                            className={`
                                flex 
                                w-full 
                                items-center 
                                gap-3 
                                rounded-xl 
                                border p-3.5 
                                text-left 
                                transition-colors 
                                ${
                                selected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-200 bg-white hover:border-slate-400"
                            }
                                dark:bg-slate-800 
                                dark:text-white
                            `}
                        >
                            {/* Icon */}
                            <span
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                    selected
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-slate-100 text-slate-600"
                                }`}
                            >
                                <Icon size={18} />
                            </span>
    
                            {/* Text */}
                            <span className="flex min-w-0 flex-1 flex-col gap-1">
                                <span className="text-sm font-semibold text-slate-800 dark:text-white">
                                    {option.label}
                                </span>
                                <span className="text-xs leading-relaxed text-slate-500 dark:text-slate-300">
                                    {option.description}
                                </span>
                            </span>
    
                            {/* Radio indicator */}
                            <span
                                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 ${
                                    selected
                                        ? "border-blue-600"
                                        : "border-slate-300"
                                }`}
                            >
                                {selected && (
                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>
    
            {/* Date range */}
            {exportType === "dateRange" && (
                <div className="border-t border-slate-200 pt-4">
                    <h4 className="mb-3 text-sm font-semibold text-slate-800 dark:text-white">
                        Date range
                    </h4>
    
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600 dark:text-white">
                            From
                            <input
                                type="date"
                                value={fromDate}
                                max={toDate || undefined}
                                onChange={(event) =>
                                    handleDateChange(
                                        "fromDate",
                                        event.target.value
                                    )
                                }
                                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:bg-slate-800 dark:text-white"
                            />
                        </label>
    
                        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-600 dark:text-white">
                            To
                            <input
                                type="date"
                                value={toDate}
                                min={fromDate || undefined}
                                onChange={(event) =>
                                    handleDateChange(
                                        "toDate",
                                        event.target.value
                                    )
                                }
                                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:bg-slate-800 dark:text-white"
                            />
                        </label>
                    </div>
    
                    {invalidDateRange && (
                        <p className="mt-2 text-xs text-red-600">
                            The start date must be before the end date.
                        </p>
                    )}
                </div>
            )}
    
            {/* Export format */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500 dark:text-slate-300">
                    Export format
                </span>
    
                <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    CSV (.csv)
                </span>
            </div>

        </div>
    )
}