import { useState } from 'react';
import StudentTable from './components/StudentTable';

const initialStudents = [
  { id: 1, name: 'Đỗ Doãn Minh Nhật', score: 8.5, class: 'D25CQCC04-B' },
  { id: 2, name: 'Nguyễn An Trung', score: 4.0, class: 'D25CQCC04-B' },
  { id: 3, name: 'Nguyễn Duy Toàn', score: 9.0, class: 'D25CQCC04-B' },
  { id: 4, name: 'Hoàng Tuấn Huy', score: 3.5, class: 'D25CQCC05-B' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'GIOI' | 'TRUOT'

  // Đoạn này để em state cho form
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  // Hàm này để em thêm sinh viên mới
  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!name.trim() || score === '' || !studentClass.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin: Họ tên, Điểm số, Lớp!');
      return;
    }

    const numScore = parseFloat(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError(`Điểm số không hợp lệ (${score}). Điểm phải từ 0 đến 10!`);
      return;
    }
  // Đoạn này để thêm 1 sinh viên mới thì id sẽ tự động cộng 1
    const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = {
      id: nextId,
      name: name.trim(),
      score: numScore,
      class: studentClass.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setName('');
    setScore('');
    setStudentClass('');
    setError('');
  };

  // Hàm này thì em dùng để xóa
  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((item) => item.id !== id));
  };

  // Hàm này dùng để lọc danh sách trên 8 và dưới 5
  const filteredStudents = students.filter((item) => {
    if (filterType === 'GIOI') return item.score >= 8;
    if (filterType === 'TRUOT') return item.score < 5;
    return true;
  });

  // Chỗ này để em tính tổng
  const totalStudents = students.length;
  const averageScore =
    totalStudents > 0
      ? (students.reduce((acc, curr) => acc + curr.score, 0) / totalStudents).toFixed(2)
      : '0.00';

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '0 16px' }}>
      <h2 style={{ textAlign: 'center' }}>Quản lý Điểm Sinh viên</h2>

      {/* Dưới này sẽ là form để nhập một sinh viên mới */}
      <form
        onSubmit={handleAddStudent}
        style={{
          border: '1px solid #ccc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h3>Thêm sinh viên mới</h3>
        {error && <p style={{ color: 'red', margin: '4px 0' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          <input
            type="text"
            placeholder="Họ tên sinh viên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', flex: 2 }}
          />
          <input
            type="text"
            placeholder="Lớp"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Điểm (0 - 10)"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={{ padding: '8px', flex: 1 }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Thêm
          </button>
        </div>
      </form>

      {/* Thống kê */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#e6f7ff', borderRadius: '4px', marginBottom: '16px' }}>
        <span><strong>{`Tổng số sinh viên: ${totalStudents}`}</strong></span>
        <span><strong>{`Điểm trung bình toàn lớp: ${averageScore}`}</strong></span>
      </div>

      {/* Bộ lọc Filter */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span><strong>Bộ lọc:</strong></span>
        <button
          onClick={() => setFilterType('ALL')}
          style={{ padding: '6px 12px', background: filterType === 'ALL' ? '#1890ff' : '#eee', color: filterType === 'ALL' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilterType('GIOI')}
          style={{ padding: '6px 12px', background: filterType === 'GIOI' ? '#52c41a' : '#eee', color: filterType === 'GIOI' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sinh viên Giỏi (Điểm ≥ 8)
        </button>
        <button
          onClick={() => setFilterType('TRUOT')}
          style={{ padding: '6px 12px', background: filterType === 'TRUOT' ? '#f5222d' : '#eee', color: filterType === 'TRUOT' ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sinh viên Trượt (Điểm &lt; 5)
        </button>
      </div>

      {/* Bảng danh sách sinh viên */}
      <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;