import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div>
      <h2>Đặt cược kiến thức</h2>
      <p>
        Bạn bắt đầu với 1.000 điểm và vượt qua 12 câu hỏi. Trước mỗi câu hãy đặt cược từ 100 đến 500 điểm. Trả lời đúng được thưởng theo hệ số độ khó, sai hoặc hết giờ (25s) sẽ mất tiền cược. Dưới 100 điểm sẽ cháy túi!
      </p>

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