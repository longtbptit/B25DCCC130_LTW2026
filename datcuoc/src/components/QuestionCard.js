import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ index, total, question, status, selectedOption, onSelect }) => {
  return (
    <div>
      <h3>
        {`Câu ${index + 1}/${total} – ${question.topic} · ${LEVELS[question.level]} (${formatMultiplier(MULTIPLIERS[question.level])})`}
      </h3>
      <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '16px 0' }}>
        {question.question}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {question.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            option={opt}
            status={status}
            selectedOption={selectedOption}
            correctOption={question.answer}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;