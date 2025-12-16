import { useMemo, useState } from 'react';
import './App.css';

import ReservationSelectScreen from './ReservationSelectScreen';
import TicketPaymentScreen from './TicketPaymentScreen';
import SuccessScreen from './SuccessScreen';
import RestaurantCard from './components/RestaurantCard';
import CultureCard from './components/CultureCard';


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
  if (screen === 'preview') {
    return (
      <div style={{ padding: 20 }}>
        <RestaurantCard
          name="차만다 압구정"
          rating={4.8}
          category="한식"
          location="압구정"
          distance="730m"
          openTime="09:00"
          closeTime="22:00"
          images={['', '']}
          dates={['12/12(금)', '12/13(토)']}
          onSave={() => alert('저장')}
        />
      </div>
    );
  }

 return (
    <div style={{ padding: 20, background: '#f5f5f5', minHeight: '100vh' }}>
      <RestaurantCard
        name="차만다 압구정"
        rating={4.8}
        category="한식"
        location="압구정"
        images={['', '']}
        dates={[
          { label: '오늘 (수)', status: 'closed' },
          { label: '내일 (목)', status: 'closed' },
          { label: '12.12(금)', status: 'open' },
          { label: '12.13(토)', status: 'open' },
        ]}
        onSelectDate={(date) => console.log('선택:', date)}
      />
      <CultureCard
  title="바스키아 : 과거와 미래를 잇는 상징적 기호들"
  rating={4.8}
  reviewCount={24}
  location="동대문 디자인 플라자"
  audience="전체관람가"
  period="2025.09.23 - 2026.01.31"
  time="09:00 - 22:00"
  adultPrice={24000}
  youthPrice={17000}
  onReserve={() => alert('예매하기')}
  onSave={() => alert('저장')}
/>
    </div>
    
  );
  
}

export default App;
