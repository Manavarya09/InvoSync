import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown } from 'lucide-react';
import Navbar from '../components/Navbar';

const PricingCard: React.FC<{
  title: string;
  price: string;
  period: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  delay: number;
}> = ({ title, price, period, features, icon, popular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
      popular 
        ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
        : 'border-gray-700 hover:border-gray-600'
    }`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
    )}
    
    <div className="text-center mb-8">
      <div className="text-blue-400 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400 ml-2">{period}</span>
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
        popular
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-white'
      }`}
    >
      {popular ? 'Start Free Trial' : 'Get Started'}
    </button>
  </motion.div>
);

const PricingPage: React.FC = () => {
  const plans = [
    {
      title: "Free",
      price: "$0",
      period: "/month",
      icon: <Zap size={32} />,
      features: [
        "10 invoices per month",
        "Basic invoice parsing",
        "JSON export",
        "Email support",
        "Dashboard access"
      ]
    },
    {
      title: "Pro",
      price: "$29",
      period: "/month",
      icon: <Crown size={32} />,
      popular: true,
      features: [
        "Unlimited invoices",
        "Advanced AI parsing",
        "All export formats (JSON, CSV, Excel)",
        "3D analytics dashboard",
        "API access",
        "Priority support",
        "Custom integrations",
        "Advanced reporting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="pt-24 px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that's right for your business. Start with our free tier and upgrade as you grow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                delay={index * 0.2}
              />
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Everything you need to automate your bookkeeping
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Parsing</h3>
                <p className="text-gray-400">
                  AI-powered extraction of vendor details, amounts, and dates from any invoice format
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">3D Analytics</h3>
                <p className="text-gray-400">
                  Interactive 3D charts and visualizations to understand your expenses better
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Export Anywhere</h3>
                <p className="text-gray-400">
                  Export your structured data to any accounting software with multiple format support
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;