import { useState } from 'react';
import { formatScore } from '../data';

const History = ({ history, onClearHistory }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('Tất cả');

  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử các lượt chơi</h2>
        <p>Chưa có lượt chơi nào.</p>
      </div>
    );
  }

  // Danh sách tên người chơi không trùng lặp
  const uniquePlayers = ['Tất cả', ...new Set(history.map((item) => item.name))];

  // Lọc theo người chơi được chọn
  const filteredHistory =
    selectedPlayer === 'Tất cả'
      ? history
      : history.filter((item) => item.name === selectedPlayer);

  // Sắp xếp giảm dần theo điểm cuối trên bản sao mảng
  const sortedHistory = [...filteredHistory].sort((a, b) => b.finalScore - a.finalScore);

  // Thống kê theo danh sách đang hiển thị
  const totalGames = sortedHistory.length;
  const highestScore = sortedHistory.reduce(
    (max, item) => (item.finalScore > max ? item.finalScore : max),
    0
  );
  const bankruptCount = sortedHistory.filter((item) => item.result === 'Cháy túi').length;

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Người chơi:</label>
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            style={{ padding: '6px 10px' }}
          >
            {uniquePlayers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onClearHistory}
          style={{ padding: '6px 14px', backgroundColor: '#c62828', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Xóa lịch sử
        </button>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '24px', fontWeight: 'bold' }}>
        <span>{`Số lượt chơi: ${totalGames}`}</span>
        <span>{`Điểm cao nhất: ${formatScore(highestScore)}`}</span>
        <span>{`Số lần cháy túi: ${bankruptCount}`}</span>
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm cuối</th>
            <th>Đánh giá</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{`${item.correctCount}/${item.played}`}</td>
              <td>{formatScore(item.finalScore)}</td>
              <td>{item.result}</td>
              <td>{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;