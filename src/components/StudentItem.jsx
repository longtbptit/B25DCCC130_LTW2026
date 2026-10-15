import React from 'react';
// Em nghĩ đây là nơi để nhận thông tin từ từng bạn từ table rồi in ra 1 hàng <tr>
const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td>{score}</td>
      <td>
        <button 
          onClick={handleDelete}
          style={{ backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;