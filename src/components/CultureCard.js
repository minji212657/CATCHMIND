import React from 'react';

function CultureCard({
  title,
  rating,
  reviewCount,
  location,
  audience,
  period,
  time,
  adultPrice,
  youthPrice,
  onReserve,
  onSave,
}) {
  return (
    <article style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.title}>{title}</p>
        <button style={styles.saveBtn} onClick={onSave}>
          🔖
        </button>
      </div>

      <p style={styles.meta}>
        ⭐ {rating} ({reviewCount}) · {location} · {audience}
      </p>

      {/* Image */}
      <div style={styles.imageWrapper}>
        <div style={styles.placeholder} />
      </div>

      {/* Info */}
      <div style={styles.info}>
        <p>🕘 {period} · {time}</p>
        <p>
          💰 성인 {adultPrice.toLocaleString()}원 · 어린이/청소년{' '}
          {youthPrice.toLocaleString()}원
        </p>
      </div>

      {/* CTA */}
      <button style={styles.reserveBtn} onClick={onReserve}>
        예매하기
      </button>
    </article>
  );
}

export default CultureCard;

/* =========================
   Styles (inline)
========================= */
const styles = {
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 14,
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    width: '100%',
    maxWidth: 360,
    marginBottom: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
  },
  saveBtn: {
    border: 'none',
    background: 'none',
    fontSize: 18,
    cursor: 'pointer',
  },
  meta: {
    fontSize: 12,
    color: '#666',
    margin: '6px 0 10px',
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    background: '#eee',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    background: '#e5e5e5',
  },
  info: {
    fontSize: 13,
    color: '#444',
    marginBottom: 12,
    lineHeight: 1.5,
  },
  reserveBtn: {
    width: '100%',
    border: 'none',
    borderRadius: 14,
    background: '#ff3d00',
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    padding: '14px 0',
    cursor: 'pointer',
  },
};
