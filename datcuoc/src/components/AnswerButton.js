import { LETTERS } from '../data';

const AnswerButton = ({ index, option, status, selectedOption, correctOption, onSelect }) => {
  let bgColor = '#ffffff';
  let textColor = '#000000';

  if (status === 'revealed') {
    if (index === correctOption) {
      bgColor = '#2e7d32'; // Xanh lá
      textColor = '#ffffff';
    } else if (index === selectedOption) {
      bgColor = '#c62828'; // Đỏ
      textColor = '#ffffff';
    }
  }

  return (
    <button
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
      style={{
        padding: '14px',
        textAlign: 'left',
        fontSize: '16px',
        border: '1px solid #999',
        borderRadius: '6px',
        backgroundColor: bgColor,
        color: textColor,
        cursor: status === 'answering' ? 'pointer' : 'default',
      }}
    >
      {`${LETTERS[index]}. ${option}`}
    </button>
  );
};

export default AnswerButton;