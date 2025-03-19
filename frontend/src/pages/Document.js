import React, { useState } from 'react';
import {
  DocumentIcon,
  DocumentDuplicateIcon,
  PresentationChartBarIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const templates = [
  {
    id: 1,
    name: 'Business Proposal',
    icon: DocumentIcon,
    category: 'document',
    description: 'Professional template for business proposals with sections for executive summary, objectives, and pricing.',
  },
  {
    id: 2,
    name: 'Project Report',
    icon: DocumentTextIcon,
    category: 'document',
    description: 'Comprehensive project report template with progress tracking and milestone sections.',
  },
  {
    id: 3,
    name: 'Sales Pitch Deck',
    icon: PresentationChartBarIcon,
    category: 'presentation',
    description: 'Engaging presentation template for sales pitches with modern design elements.',
  },
  {
    id: 4,
    name: 'Marketing Plan',
    icon: DocumentDuplicateIcon,
    category: 'document',
    description: 'Detailed marketing plan template with sections for strategy, budget, and timeline.',
  },
];

const Document = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // In a real application, this would load the template content
    setContent('Template content would be loaded here...');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Document Creator</h1>
        <p className="mt-2 text-gray-600">
          Create professional documents and presentations using our templates
        </p>
      </div>

      {!selectedTemplate ? (
        // Template Selection View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <template.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-4">
                  {template.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Document Editor View
        <div className="bg-white rounded-lg shadow-lg">
          {/* Toolbar */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Templates
                </button>
                <span className="text-gray-300">|</span>
                <input
                  type="text"
                  placeholder="Document Title"
                  className="border-none focus:ring-0 text-lg font-semibold text-gray-900 placeholder-gray-400"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary">
                  Preview
                </button>
                <button className="btn-primary">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Editor Tools */}
          <div className="border-b border-gray-200 px-6 py-2">
            <div className="flex items-center space-x-4">
              {/* Font Style */}
              <select className="input-field py-1">
                <option>Normal Text</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>

              {/* Font Size */}
              <select className="input-field py-1">
                <option>12</option>
                <option>14</option>
                <option>16</option>
                <option>18</option>
                <option>20</option>
                <option>24</option>
              </select>

              {/* Text Formatting */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-bold"></i>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-italic"></i>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-underline"></i>
                </button>
              </div>

              {/* Alignment */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-align-left"></i>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-align-center"></i>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-align-right"></i>
                </button>
              </div>

              {/* Lists */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-list-ul"></i>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <i className="fas fa-list-ol"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <textarea
                className="w-full min-h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your document content..."
              />
            </div>
          </div>

          {/* AI Assistant */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-primary-600"></i>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">AI Writing Assistant</h3>
                <p className="text-sm text-gray-500">
                  Need help? I can assist with grammar, style suggestions, and content improvements.
                </p>
              </div>
              <button className="btn-secondary text-sm">
                Get Suggestions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Document;
