import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceUploadProps {
  onInvoiceProcessed: (invoice: Invoice) => void;
}

const InvoiceUpload: React.FC<InvoiceUploadProps> = ({ onInvoiceProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const parseInvoiceText = (text: string): Invoice => {
    // Simple regex-based parsing for MVP
    const vendorMatch = text.match(/(?:from|vendor|company)[:\s]+([^\n\r]+)/i);
    const invoiceNoMatch = text.match(/(?:invoice|inv|#)[:\s#]*([A-Z0-9\-]+)/i);
    const dateMatch = text.match(/(?:date|dated)[:\s]+([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{4})/i);
    const totalMatch = text.match(/(?:total|amount|sum)[:\s]*\$?([0-9,]+\.?[0-9]*)/i);
    const currencyMatch = text.match(/\$|USD|EUR|GBP/) || ['$'];

    // Extract line items
    const lineItems: any[] = [];
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      const amountMatch = line.match(/\$?([0-9,]+\.?[0-9]+)/);
      if (amountMatch && line.length > 10 && !line.toLowerCase().includes('total')) {
        lineItems.push({
          id: `item-${index}`,
          invoiceId: '',
          description: line.replace(/\$?[0-9,]+\.?[0-9]+/, '').trim(),
          amount: parseFloat(amountMatch[1].replace(',', ''))
        });
      }
    });

    return {
      id: `inv-${Date.now()}`,
      vendor: vendorMatch ? vendorMatch[1].trim() : 'Unknown Vendor',
      invoiceNo: invoiceNoMatch ? invoiceNoMatch[1] : `INV-${Date.now()}`,
      date: dateMatch ? new Date(dateMatch[1]).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      currency: currencyMatch[0] === '$' ? 'USD' : 'USD',
      total: totalMatch ? parseFloat(totalMatch[1].replace(',', '')) : lineItems.reduce((sum, item) => sum + item.amount, 0),
      rawText: text,
      lineItems,
      createdAt: new Date().toISOString()
    };
  };

  const processInvoice = async (text: string) => {
    setIsProcessing(true);
    setResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const parsedInvoice = parseInvoiceText(text);
      onInvoiceProcessed(parsedInvoice);
      
      setResult({
        success: true,
        message: `Successfully parsed invoice from ${parsedInvoice.vendor}`
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to process invoice. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          processInvoice(text);
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        processInvoice(text);
      };
      reader.readAsText(file);
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('invoiceText') as string;
    if (text.trim()) {
      processInvoice(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Upload Invoice</h2>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader className="h-12 w-12 text-blue-400 animate-spin mb-4" />
            <p className="text-gray-300">Processing invoice...</p>
          </div>
        ) : (
          <>
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your invoice text file here
            </h3>
            <p className="text-gray-400 mb-4">
              or click to browse (.txt files only for MVP)
            </p>
            <input
              type="file"
              onChange={handleFileInput}
              accept=".txt,text/plain"
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              Choose File
            </label>
          </>
        )}
      </div>

      {/* Manual Text Input */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Or paste invoice text</h3>
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <textarea
            name="invoiceText"
            placeholder="Paste your invoice text here..."
            className="w-full h-32 p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Process Invoice'}
          </button>
        </form>
      </div>

      {/* Result Message */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
            result.success
              ? 'bg-green-900/30 border border-green-700'
              : 'bg-red-900/30 border border-red-700'
          }`}
        >
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400" />
          )}
          <p className={result.success ? 'text-green-300' : 'text-red-300'}>
            {result.message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InvoiceUpload;