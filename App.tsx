import { useState, useEffect, useRef } from 'react';

const images = {
  walking: 'https://image.qwenlm.ai/generated-images/4e87463a-5133-4047-984d-473a6a73586c/_result.png',
  boat: 'https://image.qwenlm.ai/generated-images/9d65521c-e5c1-4162-9727-f9002cff8e60/_result.png',
  baklava: 'https://image.qwenlm.ai/generated-images/da832b93-738c-49af-8a89-973ce301c815/_result.png',
  pistachio: 'https://image.qwenlm.ai/generated-images/eb02b591-ef49-4cd7-b3f0-084707b083bb/_result.png',
  hugging: 'https://image.qwenlm.ai/generated-images/91b6e018-8002-4166-abe3-f252969ee8f7/_result.png',
};

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 8,
    duration: 6 + Math.random() * 8, size: 12 + Math.random() * 24,
    opacity: 0.2 + Math.random() * 0.5,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div key={h.id} className="absolute animate-float-up" style={{
          left: `${h.left}%`, bottom: '-50px', animationDelay: `${h.delay}s`,
          animationDuration: `${h.duration}s`, fontSize: `${h.size}px`, opacity: h.opacity,
        }}>💕</div>
      ))}
    </div>
  );
}

function Sparkles() {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 4, duration: 2 + Math.random() * 3, size: 4 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <div key={s.id} className="absolute rounded-full bg-yellow-200 animate-sparkle" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
        }} />
      ))}
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let birthday = new Date(now.getFullYear(), 9, 8);
      if (now > birthday) birthday = new Date(now.getFullYear() + 1, 9, 8);
      if (now.getMonth() === 9 && now.getDate() === 8) { setIsBirthday(true); return; }
      const diff = birthday.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  if (isBirthday) return (
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🎂</div>
      <p className="text-2xl text-pink-200 font-light">Сегодня твой день!</p>
    </div>
  );
  return (
    <div className="text-center">
      <p className="text-pink-200/80 text-sm uppercase tracking-widest mb-4">До дня рождения осталось</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {[{ value: timeLeft.days, label: 'дней' }, { value: timeLeft.hours, label: 'часов' },
          { value: timeLeft.minutes, label: 'минут' }, { value: timeLeft.seconds, label: 'секунд' },
        ].map((item, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[80px] border border-white/10">
            <div className="text-3xl font-bold text-white">{item.value}</div>
            <div className="text-pink-200/70 text-xs mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelationshipCounter() {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeSinceMeeting, setTimeSinceMeeting] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const firstMeeting = new Date(now.getFullYear(), 6, 17);
      if (now < firstMeeting) firstMeeting.setFullYear(firstMeeting.getFullYear() - 1);
      const relationshipStart = new Date(now.getFullYear(), 7, 15);
      if (now < relationshipStart) relationshipStart.setFullYear(relationshipStart.getFullYear() - 1);
      const meetingDiff = now.getTime() - firstMeeting.getTime();
      setTimeSinceMeeting({
        days: Math.floor(meetingDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((meetingDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((meetingDiff / (1000 * 60)) % 60),
        seconds: Math.floor((meetingDiff / 1000) % 60),
      });
      const togetherDiff = now.getTime() - relationshipStart.getTime();
      setTimeTogether({
        days: Math.floor(togetherDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((togetherDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((togetherDiff / (1000 * 60)) % 60),
        seconds: Math.floor((togetherDiff / 1000) % 60),
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-4">
          <span className="text-4xl">👋</span>
          <h3 className="text-xl font-semibold text-white mt-2">Первая встреча</h3>
          <p className="text-pink-200/70 text-sm">17 июля</p>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {[{ value: timeSinceMeeting.days, label: 'дней' }, { value: timeSinceMeeting.hours, label: 'часов' },
            { value: timeSinceMeeting.minutes, label: 'минут' }, { value: timeSinceMeeting.seconds, label: 'секунд' },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-pink-200/70 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-400/30">
        <div className="text-center mb-4">
          <span className="text-4xl">💕</span>
          <h3 className="text-xl font-semibold text-white mt-2">Вместе с</h3>
          <p className="text-pink-200/70 text-sm">15 августа</p>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {[{ value: timeTogether.days, label: 'дней' }, { value: timeTogether.hours, label: 'часов' },
            { value: timeTogether.minutes, label: 'минут' }, { value: timeTogether.seconds, label: 'секунд' },
          ].map((item, i) => (
            <div key={i} className="bg-pink-500/20 rounded-lg p-3 min-w-[60px]">
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-pink-200/70 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveCake({ onCakeClick }: { onCakeClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="text-center">
      <div className="relative inline-block cursor-pointer transform transition-all duration-300 hover:scale-110"
        onClick={onCakeClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="text-8xl sm:text-9xl animate-bounce">🎂</div>
        {isHovered && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg">
            Нажми на меня! 👆
          </div>
        )}
      </div>
      <p className="text-pink-200/80 mt-4 text-lg">Нажми на торт для сюрприза!</p>
    </div>
  );
}

function FlyingHeart({ show, onClose }: { show: boolean; onClose: () => void }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
      <div className="relative animate-heart-fly-in" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <div className="text-[200px] sm:text-[300px] animate-pulse">💖</div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <p className="text-white text-3xl sm:text-5xl font-bold mb-4 drop-shadow-lg">Я тебя люблю!</p>
            <p className="text-pink-100 text-xl sm:text-2xl drop-shadow-lg">С Днём Рождения, Полина! 💕</p>
          </div>
        </div>
        <div className="absolute -top-10 -left-10 text-6xl animate-float">✨</div>
        <div className="absolute -top-10 -right-10 text-6xl animate-float" style={{ animationDelay: '0.5s' }}>💫</div>
        <div className="absolute -bottom-10 -left-10 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
        <div className="absolute -bottom-10 -right-10 text-6xl animate-float" style={{ animationDelay: '1.5s' }}>⭐</div>
      </div>
      <button onClick={onClose} className="absolute top-8 right-8 text-white/80 hover:text-white text-4xl transition-colors">✕</button>
    </div>
  );
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i, left: Math.random() * 100,
    color: ['#ff6b9d', '#ffd700', '#ff69b4', '#ff1493', '#ffb6c1', '#fff'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 2, duration: 2 + Math.random() * 3,
    size: 6 + Math.random() * 10, rotation: Math.random() * 360,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div key={p.id} className="absolute top-0 animate-confetti-fall" style={{
          left: `${p.left}%`, width: `${p.size}px`, height: `${p.size * 0.6}px`,
          backgroundColor: p.color, borderRadius: '2px',
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
          transform: `rotate(${p.rotation}deg)`,
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); };
  const handleCakeClick = () => { setShowHeart(true); triggerConfetti(); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] text-white overflow-hidden">
      <FloatingHearts />
      <Sparkles />
      <Confetti active={showConfetti} />
      <FlyingHeart show={showHeart} onClose={() => setShowHeart(false)} />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="absolute inset-0 z-0">
          <img src={images.walking} alt="Полина и Никита" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/80 via-[#2d1b4e]/60 to-[#1a0a2e]" />
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center max-w-3xl">
          <div className="text-6xl mb-6 animate-pulse">🕌</div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent leading-tight">
            С Днём Рождения,<br /><span className="text-6xl sm:text-8xl">Полина!</span>
          </h1>
          <p className="text-xl sm:text-2xl text-pink-200/80 font-light mb-8 leading-relaxed">
            8 октября — самый особенный день,<br />ведь в этот день появилась ты ✨
          </p>
          <div className="mb-12"><Countdown /></div>
          <button onClick={() => { setEnvelopeOpen(true); triggerConfetti(); }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105">
            <span className="text-2xl group-hover:scale-125 transition-transform">💌</span>
            Открыть поздравление
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {envelopeOpen && (
        <section className="relative py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
                <div className="text-center mb-8"><span className="text-5xl">💝</span></div>
                <div className="space-y-6 text-lg text-pink-100/90 leading-relaxed font-light">
                  <p className="text-center text-2xl text-pink-200 font-normal">Моя дорогая Полина!</p>
                  <p>В этот особенный день я хочу, чтобы ты знала — ты самое лучшее, что случалось в моей жизни. Каждый момент рядом с тобой наполнен счастьем и теплом. 💕</p>
                  <p>И как символично, что твой день рождения мы встречаем в одном из самых красивых городов мира — <span className="text-amber-200 font-normal">Стамбуле</span>! Город, где Восток встречает Запад, где Босфор соединяет два мира — совсем как ты соединяешь мою жизнь с мечтой. 🌊</p>
                  <p>Между нами есть что-то особенное — наша <span className="text-green-300 font-normal">фисташковая связь</span> 🌰, которая делает нас такими близкими и родными. Пусть Стамбул подарит нам незабываемые воспоминания, а я постараюсь сделать этот день таким же прекрасным, как ты. ✨</p>
                  <p className="text-center text-xl text-pink-200 pt-4">Люблю тебя бесконечно! 🤍</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 to-pink-200 bg-clip-text text-transparent mb-4">Полина и Никита в Стамбуле 🇹🇷</h2>
              <p className="text-pink-200/70 text-lg">Наши приключения вместе</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Гранд Базар', desc: 'Бубу и Дуду гуляют по знаменитому крытому рынку', image: images.walking },
              { title: 'Прогулка на лодке', desc: 'Романтический круиз по Босфору на закате', image: images.boat },
              { title: 'Турецкая пахлава', desc: 'Наслаждаемся вкуснейшими сладостями Стамбула', image: images.baklava },
              { title: 'Фисташковое мороженое', desc: 'Наша фисташковая связь в действии! 🌰', image: images.pistachio },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-pink-400/30 transition-all duration-500 hover:bg-white/10 group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-pink-200/70">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={images.hugging} alt="Полина и Никита обнимаются" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 sm:p-12 text-center w-full">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Празднуем вместе! 🎉</h2>
                  <p className="text-pink-200/90 text-lg max-w-2xl mx-auto">Каждый момент с тобой — это праздник. И сегодня мы празднуем самый важный день — твой день рождения!</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Наша история 💕</h2>
              <p className="text-pink-200/70 text-lg">Каждая секунда с тобой бесценна</p>
            </div>
          </AnimatedSection>
          <AnimatedSection><RelationshipCounter /></AnimatedSection>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection><h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">Мои пожелания тебе ✨</h2></AnimatedSection>
          <div className="space-y-6">
            {[
              { icon: '🌟', text: 'Пусть каждый день приносит тебе радость и вдохновение' },
              { icon: '💫', text: 'Пусть все мечты сбываются — даже самые смелые' },
              { icon: '🌹', text: 'Пусть любовь всегда согревает твоё сердце' },
              { icon: '🦋', text: 'Пусть жизнь будет такой же красивой и лёгкой, как ты' },
              { icon: '🌈', text: 'Пусть каждый новый день будет ярче предыдущего' },
            ].map((wish, i) => (
              <AnimatedSection key={i}>
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-pink-400/20 transition-all duration-300">
                  <span className="text-3xl flex-shrink-0">{wish.icon}</span>
                  <p className="text-left text-pink-100/90 text-lg">{wish.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent mb-12">Праздничный торт 🎂</h2>
          </AnimatedSection>
          <AnimatedSection><InteractiveCake onCakeClick={handleCakeClick} /></AnimatedSection>
           </div>
      </section>

      <section className="relative py-20 px-4">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-8 animate-pulse">💖</div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent mb-6">Ты — моё всё</h2>
            <p className="text-xl text-pink-200/80 leading-relaxed mb-8">С днём рождения, моя любимая Полина! Пусть этот год будет наполнен любовью, приключениями и счастьем. А я буду рядом, чтобы разделить всё это с тобой. 🤍</p>
            <button onClick={triggerConfetti} className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:scale-105">🎉 Праздновать!</button>
          </div>
        </AnimatedSection>
      </section>

      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-pink-200/40 text-sm">С любовью, для самой прекрасной Полины 💕</p>
        <p className="text-pink-200/30 text-xs mt-2">Стамбул • 8 октября 🕌</p>
      </footer>
    </div>
  );
}