import './App.css';
import gaEvent from './utils/ga';

const reservations = [
  {
    id: 1,
    badges: ['D-9', '온라인 예약'],
    title: '차만다 압구정',
    subtitle: '압구정 로데오 | 유러피언 음식',
    date: '1월 19일 (목) · 오후 12시 15분 · 2명',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=60',
    cta: '초대장 보내기',
    footer: '주변에 가볼 만한 공간',
  },
  {
    id: 2,
    badges: ['D-9', '온라인 예약'],
    title: '마스키아 : 과거와 미래를 잇는 상징...',
    subtitle: '압구정 로데오 | 전시',
    date: '1월 19일 (목) · 2명',
    image: '',
    footer: '주변에 먹을 만한 식당',
  },
];

function MyDiningScreen() {
  const handleSearch = () => gaEvent('my_search_click');
  const handleTabClick = (tab) => gaEvent('my_tab_click', { tab });
  const handleStatusClick = (status) =>
    gaEvent('my_status_click', { status });
  const handleOutlineClick = (item) =>
    gaEvent('my_reservation_cta_click', { id: item.id, cta: item.cta });
  const handleFoldClick = (item) =>
    gaEvent('my_reservation_fold_click', { id: item.id, footer: item.footer });
  const handleNavClick = (tab) => gaEvent('my_bottom_nav_click', { tab });

  return (
    <div className="reservation-screen my-dining-screen">
      <header className="my-header">
        <h1>마이 다이닝</h1>
        <button className="icon-btn ghost" aria-label="검색" onClick={handleSearch}>
          🔍
        </button>
      </header>

      <div className="my-tabs">
        <button className="tab active" onClick={() => handleTabClick('나의 예약')}>나의 예약</button>
        <button className="tab" onClick={() => handleTabClick('나의 알림')}>나의 알림</button>
      </div>

      <main className="my-body">
        <div className="ad-box muted">광고 영역</div>

        <div className="status-tabs">
          <button className="status active" onClick={() => handleStatusClick('방문 예정')}>방문 예정</button>
          <button className="status" onClick={() => handleStatusClick('방문 완료')}>방문 완료</button>
          <button className="status" onClick={() => handleStatusClick('취소/노쇼')}>취소/노쇼</button>
        </div>

        <section className="reservation-list">
          {reservations.map((item) => (
            <article key={item.id} className="reservation-card">
              <div className="reservation-top">
                <span className="badge gray">{item.badges[0]}</span>
                <span className="badge outline">{item.badges[1]}</span>
                <span className="calendar-icon" aria-hidden>
                  📅
                </span>
              </div>

              <div className="reservation-body">
                {item.image ? (
                  <img
                    className="reservation-thumb"
                    src={item.image}
                    alt={item.title}
                  />
                ) : (
                  <div className="reservation-thumb placeholder" />
                )}
                <div className="reservation-info">
                  <p className="reservation-title">{item.title}</p>
                  <p className="reservation-sub">{item.subtitle}</p>
                  <p className="reservation-date highlight">{item.date}</p>
                </div>
              </div>

              {item.cta && (
                <button className="outline-btn" onClick={() => handleOutlineClick(item)}>{item.cta}</button>
              )}

              <button className="fold-btn" onClick={() => handleFoldClick(item)}>
                {item.footer} <span className="chevron">⌄</span>
              </button>
            </article>
          ))}
        </section>
      </main>

      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => handleNavClick('홈')}>
          <span>🏠</span>
          <span>홈</span>
        </button>
        <button className="nav-item" onClick={() => handleNavClick('저장')}>
          <span>🔖</span>
          <span>저장</span>
        </button>
        <button className="nav-item" onClick={() => handleNavClick('내 주변')}>
          <span>📍</span>
          <span>내 주변</span>
        </button>
        <button className="nav-item active" onClick={() => handleNavClick('마이 다이닝')}>
          <span>📅</span>
          <span>마이 다이닝</span>
        </button>
        <button className="nav-item" onClick={() => handleNavClick('MY')}>
          <span>👤</span>
          <span>MY</span>
        </button>
      </nav>
    </div>
  );
}

export default MyDiningScreen;
