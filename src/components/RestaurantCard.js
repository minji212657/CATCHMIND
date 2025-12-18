import React from 'react';
import gaEvent from '../utils/ga';

const RestaurantCard = ({
  name,
  rating,
  category,
  location,
  images = [],
  dates = [], // [{ label: '오늘 (수)', status: 'closed' | 'open' }]
  onSave,
  onSelectDate,
}) => {
  const handleSave = () => {
    gaEvent('restaurant_save_click', { name });
    onSave?.();
  };

  const handleSelectDate = (item) => {
    if (item.status === 'closed') return;
    gaEvent('restaurant_date_select', { name, label: item.label });
    onSelectDate?.(item);
  };

  return (
    <article style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>{name}</h3>
        <button style={styles.saveBtn} onClick={handleSave}>
          🔖
        </button>
      </div>

      <p style={styles.meta}>
        ⭐ {rating} · {category} · {location}
      </p>

      {/* Images */}
      <div style={styles.images}>
        {images.slice(0, 2).map((src, index) => (
          <div key={index} style={styles.imageBox}>
            {src ? (
              <img src={src} alt="" style={styles.image} />
            ) : (
              <div style={styles.placeholder} />
            )}
          </div>
        ))}
      </div>

      {/* 날짜 예약 버튼 */}
      <div style={styles.dateRow}>
        {dates.map((item) => {
          const isClosed = item.status === 'closed';

          return (
            <button
              key={item.label}
              disabled={isClosed}
              onClick={() => handleSelectDate(item)}
              style={{
                ...styles.dateChip,
                ...(isClosed ? styles.dateClosed : styles.dateOpen),
              }}
            >
              <span style={styles.dateLabel}>{item.label}</span>
              <span style={styles.dateStatus}>
                {isClosed ? '예약 마감' : '예약 가능'}
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
};

export default RestaurantCard;

/* =========================
   Styles
========================= */
const styles = {
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 14,
    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
    width: '100%',
    maxWidth: 360,
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
    margin: '4px 0 8px',
  },
  images: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 6,
    marginBottom: 10,
  },
  imageBox: {
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    background: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    background: '#e5e5e5',
  },

  /* 날짜 버튼 */
  dateRow: {
    display: 'flex',
    gap: 8,
    marginTop: 6,
  },
  dateChip: {
    flex: 1,
    borderRadius: 14,
    padding: '8px 0',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
  },
  dateLabel: {
    fontWeight: 600,
  },
  dateStatus: {
    marginTop: 2,
    fontSize: 11,
  },
  dateOpen: {
    background: '#fff',
    border: '1px solid #ff3d00',
    color: '#ff3d00',
    cursor: 'pointer',
  },
  dateClosed: {
    background: '#f3f3f3',
    color: '#9a9a9a',
    cursor: 'not-allowed',
  },
};
