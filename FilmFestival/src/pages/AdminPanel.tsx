import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { auth, googleProvider } from "../utils/firebaseConfig";
// import Navigation from "@/components/Navigation"; // Removed to fix import error
// import Footer from "@/components/Footer"; // Removed to fix import error
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  AlertTriangle,
  Clock,
  Timer,
  Film,
  PlayCircle,
  ExternalLink,
  Users,
  ClipboardCheck,
  CreditCard,
  Inbox,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

// --- Placeholder Components (to resolve import errors) ---

// --- Helper Card Components ---

// Card for top-level stats

const StatCard = ({ icon: Icon, title, value, loading }) => (
  <motion.div
    className="film-card rounded-2xl p-5 bg-[#2b0b0b]/60 border border-[#f3e3d5]/10 flex items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex-shrink-0 bg-[#f3e3d5]/10 p-3 rounded-lg">
      <Icon className="w-6 h-6 text-[#f3e3d5]" />
    </div>
    <div>
      <p className="text-sm text-[#f8eadd]/70 uppercase tracking-wider">
        {title}
      </p>
      {loading ? (
        <div className="w-24 h-7 bg-[#f8eadd]/20 rounded animate-pulse mt-1"></div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </div>
  </motion.div>
);

// Card for management links
const ManagementCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className="film-card rounded-2xl p-6 text-left bg-[#2b0b0b]/60 border border-[#f3e3d5]/10 flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex-shrink-0 bg-[#f3e3d5]/10 p-3 rounded-lg w-min mb-4">
        <Icon className="w-6 h-6 text-[#f3e3d5]" />
      </div>
      <h2 className="text-2xl font-semibold text-[#f3e3d5] mb-2">{title}</h2>
      <p className="text-[#f8eadd]/70 mb-4">{desc}</p>
    </div>
    <a
      href="#"
      className="text-sm font-medium text-[#f3e3d5] hover:text-white group mt-2"
    >
      Manage{" "}
      <ArrowRight className="inline-block w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </a>
  </motion.div>
);

// --- Main Admin Panel Component ---

const AdminPanel = () => {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIfLoggedInAsAdmin = () => {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin && auth.currentUser?.uid) {
        console.log("Admin is logged in");
      } else {
        toast.error(
          "You must be logged in as admin to access the admin panel.",
        );
        window.location.href = "/auth";
      }
    };
    checkIfLoggedInAsAdmin();
  }, []);

  const desiredColumns = [
    "name",
    "email",
    "projectTitle",
    "duration_hours",
    "duration_minutes",
    "duration_seconds",
    "productionDate",
    "trailerLink",
    "fullFilmLink",
  ];

  // Helper function to format seconds into HH:MM:SS
  const formatDuration = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  // Calculate stats using useMemo
  const stats = useMemo(() => {
    const totalSubmissions = sheetData.length;
    let totalRuntimeInSeconds = 0;

    sheetData.forEach((row) => {
      const hours = parseInt(row.duration_hours) || 0;
      const minutes = parseInt(row.duration_minutes) || 0;
      const seconds = parseInt(row.duration_seconds) || 0;
      totalRuntimeInSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const averageRuntimeInSeconds =
      totalSubmissions > 0 ? totalRuntimeInSeconds / totalSubmissions : 0;

    return {
      totalSubmissions,
      totalRuntime: formatDuration(totalRuntimeInSeconds),
      averageRuntime: formatDuration(averageRuntimeInSeconds),
    };
  }, [sheetData]);

  useEffect(() => {
    const fetchSheetData = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/sheet-data`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSheetData(data);
      } catch (err: any) {
        console.error("Error fetching sheet data:", err);
        setError(
          "Failed to load sheet data. Please ensure the backend is running and configured correctly.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  // Helper function to render table cells with conditional styling
  const renderCellContent = (row: any, header: string) => {
    const content = row[header] || null;

    if ((header === "trailerLink" || header === "fullFilmLink") && content) {
      return (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#f3e3d5] hover:text-white underline-offset-4 hover:underline font-medium"
        >
          {header === "trailerLink" ? (
            <PlayCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          )}
          {header === "trailerLink" ? "Trailer" : "Full Film"}
        </a>
      );
    }

    return content || <span className="text-white/40">N/A</span>;
  };

  return (
    <div className="min-h-screen bg-[#5f1515] text-[#f8eadd] font-body relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <Navigation />

      <main className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-full mx-auto"
          >
            <h1 className="text-5xl heading-bebas font-black uppercase tracking-tight text-[#f3e3d5] mb-4 text-center">
              Admin Dashboard
            </h1>
            <p className="text-[#f8eadd]/80 text-lg mb-10 text-center max-w-2xl mx-auto">
              Welcome, Admin. Manage your festival data, users, and submissions
              here.
            </p>

            {/* --- Stat Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard
                icon={Film}
                title="Total Submissions"
                value={stats.totalSubmissions}
                loading={loading}
              />
              <StatCard
                icon={Clock}
                title="Total Runtime"
                value={stats.totalRuntime}
                loading={loading}
              />
              <StatCard
                icon={Timer}
                title="Average Runtime"
                value={stats.averageRuntime}
                loading={loading}
              />
            </div>

            {/* --- Google Sheet Data Table --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="film-card rounded-2xl p-6 sm:p-8 text-left bg-[#2b0b0b]/40 border border-[#f3e3d5]/10 mt-10"
            >
              <h2 className="text-3xl font-semibold text-[#f3e3d5] mb-6">
                Festival Submissions
              </h2>

              {/* --- Loading / Error / Empty States --- */}
              {loading && (
                <div className="flex flex-col items-center justify-center h-64 text-[#f8eadd]/70">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p className="text-lg">Loading submissions...</p>
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center justify-center h-64 text-red-400">
                  <AlertTriangle className="w-12 h-12 mb-4" />
                  <p className="text-lg font-semibold">Failed to load data</p>
                  <p className="text-sm max-w-md text-center">{error}</p>
                </div>
              )}
              {!loading && !error && sheetData.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-[#f8eadd]/70">
                  <Inbox className="w-12 h-12 mb-4" />
                  <p className="text-lg">No submissions found.</p>
                </div>
              )}

              {/* --- Data Table --- */}
              {!loading && !error && sheetData.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-[#f3e3d5]/10">
                  <Table className="min-w-full divide-y divide-[#f3e3d5]/10">
                    <TableHeader className="bg-[#2b0b0b]/60">
                      <TableRow>
                        {desiredColumns.map((header) => (
                          <TableHead
                            key={header}
                            className="px-4 py-3 text-left text-xs font-medium text-[#f3e3d5] uppercase tracking-wider whitespace-nowrap"
                          >
                            {header
                              .replace(/([A-Z])/g, " $1")
                              .replace(/_/g, " ")}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-[#f3e3d5]/5">
                      {sheetData.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          className="hover:bg-[#f3e3d5]/10 transition-colors"
                        >
                          {desiredColumns.map((header) => (
                            <TableCell
                              key={`${rowIndex}-${header}`}
                              className={`px-4 py-4 text-sm text-white/90 ${
                                header === "projectTitle" ||
                                header === "name" ||
                                header === "email"
                                  ? "max-w-xs truncate"
                                  : "whitespace-nowrap"
                              }`}
                              title={row[header] || ""}
                            >
                              {renderCellContent(row, header)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
