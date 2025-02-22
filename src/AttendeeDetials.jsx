import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

interface AttendeeDetailsProps {
  formData: {
    name: string;
    email: string;
    avatarUrl: string;
    specialRequest: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const AttendeeDetails = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}: AttendeeDetailsProps) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, you would upload the file to your server or a service like Cloudinary
    // For this demo, we'll create a fake URL
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateFormData({ avatarUrl: url });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 1,
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-teal-light backdrop-blur-md rounded-3xl p-8 border border-teal-accent/20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white font-light">Attendee Details</h1>
        <span className="text-white/60">Step 2/3</span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-white mb-4 block">Upload Profile Photo</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-teal-accent/20 rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-teal-accent bg-teal-accent/10" : ""}
              ${formData.avatarUrl ? "border-teal-accent" : ""}`}
          >
            <input {...getInputProps()} />
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-xl mx-auto object-cover"
              />
            ) : (
              <div className="text-white/60">
                <div className="text-3xl mb-2">☁️</div>
                <p>Drag & drop or click to upload</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-white mb-2 block">Enter your name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`w-full bg-teal border rounded-lg p-3 text-white transition-colors
              ${errors.name ? "border-red-500" : "border-teal-accent/20"}`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div>
          <label className="text-white mb-2 block">Enter your email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={`w-full bg-teal border rounded-lg p-3 text-white transition-colors
              ${errors.email ? "border-red-500" : "border-teal-accent/20"}`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div>
          <label className="text-white mb-2 block">Special request?</label>
          <textarea
            value={formData.specialRequest}
            onChange={(e) => updateFormData({ specialRequest: e.target.value })}
            className="w-full bg-teal border border-teal-accent/20 rounded-lg p-3 text-white min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <button
          className="w-full py-3 rounded-lg border border-teal-accent/20 text-white hover:bg-teal-accent/10 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="w-full py-3 rounded-lg bg-teal-accent text-teal hover:bg-opacity-90 transition-colors"
          onClick={handleSubmit}
        >
          Get My Free Ticket
        </button>
      </div>
    </div>
  );
};

export default AttendeeDetails;