import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Budget from './pages/Budget';
import Document from './pages/Document';
import TaskManagement from './pages/TaskManagement';
import SentimentAnalysis from './pages/SentimentAnalysis';
import OCR from './pages/OCR';
import Chatbot from './pages/Chatbot';
import SocialMedia from './pages/SocialMedia';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/document" element={<Document />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/sentiment" element={<SentimentAnalysis />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/social" element={<SocialMedia />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
