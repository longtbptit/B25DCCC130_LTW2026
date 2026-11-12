import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { START_SCORE, MIN_BET, MAX_BET, BET_STEP, TIME_PER_QUESTION, formatScore } from '../data';
import { calcChange, validateBet, getResult } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';
import Supports from '../components/Supports';

const Play = ({ playerName, questions, onAddHistory }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [bet, setBet] = useState(MIN_BET);
  const [status, setStatus] = useState('betting'); // betting | answering | revealed
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastChange, setLastChange] = useState(0);
  const [rounds, setRounds] = useState([]);

  
  const [usedSupports, setUsedSupports] = useState({
    preview: false,
    insurance: false,
    hint: false,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [insuredCurrent, setInsuredCurrent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wasInsuredSaved, setWasInsuredSaved] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleEvaluate = (optionIndex) => {
    const betNum = Number(bet);
    const isCorrect = optionIndex === currentQuestion.answer;
    let change = calcChange(betNum, currentQuestion.level, isCorrect);
    let savedByInsurance = false;

    // Nếu sai hoặc hết giờ mà đang bật bảo hiểm -> không bị trừ điểm
    if (!isCorrect && insuredCurrent) {
      change = 0;
      savedByInsurance = true;
    }

    const newScore = score + change;

    setSelectedOption(optionIndex);
    setLastChange(change);
    setWasInsuredSaved(savedByInsurance);
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

  
  useEffect(() => {
    if (status !== 'answering') return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleEvaluate(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  
  useEffect(() => {
    if (status !== 'revealed') return;

    const timeoutId = setTimeout(() => {
      if (score < MIN_BET || currentIndex + 1 >= questions.length) {
        const correctCount = rounds.filter((r) => r.correct).length;
        const reason = score < MIN_BET ? 'Bạn đã cháy túi!' : 'Bạn đã hoàn thành 12 câu.';
        const resultTitle = getResult(score);

       
        onAddHistory({
          id: Date.now(),
          name: playerName.trim(),
          finalScore: score,
          correctCount,
          played: rounds.length,
          result: resultTitle,
          playedAt: new Date().toLocaleString('vi-VN'),
        });

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
        setShowPreview(false);
        setInsuredCurrent(false);
        setShowHint(false);
        setWasInsuredSaved(false);
        setStatus('betting');
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [status, score, currentIndex, questions.length, rounds, navigate, playerName, onAddHistory]);


  useEffect(() => {
    if (status !== 'betting') return;

    const maxValidBet = Math.min(MAX_BET, Math.floor(score / BET_STEP) * BET_STEP);

    const handleKey = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setBet((prev) => {
          const next = Number(prev) + BET_STEP;
          return next <= maxValidBet ? next : maxValidBet;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setBet((prev) => {
          const next = Number(prev) - BET_STEP;
          return next >= MIN_BET ? next : MIN_BET;
        });
      } else if (e.key === 'Enter') {
        if (!validateBet(bet, score)) {
          setTimeLeft(TIME_PER_QUESTION);
          setStatus('answering');
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, score, bet]);


  useEffect(() => {
    if (!currentQuestion) return;
    if (status === 'betting') {
      document.title = `Câu ${currentIndex + 1}/${questions.length} – đặt cược`;
    } else {
      document.title = `Câu ${currentIndex + 1}/${questions.length} – cược ${Number(bet)}`;
    }

    return () => {
      document.title = 'Đặt cược kiến thức';
    };
  }, [status, currentIndex, questions.length, bet, currentQuestion]);

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
      <Supports
        status={status}
        usedSupports={usedSupports}
        insuredCurrent={insuredCurrent}
        onUsePreview={() => {
          setUsedSupports((prev) => ({ ...prev, preview: true }));
          setShowPreview(true);
        }}
        onUseInsurance={() => {
          setUsedSupports((prev) => ({ ...prev, insurance: true }));
          setInsuredCurrent(true);
        }}
        onUseHint={() => {
          setUsedSupports((prev) => ({ ...prev, hint: true }));
          setShowHint(true);
        }}
      />

      {status === 'betting' ? (
        <BetPanel
          index={currentIndex}
          total={questions.length}
          question={currentQuestion}
          score={score}
          bet={bet}
          setBet={setBet}
          onConfirm={handleConfirmBet}
          previewText={showPreview ? currentQuestion.question : ''}
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

          {showHint && (
            <p style={{ marginTop: '14px', fontStyle: 'italic', color: '#0d47a1' }}>
              {`Gợi ý: ${currentQuestion.hint}`}
            </p>
          )}

          {status === 'revealed' && (
            <p
              style={{
                marginTop: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: wasInsuredSaved ? '#e65100' : lastChange > 0 ? '#2e7d32' : '#c62828',
              }}
            >
              {wasInsuredSaved
                ? 'Bảo hiểm: không bị trừ điểm'
                : lastChange > 0
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