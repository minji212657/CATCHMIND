import { useMemo, useState } from 'react';
import './App.css';
import gaEvent from './utils/ga';

function TicketPaymentScreen({ adult = 0, youth = 0, totalPrice = 0, onBack, onPay }) {
  const [receiveMethod, setReceiveMethod] = useState('pickup'); // 'pickup' | 'mobile'
  const totalTickets = adult + youth;

  const breakdown = useMemo(
    () => [
      adult > 0 ? `성인 · 24,000원 × ${adult}매` : null,
      youth > 0 ? `어린이/청소년 · 17,000원 × ${youth}매` : null,
    ].filter(Boolean),
    [adult, youth]
  );
  /* =========================
     약관 동의 state
  ========================= */
  const [agreeThirdParty, setAgreeThirdParty] = useState(true);
  const [agreeRefund, setAgreeRefund] = useState(true);

  const allAgreed = agreeThirdParty && agreeRefund;

  const handleAllAgree = () => {
    const next = !allAgreed;
    setAgreeThirdParty(next);
    setAgreeRefund(next);
  };

  const handleThirdParty = () => {
    setAgreeThirdParty((prev) => !prev);
  };

  const handleRefund = () => {
    setAgreeRefund((prev) => !prev);
  };

  const handleBack = () => {
    gaEvent('payment_back_click', { screen: 'TicketPaymentScreen' });
    onBack?.();
  };

  const handleReceiveMethod = (method) => {
    setReceiveMethod(method);
    gaEvent('payment_receive_method', { method });
  };

  const handlePay = () => {
    gaEvent('payment_pay_click', { totalPrice });
    onPay?.();
  };

  return (
    <div className="reservation-screen">
      <header className="rs-header">
        <button type="button" className="icon-btn" aria-label="뒤로가기" onClick={handleBack}>
          ‹
        </button>
        <h1>티켓 결제</h1>
        <span className="icon-space" />
      </header>

      <main className="rs-content">
        {/* 주문 상세 */}
        <section className="payment-section">
          <h2 className="payment-title">주문 상세</h2>
          <p className="payment-main">바스키아 : 과거와 미래를 잇는 상징적 기호들</p>
          <p className="payment-subtitle">동대문 디자인플라자 전시 1관</p>

          <div className="payment-ticket">
            <p className="payment-highlight">입장권 {totalTickets}인</p>
            {breakdown.map((line) => (
              <p key={line} className="payment-caption">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* 티켓 수령 방법 */}
        <section className="payment-section">
          <h2 className="payment-title">티켓 수령 방법</h2>
          <div className="chip-row">
            <button
              className={receiveMethod === 'pickup' ? 'chip active' : 'chip'}
              type="button"
              onClick={() => handleReceiveMethod('pickup')}
            >
              현장 수령
            </button>
            <button
              className={receiveMethod === 'mobile' ? 'chip active' : 'chip'}
              type="button"
              onClick={() => handleReceiveMethod('mobile')}
            >
              모바일 수령
            </button>
          </div>
        </section>

        {/* 예약자 정보 */}
        <section className="payment-section">
          <h2 className="payment-title">예약자 정보</h2>
          <div className="info-list">
            <div className="info-field muted">홍길동</div>
            <div className="info-field muted">1997.08.09</div>
            <div className="info-field outline">email@email.com</div>
            <div className="info-field outline">010-1234-5678</div>
          </div>
        </section>

        {/* 결제 수단 */}
        <section className="payment-section">
          <h2 className="payment-title">결제 수단</h2>

          <div className="payment-methods">
            <label className="payment-method">
              <input type="radio" name="payment" defaultChecked className="payment-radio" />
              <div className="payment-method-card">
                <p className="payment-method-title">toss pay</p>
                <div className="payment-method-meta">
                  <span className="payment-badge">체크</span>
                  <span>하나(외환) (140*)</span>
                </div>
              </div>
            </label>

            <label className="payment-method inline">
              <input type="radio" name="payment" className="payment-radio" />
              <span className="payment-method-label">일반 결제</span>
            </label>
          </div>
        </section>

        {/* 할인 쿠폰 */}
        <section className="payment-section coupon-row">
          <p className="payment-title">% 할인 쿠폰</p>
          <span className="coupon-chevron">›</span>
        </section>

        {/* 결제 정보 */}
        <section className="payment-section">
          <h2 className="payment-title">결제 정보</h2>

          <div className="summary-list">
            <div className="summary-row">
              <span>티켓 금액</span>
              <span className="summary-plus">
                + {totalPrice.toLocaleString()}원
              </span>
            </div>
              <div className="summary-row muted">
              <span>예매 수수료</span>
              <span className="summary-plus">+ 0원</span>
            </div>
            <div className="summary-row muted">
              <span>할인 수단</span>
              <span className="summary-minus">- 0원</span>
            </div>

            <div className="summary-row total">
              <span>최종 결제 금액</span>
              <span className="summary-total">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </section>
        <section className="payment-section">
          <h2 className="payment-title">약관 동의</h2>

          {/* 모두 동의 */}
        <label className="agree-all">
          <input
            type="checkbox"
            checked={allAgreed}
            onChange={handleAllAgree}
          />
          <span>모두 동의합니다.</span>
        </label>

        {/* 개별 약관 */}
        <div className="agree-list">
          <label className="agree-item">
            <input
              type="checkbox"
              checked={agreeThirdParty}
              onChange={handleThirdParty}
            />
            <span>개인정보 제 3자 제공 동의</span>
            <span className="agree-chevron">›</span>
          </label>

          <label className="agree-item">
            <input
              type="checkbox"
              checked={agreeRefund}
              onChange={handleRefund}
            />
            <span>예약 취소/변경에 대한 환불 정책 동의</span>
            <span className="agree-chevron">›</span>
          </label>
        </div>
      </section>
      </main>
      
      <footer className="rs-footer">
        <div className="price-row">
          <span>방문 일자</span>
          <strong>2026.01.19</strong>
        </div>
        <div className="price-row">
          <span>최종 결제 금액</span>
          <strong>{totalPrice.toLocaleString()}원</strong>
        </div>
        <button className="cta-btn" type="button" onClick={handlePay}>
          결제하기 · {totalPrice.toLocaleString()}원
        </button>
      </footer>
    </div>
  );
}

export default TicketPaymentScreen;
