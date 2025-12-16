import './App.css';

function MyDiningScreen({ onClose }) {
  return (
    <div className="reservation-screen my-dining-screen">
      {/* Header */}
      <header className="rs-header">
        <h1>마이 다이닝</h1>
        <span role="button" aria-label="검색">🔍</span>
      </header>

      {/* Tabs */}
      <div className="my-tabs">
        <button className="tab active">나의 예약</button>
        <button className="tab">나의 알림</button>
      </div>

      {/* Ad */}
      <div className="ad-box">광고 영역</div>

      {/* Status Filter */}
      <div className="status-tabs">
        <button className="status active">방문 예정</button>
        <button className="status">방문 완료</button>
        <button className="status">취소/노쇼</button>
      </div>

      {/* 예약 카드 - 식당 */}
      <section className="reservation-card">
        <div className="reservation-top">
          <span className="badge gray">D-9</span>
          <span className="badge outline">온라인 예약</span>
          <span className="calendar-icon">📅</span>
        </div>

        <div className="reservation-body">
          {/* <img
            className="reservation-thumb"
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="차만다 압구정"
          /> */}
          <div className="reservation-info">
            <p className="reservation-title">차만다 압구정</p>
            <p className="reservation-sub">
              압구정 로데오 | 유러피언 음식
            </p>
            <p className="reservation-date highlight">
              1월 19일 (목) · 오후 12시 15분 · 2명
            </p>
          </div>
        </div>

        <button className="outline-btn">초대장 보내기</button>

        <button className="fold-btn">
          주변에 가볼 만한 공간 <span>⌄</span>
        </button>
      </section>

      {/* 예약 카드 - 전시 */}
      <section className="reservation-card">
        <div className="reservation-top">
          <span className="badge gray">D-9</span>
          <span className="badge outline">온라인 예약</span>
          <span className="calendar-icon">📅</span>
        </div>

        <div className="reservation-body">
          <div className="reservation-thumb placeholder" />
          <div className="reservation-info">
            <p className="reservation-title">
              마스키아 : 과거와 미래를 잇는 상징…
            </p>
            <p className="reservation-sub">
              압구정 로데오 | 전시
            </p>
            <p className="reservation-date highlight">
              1월 19일 (목) · 2명
            </p>
          </div>
        </div>

        <button className="fold-btn">
          주변에 먹을 만한 식당 <span>⌄</span>
        </button>
      </section>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <span>🏠</span>
        <span>🔖</span>
        <span>📍</span>
        <span className="active">📅</span>
        <span>👤</span>
      </nav>
    </div>
  );
}

export default MyDiningScreen;
