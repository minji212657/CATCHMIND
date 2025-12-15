import './App.css';

const days = ['일', '월', '화', '수', '목', '금', '토'];
const totalDays = Array.from({ length: 31 }, (_, i) => i + 1);

function TicketRow({ title, price, count, setCount, note }) {
  return (
    <div className="ticket-row">
      <div>
        <p className="ticket-title">{title}</p>
        <p className="ticket-price">{price.toLocaleString()}원</p>
        {note && <p className="ticket-note">{note}</p>}
      </div>
      <div className="counter">
        <button onClick={() => setCount(Math.max(0, count - 1))} className="counter-btn" aria-label={`${title} 감소`}>
          −
        </button>
        <span className="counter-value">{count}</span>
        <button onClick={() => setCount(count + 1)} className="counter-btn" aria-label={`${title} 증가`}>
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
}) {
  const totalPrice = adult * adultPrice + youth * youthPrice;

  return (
    <div className="reservation-screen">
      <header className="rs-header">
        <button className="icon-btn" aria-label="뒤로가기">
          ‹
        </button>
        <h1>예매 선택</h1>
        <span className="icon-space" />
      </header>

      <main className="rs-content">
        <section className="calendar">
          <div className="calendar-nav">
            <button className="icon-btn" aria-label="이전 달">
              ‹
            </button>
            <h2>2026.01</h2>
            <button className="icon-btn rotate" aria-label="다음 달">
              ‹
            </button>
          </div>

          <div className="calendar-grid">
            {days.map((day) => (
              <div key={day} className="calendar-day-label">
                {day}
              </div>
            ))}
            {totalDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={day === selectedDate ? 'calendar-cell selected' : 'calendar-cell'}
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        <section className="ticket-section">
          <h2>예매 선택</h2>
          <TicketRow title="성인" price={adultPrice} count={adult} setCount={setAdult} />
          <TicketRow
            title="어린이/청소년"
            price={youthPrice}
            count={youth}
            setCount={setYouth}
            note="18세 미만(2008년 이후 출생)"
          />
        </section>
      </main>

      <footer className="rs-footer">
        <div className="price-row">
          <span>티켓금액</span>
          <strong>{totalPrice.toLocaleString()}원</strong>
        </div>
        <button className="cta-btn" type="button" onClick={onNext}>
          예매하기
        </button>
      </footer>
    </div>
  );
}

export default ReservationSelectScreen;


