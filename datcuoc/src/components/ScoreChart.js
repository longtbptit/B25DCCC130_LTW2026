const ScoreChart = ({ rounds }) => {
  const maxScore = Math.max(...rounds.map((r) => r.scoreAfter), 1);

  return (
    <div style={{ marginTop: '24px', marginBottom: '24px' }}>
      <h4>Biểu đồ biến động điểm</h4>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '16px',
          height: '250px',
          padding: '20px 10px 0 10px',
          borderBottom: '2px solid #333',
        }}
      >
        {rounds.map((r, idx) => {
          const barHeight = Math.round((r.scoreAfter / maxScore) * 200);
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '45px',
              }}
            >
              <span style={{ fontSize: '12px', marginBottom: '4px' }}>
                {r.scoreAfter.toLocaleString('vi-VN')}
              </span>
              <div
                style={{
                  width: '100%',
                  height: `${barHeight}px`,
                  backgroundColor: r.correct ? '#2e7d32' : '#c62828',
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: '12px', marginTop: '6px' }}>{`C${idx + 1}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreChart;