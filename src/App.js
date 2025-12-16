import { useMemo, useState } from 'react';
import './App.css';

import ReservationSelectScreen from './ReservationSelectScreen';
import TicketPaymentScreen from './TicketPaymentScreen';
import SuccessScreen from './SuccessScreen';

const ADULT_PRICE = 24000;
const YOUTH_PRICE = 17000;

function App() {
  // 화면 상태
  // 'select' | 'payment' | 'success'
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

  // 예매 완료
  if (screen === 'success') {
    return (
      <SuccessScreen
        summary={summary}
        onClose={() => setScreen('select')}
      />
    );
  }

  return null;
}

export default App;
