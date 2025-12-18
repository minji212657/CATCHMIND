import './App.css';
import React, { useMemo, useEffect } from 'react';
import gaEvent from './utils/ga';

const days = ['일', '월', '화', '수', '목', '금', '토'];

function TicketRow({ title, price, count, setCount, note, badge }) {
  return (
    <div className="ticket-row">
      <div>
        <p className="ticket-title">
          {badge && <span className="ticket-badge">{badge}</span>}
          {title}
        </p>
        <p className="ticket-price">{price.toLocaleString()}원</p>
        {note && <p className="ticket-note">{note}</p>}
      </div>
      <div className="counter">
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          className="counter-btn"
        >
          −
        </button>
        <span className="counter-value">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="counter-btn"
        >
          +
        </button>
      </div>
    </div>
  );
}

function ReservationSelectScreen({
  selectedDate,
  setSelectedDate,
  adult,
  setAdult,
  youth,
  setYouth,
  onNext,
  adultPrice = 24000,
  youthPrice = 17000,
  discountadultPrice = 17000,
  // discountyouthPrice = 17000,
}) {
  /* =========================
     📅 달력 상태
  ========================= */
  const [year, setYear] = React.useState(2026);
  const [month, setMonth] = React.useState(0); // 1월

  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 해당 월의 총 날짜 수
  const totalDays = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  // today 자동 선택
  useEffect(() => {
    if (
      year === todayYear &&
      month === todayMonth &&
      selectedDate !== todayDate
    ) {
      setSelectedDate(todayDate);
    }
  }, [
    year,
    month,
    todayYear,
    todayMonth,
    todayDate,
    selectedDate,
    setSelectedDate,
  ]);

  // 이전 달
  const goPrevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  // 다음 달
  const goNextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const totalPrice = adult * adultPrice + youth * youthPrice;

  return (
    <div className="reservation-screen">
      {/* Header */}
      <header className="rs-header">
        <button className="icon-btn">‹</button>
        <h1>매수 선택</h1>
        <span className="icon-space" />
      </header>

      <main className="rs-content">
        {/* Calendar */}
        <section className="calendar">
          <p className="section-label">방문 날짜 선택</p>

          <div className="calendar-nav">
            <button className="icon-btn" onClick={goPrevMonth}>
              ‹
            </button>
            <h2>
              {year}.{String(month + 1).padStart(2, '0')}
            </h2>
            <button className="icon-btn rotate" onClick={goNextMonth}>
              ‹
            </button>
          </div>

          <div className="calendar-grid">
            {days.map((day) => (
              <div key={day} className="calendar-day-label">
                {day}
              </div>
            ))}

            {Array.from({ length: totalDays }, (_, i) => {
              const day = i + 1;
              const cellDate = new Date(year, month, day);
              const isPast = cellDate < today;
              const isToday =
                year === todayYear &&
                month === todayMonth &&
                day === todayDate;

              return (
                <button
                  key={day}
                  disabled={isPast}
                  onClick={() => !isPast && setSelectedDate(day)}
                  className={[
                    'calendar-cell',
                    day === selectedDate ? 'selected' : '',
                    isPast ? 'disabled' : '',
                    isToday ? 'today' : '',
                  ].join(' ')}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </section>

        {/* Ticket */}
        <section className="ticket-section">
          <h2>매수 선택</h2>
          <div className="ticket-card">
          <TicketRow
            title="성인 입장권"
            price={adultPrice}
            count={adult}
            setCount={setAdult}
          />

          <TicketRow
            title="어린이/청소년 입장권"
            price={youthPrice}
            count={youth}
            setCount={setYouth}
          />

          <TicketRow
            title="BC 카드 할인-성인"
            price={discountadultPrice}
            count={0}
            setCount={() => {}}
            badge="[신용카드 할인]"
          />

          <TicketRow
            title="BC 카드 할인-청소년"
            price={youthPrice}
            count={0}
            setCount={() => {}}
            badge="[신용카드 할인]"
          />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="rs-footer horizontal">
        <div className="price-row horizontal">
          <span className="price-label">티켓 금액</span>
          <strong className="price-value">
            {totalPrice.toLocaleString()}원
          </strong>
        </div>

        <button
          className="cta-btn compact"
          disabled={!selectedDate}
          onClick={() => {
            // ✅ GA 이벤트 직접 호출 (가장 안전)
            if (window.gtag) {
              window.gtag('event', 'reservation_click', {
                screen: 'ReservationSelectScreen',
              });
            }

            onNext(); // 기존 로직 그대로
          }}
        >
          예매하기
        </button>
      </footer>
    </div>
  );
}
export default ReservationSelectScreen;
