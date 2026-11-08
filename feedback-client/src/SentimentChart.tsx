import React from 'react';

interface SentimentChartProps {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({
  positive,
  neutral,
  negative,
  total,
}) => {
  if (total === 0) {
    return <div style={{ color: '#888', marginTop: '10px' }}>No reviews yet to display chart.</div>;
  }

  const posPct = ((positive / total) * 100).toFixed(1);
  const neuPct = ((neutral / total) * 100).toFixed(1);
  const negPct = ((negative / total) * 100).toFixed(1);

  return (
    <div style={{ marginTop: '15px' }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#444' }}>Sentiment Distribution</h4>
      
      {/* Visual Multi-Segment Progress Bar */}
      <div
        style={{
          display: 'flex',
          height: '20px',
          width: '100%',
          backgroundColor: '#e9ecef',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '15px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {positive > 0 && (
          <div
            title={`Positive: ${posPct}%`}
            style={{
              width: `${posPct}%`,
              backgroundColor: '#28a745',
              transition: 'width 0.5s ease-in-out'
            }}
          />
        )}
        {neutral > 0 && (
          <div
            title={`Neutral: ${neuPct}%`}
            style={{
              width: `${neuPct}%`,
              backgroundColor: '#ffc107',
              transition: 'width 0.5s ease-in-out'
            }}
          />
        )}
        {negative > 0 && (
          <div
            title={`Negative: ${negPct}%`}
            style={{
              width: `${negPct}%`,
              backgroundColor: '#dc3545',
              transition: 'width 0.5s ease-in-out'
            }}
          />
        )}
      </div>

      {/* Badges showing Percentages Only */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 500, flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28a745' }} />
          <span>Positive: <strong>{posPct}%</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffc107' }} />
          <span>Neutral: <strong>{neuPct}%</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#dc3545' }} />
          <span>Negative: <strong>{negPct}%</strong></span>
        </div>
      </div>
    </div>
  );
};