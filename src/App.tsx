import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Register from "./pages/Register";
import Rules from "./pages/Rules";
import Jury from "./pages/Jury";
import NotFound from "./pages/NotFound";
import PaymentGateway from "./pages/PaymentGateway";
import Visitor from "./pages/Visitor";
import Auth from "./pages/auth";

// ✅ IMPORT LOADER
import Loader from "@/components/loader";
import AdminPanel from "./pages/AdminPanel";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ✅ Global Toast Providers */}
      <Toaster />
      <Sonner />

      {/* ✅ TOP-LEVEL LOADER */}
      <Loader />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/visitor" element={<Visitor />} />

          <Route path="/AdminPanel" element={<AdminPanel />} />

          {/* always last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
