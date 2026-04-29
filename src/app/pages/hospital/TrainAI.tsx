import { useState } from "react";
import { Upload, Database, Brain, Shield, Play, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";

export default function TrainAI() {
  const [step, setStep] = useState(1);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const startTraining = () => {
    setIsTraining(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setTrainingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsTraining(false), 1000);
      }
    }, 100);
  };

  const steps = [
    { number: 1, title: "Prepare Data", icon: Database },
    { number: 2, title: "Configure Model", icon: Brain },
    { number: 3, title: "Privacy Setup", icon: Shield },
    { number: 4, title: "Start Training", icon: Play },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0C29] mb-2">
          Train AI Model Locally
        </h1>
        <p className="text-[#64748B]">
          Contribute to federated learning while keeping your data private
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((s, idx) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.number
                    ? "bg-[#1C3F3A] text-[#fefffe]"
                    : "bg-white border border-[#E0EAE8] text-[#64748B]"
                }`}
              >
                {step > s.number ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
              </div>
              <div>
                <p className={`text-sm font-medium ${step >= s.number ? "text-[#0A0C29]" : "text-[#64748B]"}`}>
                  {s.title}
                </p>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded-full ${step > s.number ? "bg-[#1C3F3A]" : "bg-[#E0EAE8]"}`} />
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
              <h3 className="text-lg font-semibold text-[#0A0C29] mb-4">
                Select Your Medical Data
              </h3>
              <p className="text-sm text-[#64748B] mb-4">
                Choose the dataset you want to use for training. Your data never leaves your infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Cardiac MRI Dataset", samples: 15420, type: "MRI Scans" },
                { name: "CT Lung Images", samples: 12350, type: "CT Scans" },
                { name: "ECG Recordings", samples: 18200, type: "Time Series" },
                { name: "X-Ray Dataset", samples: 9870, type: "X-Ray Images" },
              ].map((dataset, idx) => (
                <button
                  key={idx}
                  className="p-6 rounded-lg bg-white border border-[#E0EAE8] hover:border-[#1C3F3A] transition-all text-left group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Database className="w-8 h-8 text-[#1C3F3A]" />
                    <Badge variant="info">{dataset.type}</Badge>
                  </div>
                  <h4 className="font-semibold text-[#0A0C29] mb-2 group-hover:text-[#1C3F3A] transition-colors">
                    {dataset.name}
                  </h4>
                  <p className="text-sm text-[#64748B]">
                    {dataset.samples.toLocaleString()} samples available
                  </p>
                </button>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-[#E0EAE8]/30 border border-[#1C3F3A]/20">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#1C3F3A] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0A0C29] mb-2">
                    Data Privacy Guaranteed
                  </h4>
                  <p className="text-sm text-[#0A0C29]/80">
                    All training happens locally on your servers. Only encrypted model updates are shared with the network, never your raw patient data.
                  </p>
                </div>
              </div>
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
              <h3 className="text-lg font-semibold text-[#0A0C29] mb-4">
                AI Model Configuration
              </h3>
              <p className="text-sm text-[#64748B] mb-4">
                Configure the neural network architecture and training parameters.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0C29] mb-2">
                  Model Architecture
                </label>
                <select className="w-full bg-white border border-[#E0EAE8] rounded-lg px-4 py-3 text-[#0A0C29] focus:outline-none focus:border-[#1C3F3A]">
                  <option>ResNet-50 (Recommended for MRI)</option>
                  <option>EfficientNet-B3</option>
                  <option>VGG-16</option>
                  <option>Custom Architecture</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0A0C29] mb-2">
                    Batch Size
                  </label>
                  <input
                    type="number"
                    defaultValue={32}
                    className="w-full bg-white border border-[#E0EAE8] rounded-lg px-4 py-3 text-[#0A0C29] focus:outline-none focus:border-[#1C3F3A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0A0C29] mb-2">
                    Learning Rate
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    defaultValue={0.001}
                    className="w-full bg-white border border-[#E0EAE8] rounded-lg px-4 py-3 text-[#0A0C29] focus:outline-none focus:border-[#1C3F3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0A0C29] mb-2">
                  Number of Epochs: 10
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  defaultValue={10}
                  className="w-full accent-[#1C3F3A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[#E0EAE8]/20 border border-[#E0EAE8]">
                  <p className="text-xs text-[#64748B] mb-1">
                    GPU Memory
                  </p>
                  <p className="text-lg font-bold text-[#0A0C29]">
                    8.2 GB
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#E0EAE8]/20 border border-[#E0EAE8]">
                  <p className="text-xs text-[#64748B] mb-1">
                    Est. Time
                  </p>
                  <p className="text-lg font-bold text-[#0A0C29]">
                    2.5 hours
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#E0EAE8]/20 border border-[#E0EAE8]">
                  <p className="text-xs text-[#64748B] mb-1">
                    Parameters
                  </p>
                  <p className="text-lg font-bold text-[#0A0C29]">
                    25.6M
                  </p>
                </div>
              </div>
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
              <h3 className="text-lg font-semibold text-[#0A0C29] mb-4">
                Privacy & Security Settings
              </h3>
              <p className="text-sm text-[#64748B] mb-4">
                Configure encryption and privacy-preserving techniques.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Differential Privacy",
                  description: "Add calibrated noise to protect individual data points",
                  enabled: true,
                },
                {
                  title: "Homomorphic Encryption",
                  description: "Encrypt model updates before transmission",
                  enabled: true,
                },
                {
                  title: "Zero-Knowledge Proofs",
                  description: "Verify contributions without revealing data",
                  enabled: true,
                },
                {
                  title: "Secure Aggregation",
                  description: "Combine encrypted updates from multiple hospitals",
                  enabled: true,
                },
              ].map((setting, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border border-[#E0EAE8] shadow-sm"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0A0C29] mb-1">
                      {setting.title}
                    </h4>
                    <p className="text-sm text-[#64748B]">
                      {setting.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="verified">Enabled</Badge>
                    <div className="w-11 h-6 bg-[#1C3F3A] rounded-full relative">
                      <div className="absolute right-[2px] top-[2px] w-5 h-5 bg-[#fefffe] rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-[#E0EAE8]/30 border border-[#1C3F3A]/20">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#1C3F3A] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#0A0C29] mb-2">
                    Enterprise-Grade Security
                  </h4>
                  <ul className="text-sm text-[#0A0C29]/80 space-y-1">
                    <li>• AES-256-GCM encryption for all data in transit</li>
                    <li>• TLS 1.3 for secure communication</li>
                    <li>• Automated compliance with HIPAA and GDPR</li>
                    <li>• Audit logs for all training activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-xl bg-white border border-[#E0EAE8] shadow-sm space-y-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#0A0C29] mb-4">
                Ready to Start Training
              </h3>
              <p className="text-sm text-[#64748B] mb-8">
                Review your configuration and start the federated learning process.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-[#0A0C29]">
                  Data Configuration
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Dataset:
                    </span>
                    <span className="text-[#0A0C29]">
                      Cardiac MRI (15,420 samples)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Model:
                    </span>
                    <span className="text-[#0A0C29]">
                      ResNet-50
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Epochs:
                    </span>
                    <span className="text-[#0A0C29]">
                      10
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-[#0A0C29]">
                  Security & Privacy
                </h4>
                <div className="space-y-2">
                  <Badge variant="verified">Differential Privacy</Badge>
                  <Badge variant="verified">Homomorphic Encryption</Badge>
                  <Badge variant="verified">Zero-Knowledge Proofs</Badge>
                </div>
              </div>
            </div>

            {!isTraining ? (
              <button
                onClick={startTraining}
                className="w-full px-8 py-4 rounded-lg bg-[#1C3F3A] text-white font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
              >
                <Play className="w-6 h-6" />
                <span>Start Local Training</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#0A0C29] font-medium">
                    Training in Progress...
                  </span>
                  <span className="text-[#1C3F3A] font-bold">
                    {trainingProgress}%
                  </span>
                </div>
                <ProgressBar value={trainingProgress} showLabel={false} color="primary" size="lg" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-[#64748B] mb-1">
                      Current Epoch
                    </p>
                    <p className="text-lg font-bold text-[#0A0C29]">
                      {Math.floor(trainingProgress / 10)}/10
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#64748B] mb-1">
                      GPU Usage
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {85 + Math.floor(Math.random() * 10)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#64748B] mb-1">
                      Accuracy
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {(65 + trainingProgress * 0.25).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-6 py-3 rounded-lg bg-white border border-[#E0EAE8] text-[#0A0C29] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shadow-sm"
        >
          Previous
        </button>

        {step < 4 && (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-3 rounded-lg bg-[#1C3F3A] text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
