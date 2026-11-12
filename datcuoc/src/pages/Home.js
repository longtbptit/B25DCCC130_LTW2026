import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  // Em bổ sung đoạn này để tìm kỉ lục cao nhất
  const topRecord =
    history.length > 0
      ? history.reduce((best, cur) => (cur.finalScore > best.finalScore ? cur : best), history[0])
      : null;

  return (
    <div>
      <h2>Đặt cược kiến thức</h2>
      <p>
        Bạn bắt đầu với 1.000 điểm và vượt qua 12 câu hỏi. Trước mỗi câu hãy đặt cược từ 100 đến 500 điểm. Trả lời đúng được thưởng theo hệ số độ khó, sai hoặc hết giờ (25s) sẽ mất tiền cược. Dưới 100 điểm sẽ cháy túi!
      </p>

      {topRecord && (
        <p style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: '16px', marginTop: '12px' }}>
          {`Kỷ lục: ${formatScore(topRecord.finalScore)} – ${topRecord.name}`}
        </p>
      )}

      <form onSubmit={handleStart} style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Tên người chơi:
        </label>
        <input
          type="text"
          placeholder="Nhập tên của bạn..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: '8px 12px', width: '250px', marginRight: '10px' }}
        />
        <button
          type="submit"
          disabled={!playerName.trim()}
          style={{
            padding: '8px 16px',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Vào chơi
        </button>
      </form>
    </div>
  );
};

export default Home;