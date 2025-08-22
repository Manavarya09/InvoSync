import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, BarChart3, Download, Shield, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero3D from '../components/Hero3D';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
  >
    <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <FileText size={32} />,
      title: "Smart Invoice Parsing",
      description: "AI-powered extraction of vendor details, line items, totals, and dates from any invoice format."
    },
    {
      icon: <Zap size={32} />,
      title: "Real-time Processing",
      description: "Instant parsing and structuring of invoice data with JSON output for seamless integration."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "3D Analytics Dashboard",
      description: "Interactive 3D charts and visualizations to track expenses by vendor, category, and time."
    },
    {
      icon: <Download size={32} />,
      title: "Multi-format Export",
      description: "Export your structured data as JSON, CSV, or Excel files for your accounting software."
    },
    {
      icon: <Shield size={32} />,
      title: "Enterprise Security",
      description: "Bank-level encryption and secure data handling to protect your financial information."
    },
    {
      icon: <Rocket size={32} />,
      title: "SaaS Ready",
      description: "Scalable architecture with API access, webhooks, and subscription management built-in."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <Hero3D />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Powerful Features for Modern Bookkeeping
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your invoice processing workflow with AI-powered automation and beautiful 3D visualizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-teal-900/20"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Bookkeeping?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of businesses automating their invoice processing with InvoSync
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-semibold border border-gray-600 transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;