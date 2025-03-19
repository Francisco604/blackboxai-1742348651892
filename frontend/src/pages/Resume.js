import React, { useState } from 'react';
import { DocumentArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // In a real application, you would upload the file to the server here
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    // Simulated API call delay
    setTimeout(() => {
      setAnalysis({
        summary: "Experienced software developer with 5 years of experience in web development. Strong background in React, Node.js, and cloud technologies. Led multiple successful projects and improved team productivity by 30%.",
        keywords: ["React", "Node.js", "Cloud Computing", "Team Leadership", "Agile", "JavaScript"],
        suggestions: [
          "Add more quantifiable achievements",
          "Include specific project outcomes",
          "Highlight leadership experience more prominently",
          "Add relevant certifications"
        ],
        score: 85
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
        <p className="mt-2 text-gray-600">
          Upload your resume to get insights, suggestions, and keyword analysis
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="max-w-xl mx-auto">
          <label
            htmlFor="file-upload"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
          >
            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Upload your resume
            </span>
            <span className="mt-2 block text-sm text-gray-500">
              PDF, DOC, or DOCX up to 10MB
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {/* Analysis Results */}
      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your resume...</p>
        </div>
      )}

      {analysis && !isAnalyzing && (
        <div className="space-y-8">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-600">{analysis.summary}</p>
          </div>

          {/* Score */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Score</h2>
            <div className="flex items-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeDasharray={`${analysis.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{analysis.score}</span>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-sm text-gray-500">
                  Your resume score is based on content quality, formatting, and keyword optimization
                </p>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Skills & Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Improvement Suggestions</h2>
            <ul className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-primary-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="ml-2 text-gray-600">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Export Options */}
          <div className="flex justify-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Export Analysis Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
