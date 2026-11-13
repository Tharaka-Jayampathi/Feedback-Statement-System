import React, { useState, useEffect } from 'react';
import { submitFeedback, getFeedbacksByProduct, getProductSummary } from './api';
import { FeedbackResponse, SentimentSummary } from './types';
import { SentimentChart } from './SentimentChart';

function App() {
  const [productId, setProductId] = useState<number>(101);
  const [customerName, setCustomerName] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [summary, setSummary] = useState<SentimentSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadProductData = async (id: number) => {
    try {
      const [feedbackData, summaryData] = await Promise.all([
        getFeedbacksByProduct(id),
        getProductSummary(id),
      ]);
      setFeedbacks(feedbackData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadProductData(productId);
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    setLoading(true);
    try {
      await submitFeedback({ productId, customerName, comment });
      setCustomerName('');
      setComment('');
      await loadProductData(productId);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const styles: { [key: string]: { bg: string; text: string } } = {
      POSITIVE: { bg: '#d4edda', text: '#155724' },
      NEUTRAL: { bg: '#fff3cd', text: '#856404' },
      NEGATIVE: { bg: '#f8d7da', text: '#721c24' },
    };
    const current = styles[sentiment.toUpperCase()] || { bg: '#e2e3e5', text: '#383d41' };
    return (
      <span style={{ backgroundColor: current.bg, color: current.text, padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
        {sentiment}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      {/* Centered & Highlighted Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            fontSize: '12px',
            fontWeight: 700,
            padding: '4px 14px',
            borderRadius: '20px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: '10px',
            border: '1px solid #bfdbfe',
          }}
        >
          ✨ AI-Powered NLP Analytics
        </span>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            margin: '0 0 8px 0',
            color: '#0f172a',
            letterSpacing: '-0.5px',
          }}
        >
          Customer Feedback & AI Sentiment Dashboard
        </h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>
          Real-time customer review intelligence and sentiment classification
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        {/* Submission Form */}
        <div className="card" style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Submit Feedback</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Product ID: </label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Your Name: </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box' }}
                placeholder="Kamal Perera"
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Feedback / Review: </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '4px', height: '80px', boxSizing: 'border-box' }}
                placeholder="Share your thoughts..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {loading ? 'Analyzing...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Analytics Summary */}
        <div className="card" style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Sentiment Summary (Product {productId})</h3>
          {summary ? (
            <div>
              <p style={{ margin: '8px 0' }}>Total Reviews: <strong>{summary.totalFeedbacks}</strong></p>

              {/* Visual Distribution Chart & Percentages */}
              <SentimentChart
                positive={summary.positiveCount}
                neutral={summary.neutralCount}
                negative={summary.negativeCount}
                total={summary.totalFeedbacks}
              />

              {/* Average Compound Score */}
              <p style={{ marginTop: '16px', marginBottom: '8px' }}>
                Average Compound Score: <strong>{summary.averageSentimentScore.toFixed(3)}</strong>
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '14px 0' }} />

              {/* Comments Counts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <p style={{ margin: 0 }}>
                  Positive Comments: <strong style={{ color: '#28a745' }}>{summary.positiveCount}</strong>
                </p>
                <p style={{ margin: 0 }}>
                  Neutral Comments: <strong style={{ color: '#ffc107' }}>{summary.neutralCount}</strong>
                </p>
                <p style={{ margin: 0 }}>
                  Negative Comments: <strong style={{ color: '#dc3545' }}>{summary.negativeCount}</strong>
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: '#888' }}>Loading summary...</p>
          )}
        </div>
      </div>

      {/* Feedback Feed */}
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Recent Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p>No feedback found for Product {productId}.</p>
        ) : (
          feedbacks.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{item.customerName}</strong>
                {getSentimentBadge(item.sentiment)}
              </div>
              <p style={{ margin: '4px 0', color: '#444' }}>{item.comment}</p>
              <small style={{ color: '#888' }}>
                Compound Score: {item.compoundScore} | {new Date(item.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;