import './App.css';
import { useState } from 'react';
import gaEvent from './utils/ga';

const recommends = [
  { id: 1, name: '광장시장 빈대떡', rating: 4.6, category: '한식 · 분식' },
  { id: 2, name: '을지면옥', rating: 4.4, category: '한식 · 냉면' },
  { id: 3, name: '청수당', rating: 4.7, category: '카페 · 전통' },
  { id: 4, name: '히츠지야', rating: 4.5, category: '일식 · 양고기' },
];

function SuccessScreen({ summary, onClose }) {
  const [items, setItems] = useState(recommends);

  const toggleSave = (id) => {
    const target = items.find((item) => item.id === id);
    const nextSaved = !target?.saved;
    gaEvent('success_recommend_save_toggle', { id, saved: nextSaved });

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const { title, dateText, timeText, peopleText } = summary;

  const handleClose = () => {
    gaEvent('success_close_click', { screen: 'SuccessScreen' });
    onClose?.();
  };

  const handleSeeAll = () => {
    gaEvent('success_recommend_see_all', { screen: 'SuccessScreen' });
  };

  return (
    <div className="reservation-screen success-screen">
      {/* Header */}
      <header className="success-header">
        <button className="ghost" onClick={handleClose}>✕</button>
      </header>

      <main className="success-content">
        {/* 완료 문구 */}
        <h1 className="success-title">예매를 완료했습니다.</h1>

        {/* 전시 카드 */}
        <div className="success-card">
          <div className="success-thumb" />
          <p className="success-meta-title">{title}</p>
          <p className="success-meta-sub">
            {dateText} · {timeText} · {peopleText}
          </p>
        </div>

        {/* 추천 */}
        <section className="recommend-section">
          <div className="recommend-header">
            <p className="recommend-title">식사는 이런 곳 어때요?</p>
            <button className="recommend-see-all" onClick={handleSeeAll}>
              전체 보기 <span className="chevron">›</span>
            </button>
          </div>

          <div className="recommend-row">
            {items.map((item) => (
              <article key={item.id} className="recommend-card mini">
                <div className="recommend-img small" />
                <div className="recommend-body">
                  <p className="recommend-name">{item.name}</p>
                  {/* 저장 버튼 */}
                <button className={`bookmark-btn ${item.saved ? 'active' : ''}`} onClick={() => toggleSave(item.id)} aria-label="저장">🔖</button>
                  <p className="recommend-rating">⭐ {item.rating}
                    <span className="recommend-tag">{item.category}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


export default SuccessScreen;
