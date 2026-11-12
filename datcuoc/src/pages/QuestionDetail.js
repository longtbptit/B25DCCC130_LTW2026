import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, LETTERS, formatMultiplier } from '../data';

const QuestionDetail = ({ questions, bookmarks, toggleBookmark }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(question.id);

  return (
    <div>
      <h2>
        {`Câu hỏi số ${question.id} – ${question.topic} · ${LEVELS[question.level]} (${formatMultiplier(MULTIPLIERS[question.level])})`}
      </h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {question.options.map((opt, index) => {
          const isCorrect = index === question.answer;
          return (
            <div
              key={index}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: isCorrect ? '#c8e6c9' : '#ffffff',
                fontWeight: isCorrect ? 'bold' : 'normal',
              }}
            >
              {`${LETTERS[index]}. ${opt}`} {isCorrect && '(Đáp án đúng)'}
            </div>
          );
        })}
      </div>

      <p style={{ fontStyle: 'italic', color: '#555' }}>{`Gợi ý: ${question.hint}`}</p>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button onClick={() => toggleBookmark(question.id)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        </button>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;