import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Invoice } from '../types';
import * as THREE from 'three';

interface ExpenseChartsProps {
  invoices: Invoice[];
}

// 3D Bar Component for Three.js
const Bar3D: React.FC<{ position: [number, number, number]; height: number; color: string; label: string }> = ({ position, height, color, label }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color={color} />
        <Text
          position={[0, height / 2 + 0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
};

const ExpenseCharts: React.FC<ExpenseChartsProps> = ({ invoices }) => {
  const { vendorData, monthlyData, totalExpenses } = useMemo(() => {
    const vendorTotals = invoices.reduce((acc, invoice) => {
      acc[invoice.vendor] = (acc[invoice.vendor] || 0) + invoice.total;
      return acc;
    }, {} as Record<string, number>);

    const vendorData = Object.entries(vendorTotals)
      .map(([vendor, total]) => ({ name: vendor, value: total }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    const monthlyTotals = invoices.reduce((acc, invoice) => {
      const month = new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + invoice.total;
      return acc;
    }, {} as Record<string, number>);

    const monthlyData = Object.entries(monthlyTotals)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    const totalExpenses = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

    return { vendorData, monthlyData, totalExpenses };
  }, [invoices]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];

  const top5Vendors = vendorData.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        Expense Analytics
      </h2>

      {/* 3D Bar Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Top 5 Vendors (3D View)</h3>
        <div className="h-96 w-full">
          <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {top5Vendors.map((vendor, index) => (
              <Bar3D
                key={vendor.name}
                position={[(index - 2) * 2, vendor.value / 1000, 0]}
                height={vendor.value / 500}
                color={COLORS[index]}
                label={`$${vendor.value.toFixed(0)}`}
              />
            ))}
            
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              maxPolarAngle={Math.PI / 2}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {top5Vendors.map((vendor, index) => (
            <div key={vendor.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-gray-300">{vendor.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Vendor Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Expenses by Vendor</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vendorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                  labelStyle={{ color: '#ffffff' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Monthly Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
                  labelStyle={{ color: '#ffffff' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Vendor Bar Chart */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Vendor Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
                labelStyle={{ color: '#ffffff' }}
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value">
                {vendorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6">
          <h4 className="text-blue-100 text-sm font-medium mb-2">Total Expenses</h4>
          <p className="text-white text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6">
          <h4 className="text-teal-100 text-sm font-medium mb-2">Average Invoice</h4>
          <p className="text-white text-2xl font-bold">
            ${invoices.length ? (totalExpenses / invoices.length).toFixed(2) : '0.00'}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6">
          <h4 className="text-orange-100 text-sm font-medium mb-2">Largest Invoice</h4>
          <p className="text-white text-2xl font-bold">
            ${Math.max(...invoices.map(inv => inv.total), 0).toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6">
          <h4 className="text-purple-100 text-sm font-medium mb-2">Top Vendor</h4>
          <p className="text-white text-lg font-bold">
            {vendorData.length ? vendorData[0].name : 'N/A'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseCharts;