import React, { useState } from 'react';
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"; // Re-import Button from shadcn/ui
import { Input } from "@/components/ui/input";   // Re-import Input from shadcn/ui

// --- Removed Helper Components (Button, Input, Label) ---
// The custom Button, Input, and Label components are removed as we're reverting to shadcn/ui components
// and the specific styling for credit card inputs is no longer needed.

// --- Main Payment Gateway Component ---

const PaymentGateway = () => {
  // Removed state for credit card details: cardName, cardNumber, expiryDate, cvc
  const [discountCode, setDiscountCode] = useState('');
  const [paymentMethod] = useState('paypal'); // Only PayPal is available now, no selection needed

  // New state for contact details
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // State for Google Apps Script Web App URL
  // IMPORTANT: Replace 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE' with the URL you copied after deploying your Apps Script.
  const [appsScriptUrl] = useState('https://script.google.com/macros/s/AKfycbx2teBAr0c_XJBr1gmgcT-OR2lp6xZapOeW3C1beQb8UpDg5lhaQsTOrrnnW8TllYvatg/exec');

  const handlePaymentSubmit = async (event: React.FormEvent) => { // Make the function async
    event.preventDefault();

    // Basic validation for contact details
    if (!contactName || !contactEmail || !contactPhone) {
      alert('Please fill in all contact details.');
      return;
    }

    // Data to send to Google Sheets
    const formData = {
      contactName,
      contactEmail,
      contactPhone,
      // Using client-side timestamp, but server-side (Apps Script) timestamp is also added for accuracy.
      // This client-side timestamp can be used for debugging or if you prefer it.
      timestamp: new Date().toISOString(), 
    };

    try {
      // Send data to Google Apps Script
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        // 'no-cors' mode is often necessary when calling Apps Script web apps directly from a browser
        // to avoid CORS preflight issues, as Apps Script doesn't send CORS headers by default.
        // Note: In 'no-cors' mode, the response object will be 'opaque', meaning you cannot
        // inspect its status or content directly in the frontend. The Apps Script will still
        // receive and process the data.
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Data sent to Google Sheets. Response is opaque due to "no-cors" mode.');
      console.log('Attempting PayPal redirection...');
      alert('Redirecting to PayPal! (Simulated)');
      // In a real application, you would redirect to PayPal's payment page here.
      // Example: window.location.href = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Registration&amount=99.00&currency_code=USD';

    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      alert('Failed to record contact details. Please try again.');
    }
  };

  // Removed formatCardNumber and formatExpiryDate functions

  return (
    <div className="relative overflow-hidden bg-zinc-950 min-h-screen text-white font-sans flex flex-col">
      <style>{`
        @keyframes electricPulse {
          0% { box-shadow: 0 0 0 0 rgba(95, 21, 21, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(95, 21, 21, 0); }
          100% { box-shadow: 0 0 0 0 rgba(95, 21, 21, 0); }
        }
        
        @keyframes electricGlow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 5px #5f1515); }
          50% { filter: brightness(1.2) drop-shadow(0 0 15px #5f1515) drop-shadow(0 0 25px #5f1515); }
        }
        
        .electric-hover:hover {
          animation: electricPulse 0.6s ease-out;
        }
        
        .electric-active:active {
          animation: electricGlow 0.3s ease-out;
        }
      `}</style>
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" />
      
      <Navigation />

      <main className="relative z-10 py-16 flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center"> {/* Added text-center for overall alignment */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-heading font-bold text-center mb-12">Checkout</h1>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12 justify-center"> {/* Added justify-center */}
            
            {/* Left Column: Payment Details (now PayPal only) */}
            {/* Changed bg and border */}
            <motion.div 
              className="w-full lg:w-2/5 bg-red-900/20 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-red-500/10 max-w-md" // Adjusted max-w for a smaller form
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-semibold mb-6">Contact Details</h2> {/* Changed heading */}
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* New Contact Details Inputs */}
                <div>
                  <label htmlFor="contactName" className="block text-sm font-body font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left mb-2">Name</label>
                  <Input id="contactName" type="text" placeholder="John Doe" value={contactName} onChange={(e) => setContactName(e.target.value)} className="bg-red-900/20 border-red-500/30 text-white" />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-body font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left mb-2">Email ID</label>
                  <Input id="contactEmail" type="email" placeholder="john.doe@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="bg-red-900/20 border-red-500/30 text-white" />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-body font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left mb-2">Phone Number</label>
                  <Input id="contactPhone" type="tel" placeholder="123-456-7890" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="bg-red-900/20 border-red-500/30 text-white" />
                </div>
                
                <div className="text-center py-4">
                  <p className="text-lg mb-4 font-body">You will be redirected to PayPal to complete your purchase.</p>
                  <Button
                    type="submit"
                    variant="secondary" // Using shadcn/ui variant
                    size="lg" // Using shadcn/ui size
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-bold py-3 text-lg rounded-lg shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:scale-105 electric-hover electric-active"
                  >
                    Continue to PayPal
                  </Button>
                </div>
              </form>

              <Button
                variant="ghost"
                className="text-white/60 hover:text-white mt-4 font-heading electric-hover electric-active" // Adjusted text color for ghost button
                onClick={() => alert("Payment cancelled. Returning to registration.")} // Replace with actual navigation
              >
                Cancel Payment
              </Button>
            </motion.div>

            {/* Right Column: Order Summary */}
            {/* Changed bg and border */}
            <motion.div
              className="w-full lg:w-2/5 bg-red-900/20 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-red-500/10 max-w-md" // Adjusted max-w to match the payment details column
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h2 className="text-2xl font-heading font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-body">
                  <span>Registration Fee:</span>
                  <span>$99.00</span>
                </div>
                <div className="flex justify-between text-lg font-body">
                  <span>Discount:</span>
                  {/* Changed text color for discount */}
                  <span className="text-lime-400">-$0.00</span>
                </div>
                {/* Changed border */}
                <div className="border-t border-red-500/20 pt-4 flex justify-between text-xl font-heading font-bold">
                  <span>Total:</span>
                  <span>$99.00</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label htmlFor="discountCode" className="block text-sm font-body font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left mb-2"> {/* Using a standard label here */}
                    Discount Code
                  </label>
                  <div className="flex gap-2 mt-2">
                    {/* Changed bg and border */}
                    <Input id="discountCode" type="text" placeholder="DISCOUNT10" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="flex-grow bg-red-900/20 border-red-500/30 text-white" />
                    {/* Changed bg, hover:bg, and shadow */}
                    <Button className="bg-red-800 hover:bg-red-700 text-white font-heading font-bold py-2 px-4 rounded-lg shadow-lg shadow-red-800/30 transition-all duration-300 electric-hover electric-active">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentGateway;