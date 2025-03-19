import React, { useState } from 'react';
import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  PhotoIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const OCR = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('original'); // 'original' or 'text'

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      processImage();
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    // Simulated OCR processing
    setTimeout(() => {
      setResult({
        text: "Sample extracted text from the image.\nThis would be the actual text extracted from the uploaded image using OCR technology.\nIt maintains the original formatting and structure.",
        confidence: 95,
        language: 'English',
        wordCount: 24,
        processingTime: '2.3 seconds'
      });
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      // You could add a toast notification here
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">OCR Tool</h1>
        <p className="mt-2 text-gray-600">
          Convert images and scanned documents into editable text
        </p>
      </div>

      {/* Upload Section */}
      {!file && (
        <div className="max-w-xl mx-auto mb-8">
          <label
            htmlFor="file-upload"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
          >
            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Upload an image or document
            </span>
            <span className="mt-2 block text-sm text-gray-500">
              PNG, JPG, PDF up to 10MB
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      {/* Processing View */}
      {file && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'original'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('original')}
              >
                <PhotoIcon className="h-5 w-5 inline mr-2" />
                Original Image
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'text'
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('text')}
              >
                <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                Extracted Text
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'original' && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                {isProcessing ? (
                  <div className="flex items-center justify-center py-12">
                    <ArrowPathIcon className="h-8 w-8 text-primary-500 animate-spin" />
                    <span className="ml-3 text-gray-600">Processing image...</span>
                  </div>
                ) : (
                  result && (
                    <div>
                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Confidence</div>
                          <div className="text-xl font-semibold text-gray-900">
                            {result.confidence}%
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Language</div>
                          <div className="text-xl font-semibold text-gray-900">
                            {result.language}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Word Count</div>
                          <div className="text-xl font-semibold text-gray-900">
                            {result.wordCount}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Processing Time</div>
                          <div className="text-xl font-semibold text-gray-900">
                            {result.processingTime}
                          </div>
                        </div>
                      </div>

                      {/* Extracted Text */}
                      <div className="relative">
                        <pre className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap font-mono text-sm">
                          {result.text}
                        </pre>
                        <div className="absolute top-2 right-2 space-x-2">
                          <button
                            onClick={copyToClipboard}
                            className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-md shadow-sm"
                            title="Copy to clipboard"
                          >
                            <ClipboardDocumentIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-md shadow-sm"
                            title="Download text file"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setResult(null);
                }}
                className="btn-secondary"
              >
                Upload New Image
              </button>
              {!isProcessing && result && (
                <button className="btn-primary">
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download Results
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCR;
