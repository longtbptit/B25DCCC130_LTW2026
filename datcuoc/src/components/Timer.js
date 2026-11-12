const Timer = ({ timeLeft }) => {
  return (
    <div
      style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: timeLeft <= 5 ? 'red' : '#333',
      }}
    >
      {`Còn ${timeLeft} giây`}
    </div>
  );
};

export default Timer;