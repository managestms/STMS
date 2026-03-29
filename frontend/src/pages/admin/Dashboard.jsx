import { useState, useEffect } from 'react';
import {
  MdAdd,
  MdSettings,
  MdInventory,
  MdTrendingUp,
  MdTrendingDown,
  MdDownload
} from 'react-icons/md';
import api from "../../api/axios";
import { useLang } from '../../context/LanguageContext';
import T from '../../i18n/T';
import ExcelExport from './ExcelExport';
import { CardSkeleton } from '../../components/Skeletons';

const Dashboard = ({ navigateToAssignImli, onPageChange }) => {
  const { lang } = useLang();
  const [dashboardStats, setDashboardStats] = useState({
    rawImli: 0,
    distributed: 0,
    cleaned: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [localsRes, rawImliRes] = await Promise.all([
        api.get("/return_local"),
        api.get("/getRawImli")
      ]);

      let distributed = 0, inProgressCleaned = 0;
      if (localsRes.data && localsRes.data.data) {
        const locals = localsRes.data.data;
        distributed = locals.reduce((acc, local) => acc + (local.totalAssignedQuantity || 0), 0);
        inProgressCleaned = locals.reduce((acc, local) => acc + (local.totalReturnedQuantity || 0), 0);
      }

      const rawImli = rawImliRes.data?.data?.rawImliQuantity || 0;
      const historicalCleaned = rawImliRes.data?.data?.totalCleanedImli || 0;

      setDashboardStats({
        rawImli,
        distributed,
        cleaned: historicalCleaned + inProgressCleaned,
        pending: distributed - inProgressCleaned
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(true);
    const intervalId = setInterval(() => {
      fetchDashboardData(false);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const stats = [
    { id: 1, title: "Raw Imli", value: dashboardStats.rawImli, unit: "KG", icon: MdInventory, color: "orange" },
    { id: 2, title: "Cleaned Imli", value: dashboardStats.cleaned, unit: "KG", icon: MdTrendingUp, color: "green" },
    { id: 3, title: "Distributed Imli to Locals", value: dashboardStats.distributed, unit: "KG", icon: MdSettings, color: "purple" },
    { id: 4, title: "Pending Imli to be returned", value: dashboardStats.pending, unit: "KG", icon: MdTrendingDown, color: "amber" },
  ];

  const colorMap = {
    orange: { bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-100" },
    green:  { bg: "bg-green-50",  text: "text-green-500",  border: "border-green-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-500", border: "border-purple-100" },
    amber:  { bg: "bg-amber-50",  text: "text-amber-500",  border: "border-amber-100" },
  };

  const actions = [
    { key: 'addRawImli', label: "Add Raw Imli Stock", icon: MdAdd, color: "orange" },
    { key: 'assignImli', label: "Assign Imli", icon: MdSettings, color: "purple" },
    { key: 'imliReturned', label: "Imli Cleaned", icon: MdInventory, color: "green" },
  ];

  // Inventory summary data
  const totalStock = dashboardStats.rawImli + dashboardStats.distributed;
  const summaryItems = [
    { label: "Raw Stock", value: dashboardStats.rawImli, total: totalStock || 1, color: "#ea580c" },
    { label: "Cleaned", value: dashboardStats.cleaned, total: totalStock || 1, color: "#16a34a" },
    { label: "Distributed", value: dashboardStats.distributed, total: totalStock || 1, color: "#7c3aed" },
    { label: "Pending Return", value: dashboardStats.pending, total: totalStock || 1, color: "#d97706" },
  ];

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-50 overflow-hidden py-6 px-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
        
        {/* ── Stats Section (Left: 2 Columns) ── */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="grid grid-cols-2 gap-4 md:gap-6 h-full">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={`skeleton-${i}`} />)
            ) : (
              stats.map((stat) => {
                const c = colorMap[stat.color];
                const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`bg-white rounded-2xl py-8 px-5 md:py-10 md:px-8 border ${c.border} flex flex-col justify-between transition-all duration-200 hover:shadow-md relative`}
                >
                  <div className={`${c.bg} p-2 rounded-lg shrink-0 absolute top-4 md:top-6 ${lang === 'ur' ? 'left-4 md:left-6' : 'right-4 md:right-6'}`}>
                    <Icon className={`${c.text} text-lg md:text-xl`} />
                  </div>
                  <p className={`text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider leading-snug mb-auto ${lang === 'ur' ? 'urdu-ui text-right pl-10' : 'pr-10'}`}>
                    <T k={stat.title} />
                  </p>
                  <p className={`text-3xl md:text-7xl font-extrabold ${c.text} tracking-tight leading-none mt-4 md:mt-6 ${lang === 'ur' ? 'text-right' : ''}`}>
                    <span className="font-calculator text-[130%] inline-block align-middle">{stat.value}</span>
                    <span className={`text-[10px] md:text-base font-sans font-normal text-gray-400 align-baseline ${lang === 'ur' ? 'mr-1' : 'ml-1'}`}>{stat.unit}</span>
                  </p>
                </div>
              );
            }))}
          </div>
        </div>

        {/* ── Actions Section (Right: 1 Column) ── */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full self-stretch">
          <h3 className={`text-xs md:text-sm font-bold text-gray-800 uppercase tracking-widest mb-6 ${lang === 'ur' ? 'urdu-ui text-right' : ''}`}>
            <T k="Quick Actions" />
          </h3>
          
          <div className="flex flex-col gap-3 flex-1 justify-start">
            {actions.map((action) => {
              const c = colorMap[action.color];
              const Icon = action.icon;
              return (
                <button
                  key={action.key}
                  onClick={() => onPageChange && onPageChange(action.key)}
                  className={`group flex items-center gap-4 w-full p-3.5 md:p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all outline-none active:scale-[0.98] ${lang === 'ur' ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className={`${c.bg} p-2.5 rounded-lg shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`${c.text} text-xl`} />
                  </div>
                  <span className={`font-semibold text-gray-700 text-sm md:text-[15px] ${lang === 'ur' ? 'urdu-ui text-right flex-1' : ''}`}>
                    <T k={action.label} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 shrink-0">
            <ExcelExport />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
