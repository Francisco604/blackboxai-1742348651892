import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  CalculatorIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Resume Analysis',
    description: 'Analyze resumes, generate summaries, and get keyword suggestions for job applications.',
    icon: DocumentTextIcon,
    href: '/resume',
    color: 'bg-blue-500',
  },
  {
    name: 'Budget Generator',
    description: 'Create detailed budgets with automatic calculations based on your inputs.',
    icon: CalculatorIcon,
    href: '/budget',
    color: 'bg-green-500',
  },
  {
    name: 'Document Creator',
    description: 'Create professional documents and presentations using customizable templates.',
    icon: DocumentDuplicateIcon,
    href: '/document',
    color: 'bg-purple-500',
  },
  {
    name: 'Task Management',
    description: 'Organize and track your projects and tasks efficiently.',
    icon: ClipboardDocumentListIcon,
    href: '/tasks',
    color: 'bg-yellow-500',
  },
  {
    name: 'Sentiment Analysis',
    description: 'Analyze the tone and sentiment of text content.',
    icon: ChatBubbleBottomCenterTextIcon,
    href: '/sentiment',
    color: 'bg-red-500',
  },
  {
    name: 'OCR Tool',
    description: 'Convert images and scanned documents into editable text.',
    icon: DocumentMagnifyingGlassIcon,
    href: '/ocr',
    color: 'bg-indigo-500',
  },
  {
    name: 'Chatbot Assistant',
    description: 'Get instant help and answers to your questions.',
    icon: ChatBubbleLeftRightIcon,
    href: '/chatbot',
    color: 'bg-pink-500',
  },
  {
    name: 'Social Media Manager',
    description: 'Create and schedule posts for your social media accounts.',
    icon: ShareIcon,
    href: '/social',
    color: 'bg-orange-500',
  },
];

const Home = () => {
  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TaskMaster
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your all-in-one platform for automating tasks, managing documents, and boosting productivity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.href}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className={`${feature.color} rounded-lg p-3 inline-block`}>
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="text-gray-600 mb-8">
          Start using our tools today and experience the difference.
        </p>
        <Link
          to="/resume"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Get Started
        </Link>
      </div>

      {/* Benefits Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose TaskMaster?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
            <p className="text-gray-600">Get more done in less time with our automated tools.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is protected with enterprise-grade security.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h3>
            <p className="text-gray-600">Intuitive interface designed for users of all skill levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
