import { formatScore } from '../data';

const ScoreInfo = ({ score, bet }) => {
  return (
    <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontWeight: 'bold' }}>
      <span>{`Điểm hiện có: ${formatScore(score)}`}</span>
      <span>{`Đang cược: ${formatScore(Number(bet))}`}</span>
    </div>
  );
};

export default ScoreInfo;