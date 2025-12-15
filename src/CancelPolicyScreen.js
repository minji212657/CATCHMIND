import './App.css';

function CancelPolicyScreen({ onBack }) {
  return (
    <div className="cancel-screen">
      <header className="cancel-header">
        <button className="icon-btn" aria-label="뒤로가기" onClick={onBack}>
          ‹
        </button>
      </header>

      <main className="cancel-content">
        <section className="policy-section">
          <h3>취소 및 환불 규정</h3>
          <ul className="dot-list">
            <li>예매 취소 조건보다 취소 수수료 규정이 우선 적용됩니다.</li>
            <li>예매 당일 자정(밤 12시) 이전 취소시 티켓 취소수수료가 없으며, 예매 수수료도 환불됩니다. (취소기한 내 한함)</li>
          </ul>
        </section>

        <section className="policy-section">
          <h3>취소수수료 규정</h3>
          <ul className="dot-list">
            <li>관람일 기준 아래와 같이 취소 수수료가 적용됩니다.</li>
            <li>취소 기한은 예매한 수신 내용에서 확인해 주세요.</li>
          </ul>
          <button className="disabled-btn">취소 가능 내 취소 시</button>
          <button className="danger-tag">티켓금액의 10%</button>
        </section>

        <section className="policy-section">
          <h3>예매 취소 조건</h3>
          <ul className="dot-list">
            <li>예매 후 3일 이내 취소시 티켓 결제 금액이 환불됩니다. (예매 수수료 제외)</li>
          </ul>
        </section>

        <section className="accordion">
          <button className="accordion-row">
            예매 안내 사항 <span>›</span>
          </button>
          <button className="accordion-row">
            상품 · 기획사 · 판매자 정보 <span>›</span>
          </button>
        </section>
      </main>

      <footer className="cancel-footer">
        <button className="bookmark ghost" aria-label="즐겨찾기">♡</button>
        <button className="cta-btn">예매하기</button>
      </footer>
    </div>
  );
}

export default CancelPolicyScreen;

