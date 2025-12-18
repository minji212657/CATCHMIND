import './App.css';
import React, { useMemo, useEffect } from 'react';
import gaEvent from './utils/ga';

const days = ['일', '월', '화', '수', '목', '금', '토'];

function TicketRow({ title, price, count, setCount, note, badge }) {
  const handleDecrement = () => {
    const newCount = Math.max(0, count - 1);
    gaEvent('ticket_decrement', { ticket: title, count: newCount });
    setCount(newCount);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    gaEvent('ticket_increment', { ticket: title, count: newCount });
    setCount(newCount);
  };

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
          onClick={handleDecrement}
          className="counter-btn"
        >
          −
        </button>
        <span className="counter-value">{count}</span>
        <button
          onClick={handleIncrement}
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
  discountAdult,
  setDiscountAdult,
  discountYouth,
  setDiscountYouth,
  onNext,
  adultPrice = 24000,
  youthPrice = 17000,
  discountadultPrice = 17000,
  discountYouthPrice = 17000,
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
      selectedDate === null &&
      year === todayYear &&
      month === todayMonth
    ) {
      setSelectedDate(todayDate);
    }
  }, [year, month, todayYear, todayMonth, todayDate, selectedDate, setSelectedDate]);

  // 이전 달
  const goPrevMonth = () => {
    const targetYear = month === 0 ? year - 1 : year;
    const targetMonth = month === 0 ? 11 : month - 1;
    gaEvent('calendar_prev_month', { year: targetYear, month: targetMonth + 1 });

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
    const targetYear = month === 11 ? year + 1 : year;
    const targetMonth = month === 11 ? 0 : month + 1;
    gaEvent('calendar_next_month', { year: targetYear, month: targetMonth + 1 });

    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const totalPrice =
    adult * adultPrice +
    youth * youthPrice +
    discountAdult * discountadultPrice +
    discountYouth * discountYouthPrice;

  return (
    <div className="reservation-screen">
      {/* Header */}
      <header className="rs-header">
        <button
          className="icon-btn"
          onClick={() =>
            gaEvent('header_back_click', { screen: 'ReservationSelectScreen' })
          }
        >
          ‹
        </button>
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
                  onClick={() => {
                    if (isPast) return;
                    gaEvent('calendar_date_select', {
                      year,
                      month: month + 1,
                      day,
                    });
                    setSelectedDate(day);
                  }}
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
            count={discountAdult}
            setCount={setDiscountAdult}
            badge="[신용카드 할인]"
          />

          <TicketRow
            title="BC 카드 할인-청소년"
            price={discountYouthPrice}
            count={discountYouth}
            setCount={setDiscountYouth}
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
            gaEvent('reservation_click', { screen: 'ReservationSelectScreen' });

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
