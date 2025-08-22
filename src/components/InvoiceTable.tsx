import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Eye, 
  Download, 
  Search,
  Filter,
  ChevronDown,
  ExternalLink 
} from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Invoice>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredAndSortedInvoices = invoices
    .filter(invoice =>
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Vendor', 'Invoice No', 'Date', 'Currency', 'Total'],
      ...invoices.map(inv => [inv.vendor, inv.invoiceNo, inv.date, inv.currency, inv.total.toString()])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(invoices, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 lg:mb-0">
          Invoice History ({invoices.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={exportToJSON}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th 
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('vendor')}
              >
                <div className="flex items-center space-x-2">
                  <span>Vendor</span>
                  {sortField === 'vendor' && (
                    <ChevronDown className={`h-4 w-4 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('invoiceNo')}
              >
                <div className="flex items-center space-x-2">
                  <span>Invoice #</span>
                  {sortField === 'invoiceNo' && (
                    <ChevronDown className={`h-4 w-4 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-2">
                  <span>Date</span>
                  {sortField === 'date' && (
                    <ChevronDown className={`h-4 w-4 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('total')}
              >
                <div className="flex items-center space-x-2">
                  <span>Total</span>
                  {sortField === 'total' && (
                    <ChevronDown className={`h-4 w-4 transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedInvoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <span className="text-white font-medium">{invoice.vendor}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">{invoice.invoiceNo}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(invoice.date).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2 text-green-400 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>{invoice.total.toFixed(2)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedInvoice(invoice)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {filteredAndSortedInvoices.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No invoices found</p>
            <p className="text-sm">Upload your first invoice to get started</p>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Invoice Details</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Vendor</label>
                <p className="text-white font-semibold">{selectedInvoice.vendor}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Invoice Number</label>
                <p className="text-white">{selectedInvoice.invoiceNo}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                <p className="text-white">{new Date(selectedInvoice.date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Total</label>
                <p className="text-green-400 font-semibold text-xl">
                  {selectedInvoice.currency} {selectedInvoice.total.toFixed(2)}
                </p>
              </div>
            </div>

            {selectedInvoice.lineItems.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">Line Items</h4>
                <div className="space-y-2">
                  {selectedInvoice.lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300">{item.description}</span>
                      <span className="text-green-400 font-semibold">${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Raw Text</h4>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-x-auto">
                  {selectedInvoice.rawText}
                </pre>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default InvoiceTable;