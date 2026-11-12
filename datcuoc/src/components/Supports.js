const Supports = ({
  status,
  usedSupports,
  insuredCurrent,
  onUsePreview,
  onUseInsurance,
  onUseHint,
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <button
        type="button"
        disabled={status !== 'betting' || usedSupports.preview}
        onClick={onUsePreview}
        style={{ padding: '6px 12px', cursor: status === 'betting' && !usedSupports.preview ? 'pointer' : 'not-allowed' }}
      >
        Xem trước
      </button>

      <button
        type="button"
        disabled={status === 'revealed' || usedSupports.insurance}
        onClick={onUseInsurance}
        style={{ padding: '6px 12px', cursor: status !== 'revealed' && !usedSupports.insurance ? 'pointer' : 'not-allowed' }}
      >
        {insuredCurrent ? 'Đã bảo hiểm' : 'Bảo hiểm'}
      </button>

      <button
        type="button"
        disabled={status !== 'answering' || usedSupports.hint}
        onClick={onUseHint}
        style={{ padding: '6px 12px', cursor: status === 'answering' && !usedSupports.hint ? 'pointer' : 'not-allowed' }}
      >
        Gợi ý
      </button>
    </div>
  );
};

export default Supports;