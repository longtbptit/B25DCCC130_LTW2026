import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { formatScore } from '../data';
import { getResult } from '../utils';
import ScoreChart from '../components/ScoreChart';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, rounds, finalScore, correctCount, reason } = location.state;

  return (
    <div>
      <h2>{reason}</h2>
      <p>{`Người chơi: ${playerName}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}/${rounds.length}`}</p>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
        {`Điểm cuối: ${formatScore(finalScore)}`}
      </p>
      <p style={{ fontWeight: 'bold', color: '#1b5e20' }}>
        {`Đánh giá: ${getResult(finalScore)}`}
      </p>

      <ScoreChart rounds={rounds} />

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Chơi lại
        </button>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;