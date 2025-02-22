import { useState } from "react";
import TicketSelection from "@/components/TicketSelection";
import AttendeeDetails from "@/components/AttendeeDetails";
import TicketConfirmation from "@/components/TicketConfirmation";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ticketType: "",
    quantity: 1,
    name: "",
    email: "",
    avatarUrl: "",
    specialRequest: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-teal flex flex-col items-center py-8 px-4">
      <nav className="w-full max-w-5xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl">Tiez</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-white hover:text-teal-accent transition-colors">Events</a>
          <a href="#" className="text-white hover:text-teal-accent transition-colors">My Tickets</a>
          <a href="#" className="text-white hover:text-teal-accent transition-colors">About Project</a>
        </div>
        <button className="bg-white text-teal px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
          MY TICKETS →
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {step === 1 && (
            <TicketSelection
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <AttendeeDetails
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <TicketConfirmation
              formData={formData}
              onBack={prevStep}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;