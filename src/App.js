import { useMemo, useState } from 'react';
import './App.css';

import ReservationSelectScreen from './ReservationSelectScreen';
import TicketPaymentScreen from './TicketPaymentScreen';
import SuccessScreen from './SuccessScreen';
import MyDiningScreen from './MyDiningScreen';

const ADULT_PRICE = 24000;
const YOUTH_PRICE = 17000;

function App() {
  // 화면 상태
  // 'select' | 'payment' | 'success' | 'myDining'
  const [screen, setScreen] = useState('select');

  const [selectedDate, setSelectedDate] = useState(19);
  const [adult, setAdult] = useState(2);
  const [youth, setYouth] = useState(1);

  const totalPrice = useMemo(
    () => adult * ADULT_PRICE + youth * YOUTH_PRICE,
    [adult, youth]
  );

  const totalPeople = adult + youth;

  const summary = {
    title: '바스키아 : 과거와 미래를 잇는 상징적 기호들',
    dateText: `1월 ${selectedDate}일 (목)`,
    timeText: '오후 12시 15분',
    peopleText: `${totalPeople}명`,
  };

  /* =========================
     화면 분기
  ========================= */

  // 날짜 / 인원 선택
  if (screen === 'select') {
    return (
      <ReservationSelectScreen
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        adult={adult}
        setAdult={setAdult}
        youth={youth}
        setYouth={setYouth}
        adultPrice={ADULT_PRICE}
        youthPrice={YOUTH_PRICE}
        onNext={() => setScreen('payment')}
      />
    );
  }

  // 결제 화면
  if (screen === 'payment') {
    return (
      <TicketPaymentScreen
        adult={adult}
        youth={youth}
        totalPrice={totalPrice}
        onBack={() => setScreen('select')}
        onPay={() => setScreen('success')}
      />
    );
  }

  // 예매 완료 화면
  if (screen === 'success') {
    return (
      <SuccessScreen
        summary={summary}
        onClose={() => setScreen('myDining')}
      />
    );
  }

  // ✅ 마이 다이닝 화면 (추가된 부분)
  if (screen === 'myDining') {
    return <MyDiningScreen />;
  }

  return null;
  // compomtents 테스트용 코드
  //  return (
  //   <div
  //     style={{
  //       padding: 20,
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: 20,
  //     }}
  //   >
  //     {/* 🎨 전시 카드 */}
  //     <CultureCard
  //       title="바스키아 : 과거와 미래를 잇는 상징적 기호들"
  //       rating={4.7}
  //       reviewCount={128}
  //       location="동대문 디자인플라자"
  //       audience="전체 관람가"
  //       period="2026.01.01 ~ 2026.03.31"
  //       time="오전 10시 ~ 오후 8시"
  //       adultPrice={24000}
  //       youthPrice={17000}
  //       onReserve={() => alert('예매하기')}
  //       onSave={() => alert('저장')}
  //     />

  //     {/* 🍽 식당 카드 */}
  //     <RestaurantCard
  //       name="차만다 압구정"
  //       rating={4.6}
  //       category="유러피언 · 와인"
  //       location="압구정 로데오"
  //       images={[
  //         'https://images.unsplash.com/photo-1528605248644-14dd04022da1',
  //         'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  //       ]}
  //       dates={[
  //         { label: '오늘 (수)', status: 'closed' },
  //         { label: '내일 (목)', status: 'closed' },
  //         { label: '12.12(금)', status: 'open' },
  //         { label: '12.13(토)', status: 'open' },
  //       ]}
  //       onSave={() => alert('저장')}
  //       onSelectDate={(date) => alert(`${date.label} 선택`)}
  //     />
  //   </div>
  // );


}

export default App;
