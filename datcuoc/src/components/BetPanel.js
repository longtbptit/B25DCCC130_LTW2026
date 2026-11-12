import { LEVELS, MULTIPLIERS, formatScore, formatMultiplier } from '../data';
import { validateBet } from '../utils';

const BetPanel = ({ index, total, question, score, bet, setBet, onConfirm }) => {
  const errorMsg = validateBet(bet, score);

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3>
        {`Câu ${index + 1}/${total} – ${question.topic} · ${LEVELS[question.level]} (${formatMultiplier(MULTIPLIERS[question.level])})`}
      </h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {`Điểm hiện có: ${formatScore(score)}`}
      </p>

      <div style={{ margin: '16px 0' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Mức cược:</label>
        <input
          type="number"
          step="100"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          style={{ padding: '6px 10px', width: '120px' }}
        />
      </div>

      {errorMsg && <p style={{ color: 'red', margin: '8px 0' }}>{errorMsg}</p>}

      <button
        disabled={Boolean(errorMsg)}
        onClick={onConfirm}
        style={{ padding: '10px 20px', cursor: errorMsg ? 'not-allowed' : 'pointer' }}
      >
        Đặt cược
      </button>
    </div>
  );
};

export default BetPanel;