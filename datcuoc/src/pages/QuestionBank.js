import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';

const QuestionBank = ({ questions, bookmarks, toggleBookmark }) => {
  const [selectedLevels, setSelectedLevels] = useState([1, 2, 3]);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleLevelChange = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((item) => item !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  // Tên hàm bắt buộc theo yêu cầu đề bài
  const handleLookupShift = (e) => {
    setSearchText(e.target.value);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchLevel = selectedLevels.includes(q.level);
    const matchBookmark = !onlyBookmarked || bookmarks.includes(q.id);
    const matchSearch = q.question.toLowerCase().includes(searchText.toLowerCase());
    return matchLevel && matchBookmark && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
        <div>
          <strong>Mức độ: </strong>
          {[1, 2, 3].map((lvl) => (
            <label key={lvl} style={{ marginRight: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedLevels.includes(lvl)}
                onChange={() => handleLevelChange(lvl)}
              />{' '}
              {LEVELS[lvl]}
            </label>
          ))}
        </div>

        <label style={{ cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={onlyBookmarked}
            onChange={(e) => setOnlyBookmarked(e.target.checked)}
          />{' '}
          Chỉ hiện câu đã đánh dấu
        </label>

        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          value={searchText}
          onChange={handleLookupShift}
          style={{ padding: '6px 10px', width: '240px' }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <p style={{ margin: '4px 0' }}>Có {filteredQuestions.length} câu hỏi</p>
        <p style={{ margin: '4px 0' }}>Đã đánh dấu: {bookmarks.length} câu</p>
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Hệ số</th>
            <th>Câu hỏi</th>
            <th style={{ textAlign: 'center' }}>Đánh dấu</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => {
            const isBookmarked = bookmarks.includes(q.id);
            return (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{q.topic}</td>
                <td>{LEVELS[q.level]}</td>
                <td>{formatMultiplier(MULTIPLIERS[q.level])}</td>
                <td>
                  <Link to={`/questions/${q.id}`} style={{ textDecoration: 'none', color: '#0d47a1' }}>
                    {q.question}
                  </Link>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: isBookmarked ? '#f57f17' : '#757575' }}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;