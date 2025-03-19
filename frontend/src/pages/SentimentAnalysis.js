import React, { useState } from 'react';
import {
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeSentiment = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    // Simulated API call
    setTimeout(() => {
      setAnalysis({
        sentiment: 'positive',
        score: 0.85,
        emotions: {
          joy: 0.65,
          sadness: 0.05,
          anger: 0.02,
          fear: 0.03,
          surprise: 0.15,
          neutral: 0.10
        },
        keywords: [
          { text: 'excellent', sentiment: 'positive', score: 0.9 },
          { text: 'helpful', sentiment: 'positive', score: 0.8 },
          { text: 'professional', sentiment: 'positive', score: 0.85 }
        ],
        suggestions: [
          'Consider adding more specific details to strengthen positive points',
          'The tone is professional and appropriate for business communication',
          'Good balance of objective and subjective statements'
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: 'bg-yellow-500',
      sadness: 'bg-blue-500',
      anger: 'bg-red-500',
      fear: 'bg-purple-500',
      surprise: 'bg-green-500',
      neutral: 'bg-gray-500'
    };
    return colors[emotion] || 'bg-gray-500';
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis</h1>
        <p className="mt-2 text-gray-600">
          Analyze the emotional tone and sentiment of your text
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-4">
          <textarea
            className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your text here for analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {text.length} characters
          </div>
          <button
            className="btn-primary"
            onClick={analyzeSentiment}
            disabled={isAnalyzing || !text.trim()}
          >
            {isAnalyzing ? (
              <>
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analyze Sentiment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Sentiment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Overall Sentiment
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
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
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray={`${analysis.score * 100}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {(analysis.score * 100).toFixed(0)}%
                    </div>
                    <div className={`text-sm font-medium capitalize px-2 py-1 rounded-full ${getSentimentColor(analysis.sentiment)}`}>
                      {analysis.sentiment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emotional Analysis */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Emotional Analysis
            </h2>
            <div className="space-y-4">
              {Object.entries(analysis.emotions).map(([emotion, score]) => (
                <div key={emotion} className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {emotion}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {(score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getEmotionColor(emotion)} h-2 rounded-full`}
                      style={{ width: `${score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Phrases */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Key Phrases
            </h2>
            <div className="space-y-3">
              {analysis.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-700">{keyword.text}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(keyword.sentiment)}`}>
                    {(keyword.score * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Suggestions
            </h2>
            <ul className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <DocumentTextIcon className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
