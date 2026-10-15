import React from 'react';
import StudentItem from './StudentItem';
// Em nghĩ nhiệm vụ của file này là để dựng khung bảng và lặp qua 1 lượt danh sách
const StudentTable = ({ students, onDelete }) => {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Lớp</th>
          <th>Điểm số</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <StudentItem key={student.id} student={student} onDelete={onDelete} />
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>
              Không có sinh viên nào phù hợp
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;