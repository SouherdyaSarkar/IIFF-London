// src/pages/ScrollToFooter.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToFooter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate to "/" and tell Index to scroll
    navigate("/", { state: { scrollToContact: true }, replace: true });
  }, [navigate]);

  return null;
};

export default ScrollToFooter;
