import './App.css';

const recommends = [
  { id: 1, name: '광장시장 빈대떡', rating: 4.6, category: '한식 · 분식' },
  { id: 2, name: '을지면옥', rating: 4.4, category: '한식 · 냉면' },
  { id: 3, name: '청수당', rating: 4.7, category: '카페 · 전통' },
  { id: 4, name: '히츠지야', rating: 4.5, category: '일식 · 양고기' },
];

function SuccessScreen({ onClose, summary }) {
  const { title, dateText, timeText, peopleText } = summary;

  return (
    <div className="reservation-screen success-screen">
      {/* Header */}
      <header className="success-header">
        <button
          className="ghost"
          aria-label="닫기"
          onClick={onClose}
        >
          ✕
        </button>
      </header>

      {/* Content */}
      <main className="success-content">
        <h1 className="success-title">예매를 완료했습니다.</h1>

        {/* Ticket Card */}
        <div className="success-card">
          <div className="success-thumb" aria-hidden />
          <p className="success-meta-title">{title}</p>
          <p className="success-meta-sub">
            {dateText} · {timeText} · {peopleText}
          </p>
        </div>

        {/* Recommend */}
        <section className="recommend-section">
          <div className="recommend-header">
            <p className="recommend-title">식사는 이런 곳 어때요?</p>
            <button
              className="recommend-see-all"
              type="button"
            >
              전체 보기 <span className="chevron">›</span>
            </button>
          </div>

          <div className="recommend-row">
            {recommends.map((item) => (
              <article
                key={item.id}
                className="recommend-card mini"
              >
                <div
                  className="recommend-img small"
                  aria-hidden
                />
                <div className="recommend-body">
                  <p className="recommend-name">{item.name}</p>
                  <p className="recommend-rating">
                    ⭐ {item.rating}
                    <span className="recommend-tag">
                      {item.category}
                    </span>
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
