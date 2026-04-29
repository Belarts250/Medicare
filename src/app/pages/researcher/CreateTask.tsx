import { useState } from "react";
import { Upload, FileText, Database, Coins, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

export default function CreateTask() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    modelFile: null as File | null,
    dataRequirements: "",
    minHospitals: 5,
    epochs: 10,
    rewardPerContribution: 100,
  });

  const handleSubmit = () => {
    navigate("/researcher");
  };

  const steps = [
    { number: 1, title: "Task Details", icon: FileText },
    { number: 2, title: "Model & Data", icon: Database },
    { number: 3, title: "Rewards", icon: Coins },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Training Task</h1>
        <p className="text-gray-600">Set up a new federated learning task</p>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((s, idx) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.number
                    ? "bg-[#1C3F3A] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
              </div>
              <div>
                <p className={`text-sm font-medium ${step >= s.number ? "text-gray-900" : "text-gray-500"}`}>
                  {s.title}
                </p>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded-full ${step > s.number ? "bg-[#1C3F3A]" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-xl bg-white border border-[#E0EAE8] shadow-sm space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1C3F3A] focus:ring-1 focus:ring-[#1C3F3A]"
                placeholder="e.g., Cardiac MRI Classification"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1C3F3A] focus:ring-1 focus:ring-[#1C3F3A]"
                placeholder="Describe the task objectives and requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Hospitals Required: {formData.minHospitals}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={formData.minHospitals}
                onChange={(e) => setFormData({ ...formData, minHospitals: parseInt(e.target.value) })}
                className="w-full accent-[#1C3F3A]"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-xl bg-white border border-[#E0EAE8] shadow-sm space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Model Architecture
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1C3F3A] transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {formData.modelFile ? formData.modelFile.name : "Drop your model file here or click to browse"}
                </p>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, modelFile: e.target.files?.[0] || null })}
                  className="hidden"
                  id="model-upload"
                />
                <label
                  htmlFor="model-upload"
                  className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Requirements
              </label>
              <textarea
                value={formData.dataRequirements}
                onChange={(e) => setFormData({ ...formData, dataRequirements: e.target.value })}
                rows={4}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1C3F3A] focus:ring-1 focus:ring-[#1C3F3A]"
                placeholder="Specify data format, minimum samples, and any preprocessing requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Epochs: {formData.epochs}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={formData.epochs}
                onChange={(e) => setFormData({ ...formData, epochs: parseInt(e.target.value) })}
                className="w-full accent-[#1C3F3A]"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-xl bg-white border border-[#E0EAE8] shadow-sm space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reward Per Contribution (Tokens)
              </label>
              <input
                type="number"
                value={formData.rewardPerContribution}
                onChange={(e) => setFormData({ ...formData, rewardPerContribution: parseInt(e.target.value) })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1C3F3A] focus:ring-1 focus:ring-[#1C3F3A]"
                min="1"
              />
            </div>

            <div className="p-6 rounded-xl bg-[#F9FAFB] border border-[#E0EAE8]">
              <h3 className="font-semibold text-gray-900 mb-4">Estimated Costs</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Per hospital contribution:</span>
                  <span className="text-gray-900 font-medium">{formData.rewardPerContribution} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum hospitals:</span>
                  <span className="text-gray-900 font-medium">{formData.minHospitals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Epochs per hospital:</span>
                  <span className="text-gray-900 font-medium">{formData.epochs}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-base">
                  <span className="text-gray-700 font-medium">Estimated total:</span>
                  <span className="text-gray-900 font-bold">
                    {formData.rewardPerContribution * formData.minHospitals * formData.epochs} tokens
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-6 py-3 rounded-lg bg-white border border-[#E0EAE8] text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-3 rounded-lg bg-[#1C3F3A] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-[#1C3F3A] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            Create Task
            <CheckCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}