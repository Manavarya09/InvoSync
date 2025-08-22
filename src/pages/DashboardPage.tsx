import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import InvoiceUpload from '../components/InvoiceUpload';
import InvoiceTable from '../components/InvoiceTable';
import ExpenseCharts from '../components/ExpenseCharts';
import { Invoice } from '../types';

const DashboardPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleInvoiceProcessed = (invoice: Invoice) => {
    setInvoices(prev => [...prev, invoice]);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <InvoiceUpload onInvoiceProcessed={handleInvoiceProcessed} />
              </div>
              
              {/* Stats Cards */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Invoices</h3>
                  <p className="text-3xl font-bold text-blue-400">{invoices.length}</p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Amount</h3>
                  <p className="text-3xl font-bold text-teal-400">
                    ${invoices.reduce((sum, inv) => sum + inv.total, 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-orange-400">
                    {invoices.filter(inv => {
                      const invDate = new Date(inv.date);
                      const now = new Date();
                      return invDate.getMonth() === now.getMonth() && invDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {invoices.length > 0 && (
              <div className="mt-12">
                <ExpenseCharts invoices={invoices} />
              </div>
            )}

            {/* Invoice Table */}
            {invoices.length > 0 && (
              <div className="mt-12">
                <InvoiceTable invoices={invoices} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;