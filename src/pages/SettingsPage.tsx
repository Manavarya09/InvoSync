import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  Bell, 
  Shield, 
  Download,
  Moon,
  Sun,
  Save,
  Trash2,
  Crown,
  Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    invoiceProcessed: true,
    monthlyReport: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Download }
  ];

  const handleSaveProfile = () => {
    // Mock save functionality
    alert('Profile updated successfully!');
  };

  const handleUpgradePlan = () => {
    // Mock upgrade functionality
    alert('Redirecting to Stripe checkout...');
  };

  const handleExportData = (format: string) => {
    // Mock export functionality
    alert(`Exporting data as ${format}...`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="pt-24 px-6 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Settings
            </h1>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 sticky top-24">
                  <nav className="space-y-2">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="text"
                              defaultValue={user?.name}
                              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="email"
                              defaultValue={user?.email}
                              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Theme Preference
                        </label>
                        <button
                          onClick={toggleTheme}
                          className="flex items-center space-x-3 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          {isDarkMode ? <Moon className="h-5 w-5 text-blue-400" /> : <Sun className="h-5 w-5 text-orange-400" />}
                          <span className="text-white">
                            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                          </span>
                        </button>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          <Save className="h-5 w-5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'billing' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Current Plan */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                      <h2 className="text-2xl font-bold text-white mb-6">Current Plan</h2>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          {user?.plan === 'pro' ? (
                            <Crown className="h-8 w-8 text-yellow-400" />
                          ) : (
                            <Zap className="h-8 w-8 text-blue-400" />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-white capitalize">
                              {user?.plan} Plan
                            </h3>
                            <p className="text-gray-400">
                              {user?.plan === 'pro' 
                                ? 'Unlimited invoices with advanced features'
                                : '10 invoices per month'
                              }
                            </p>
                          </div>
                        </div>
                        
                        {user?.plan === 'free' && (
                          <button
                            onClick={handleUpgradePlan}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all"
                          >
                            Upgrade to Pro
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Usage This Month */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                      <h2 className="text-xl font-bold text-white mb-4">Usage This Month</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Invoices Processed</span>
                            <span className="text-white font-semibold">
                              {user?.plan === 'pro' ? '∞' : '7 / 10'}
                            </span>
                          </div>
                          {user?.plan === 'free' && (
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }} />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                          <p className="text-blue-300 text-sm">
                            {user?.plan === 'free' 
                              ? 'You have 3 invoices remaining this month. Upgrade to Pro for unlimited processing.'
                              : 'You have unlimited invoice processing with your Pro plan.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Billing History */}
                    {user?.plan === 'pro' && (
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Billing History</h2>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                            <div>
                              <p className="text-white font-medium">Pro Plan - January 2025</p>
                              <p className="text-gray-400 text-sm">Paid on Jan 1, 2025</p>
                            </div>
                            <span className="text-green-400 font-semibold">$29.00</span>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                            <div>
                              <p className="text-white font-medium">Pro Plan - December 2024</p>
                              <p className="text-gray-400 text-sm">Paid on Dec 1, 2024</p>
                            </div>
                            <span className="text-green-400 font-semibold">$29.00</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      {Object.entries({
                        email: 'Email Notifications',
                        push: 'Push Notifications',
                        invoiceProcessed: 'Invoice Processing Complete',
                        monthlyReport: 'Monthly Expense Report'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-medium">{label}</h3>
                            <p className="text-gray-400 text-sm">
                              {key === 'email' && 'Receive notifications via email'}
                              {key === 'push' && 'Receive browser push notifications'}
                              {key === 'invoiceProcessed' && 'Get notified when invoice parsing is complete'}
                              {key === 'monthlyReport' && 'Receive monthly expense summaries'}
                            </p>
                          </div>
                          
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                [key]: e.target.checked
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                          </div>
                          
                          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold text-white mb-4 text-red-400">Danger Zone</h3>
                        
                        <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Delete Account</h4>
                          <p className="text-red-300 text-sm mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                            <Trash2 className="h-5 w-5" />
                            <span>Delete Account</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'data' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Data & Export</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Export Your Data</h3>
                        <p className="text-gray-400 mb-6">
                          Download your invoice data in various formats for backup or integration with other tools.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <button
                            onClick={() => handleExportData('JSON')}
                            className="p-4 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-center transition-colors group"
                          >
                            <Download className="h-8 w-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-white font-medium">JSON</h4>
                            <p className="text-gray-400 text-sm">Structured data format</p>
                          </button>
                          
                          <button
                            onClick={() => handleExportData('CSV')}
                            className="p-4 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-center transition-colors group"
                          >
                            <Download className="h-8 w-8 text-teal-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-white font-medium">CSV</h4>
                            <p className="text-gray-400 text-sm">Spreadsheet compatible</p>
                          </button>
                          
                          <button
                            onClick={() => handleExportData('Excel')}
                            className="p-4 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-center transition-colors group"
                          >
                            <Download className="h-8 w-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-white font-medium">Excel</h4>
                            <p className="text-gray-400 text-sm">Excel workbook format</p>
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Data Usage</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-4 bg-gray-700/30 rounded-lg">
                            <h4 className="text-white font-medium mb-2">Storage Used</h4>
                            <p className="text-2xl font-bold text-blue-400">2.4 MB</p>
                            <p className="text-gray-400 text-sm">of unlimited storage</p>
                          </div>
                          
                          <div className="p-4 bg-gray-700/30 rounded-lg">
                            <h4 className="text-white font-medium mb-2">Last Export</h4>
                            <p className="text-white">Never</p>
                            <p className="text-gray-400 text-sm">No exports yet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;