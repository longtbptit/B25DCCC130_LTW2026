import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { START_SCORE, MIN_BET, TIME_PER_QUESTION, formatScore } from '../data';
import { calcChange } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';

const Play = ({ playerName, questions }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [bet, setBet] = useState(MIN_BET);
  const [status, setStatus] = useState('betting'); // betting | answering | revealed
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastChange, setLastChange] = useState(0);
  const [rounds, setRounds] = useState([]);

  const currentQuestion = questions[currentIndex];

  const handleEvaluate = (optionIndex) => {
    const betNum = Number(bet);
    const isCorrect = optionIndex === currentQuestion.answer;
    const change = calcChange(betNum, currentQuestion.level, isCorrect);
    const newScore = score + change;

    setSelectedOption(optionIndex);
    setLastChange(change);
    setScore(newScore);
    setRounds((prev) => [
      ...prev,
      {
        id: currentQuestion.id,
        bet: betNum,
        correct: isCorrect,
        change,
        scoreAfter: newScore,
      },
    ]);
    setStatus('revealed');
  };

  // Đồng hồ đếm ngược 25 giây khi đang trả lời
  useEffect(() => {
    if (status !== 'answering') return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleEvaluate(null); // Hết giờ coi như trả lời sai
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Chờ 2 giây sau khi lộ đáp án để chuyển câu hoặc kết thúc
  useEffect(() => {
    if (status !== 'revealed') return;

    const timeoutId = setTimeout(() => {
      if (score < MIN_BET || currentIndex + 1 >= questions.length) {
        const correctCount = rounds.filter((r) => r.correct).length;
        const reason = score < MIN_BET ? 'Bạn đã cháy túi!' : 'Bạn đã hoàn thành 12 câu.';

        navigate('/result', {
          replace: true,
          state: {
            playerName,
            rounds,
            finalScore: score,
            correctCount,
            reason,
          },
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setBet(MIN_BET);
        setSelectedOption(null);
        setStatus('betting');
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [status, score, currentIndex, questions.length, rounds, navigate, playerName]);

  if (!playerName || !playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) return null;

  const handleConfirmBet = () => {
    setTimeLeft(TIME_PER_QUESTION);
    setStatus('answering');
  };

  return (
    <div>
      {status === 'betting' ? (
        <BetPanel
          index={currentIndex}
          total={questions.length}
          question={currentQuestion}
          score={score}
          bet={bet}
          setBet={setBet}
          onConfirm={handleConfirmBet}
        />
      ) : (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ScoreInfo score={score} bet={bet} />
            <Timer timeLeft={timeLeft} />
          </div>

          <QuestionCard
            index={currentIndex}
            total={questions.length}
            question={currentQuestion}
            status={status}
            selectedOption={selectedOption}
            onSelect={handleEvaluate}
          />

          {status === 'revealed' && (
            <p
              style={{
                marginTop: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: lastChange > 0 ? '#2e7d32' : '#c62828',
              }}
            >
              {lastChange > 0
                ? `+${formatScore(lastChange)}`
                : `-${formatScore(Math.abs(lastChange))}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Play;