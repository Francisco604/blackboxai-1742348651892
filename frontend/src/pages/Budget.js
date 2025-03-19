import React, { useState } from 'react';
import { CurrencyDollarIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Budget = () => {
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0 }
  ]);
  const [laborCost, setLaborCost] = useState(0);
  const [hoursRequired, setHoursRequired] = useState(0);
  const [taxRate, setTaxRate] = useState(10);

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateLaborCost = () => {
    return laborCost * hoursRequired;
  };

  const calculateTax = (subtotal) => {
    return (subtotal * taxRate) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const labor = calculateLaborCost();
    const tax = calculateTax(subtotal + labor);
    return subtotal + labor + tax;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budget Generator</h1>
        <p className="mt-2 text-gray-600">
          Create detailed budgets with automatic calculations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        {/* Materials and Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Materials and Services</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Description"
                    className="input-field"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    placeholder="Qty"
                    className="input-field"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="w-32">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Price"
                      className="input-field pl-7"
                      value={item.unitPrice}
                      min="0"
                      step="0.01"
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>

        {/* Labor Costs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Labor Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  className="input-field pl-7"
                  value={laborCost}
                  min="0"
                  step="0.01"
                  onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours Required
              </label>
              <input
                type="number"
                className="input-field"
                value={hoursRequired}
                min="0"
                step="0.5"
                onChange={(e) => setHoursRequired(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Tax Rate */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tax Rate</h2>
          <div className="w-32">
            <div className="relative">
              <input
                type="number"
                className="input-field pr-8"
                value={taxRate}
                min="0"
                max="100"
                step="0.1"
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Materials and Services Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Labor Cost:</span>
              <span>${calculateLaborCost().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax ({taxRate}%):</span>
              <span>${calculateTax(calculateSubtotal() + calculateLaborCost()).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <CurrencyDollarIcon className="h-5 w-5 mr-2" />
          Generate PDF
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Save as Template
        </button>
      </div>
    </div>
  );
};

export default Budget;
