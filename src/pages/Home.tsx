import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Modal Component ─── */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  price?: string;
  features?: string[];
  documents?: string[];
}

function Modal({ isOpen, onClose, title, description, price, features, documents }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70" 
      onClick={onClose}
      style={{ backdropFilter: 'none' }}
    >
      <div 
        className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-white/10" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full dark:bg-white/10 bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:text-primary-500 hover:bg-primary-500/10 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Content */}
        <div className="pr-2">
          <h3 className="font-heading font-bold text-2xl dark:text-white text-gray-900 mb-3">{title}</h3>
          <p className="dark:text-gray-400 text-gray-600 mb-6 leading-relaxed">{description}</p>

          {price && (
            <div className="mb-6">
              <p className="text-sm dark:text-gray-500 text-gray-400 mb-1">Стоимость:</p>
              <p className="text-2xl font-bold text-gradient">{price}</p>
            </div>
          )}

          {features && features.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold dark:text-white text-gray-900 mb-3">Что включает:</p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 dark:text-gray-300 text-gray-700">
                    <span className="text-accent-500 mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {documents && documents.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold dark:text-white text-gray-900 mb-3">Необходимые документы:</p>
              <ul className="space-y-2">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 dark:text-gray-300 text-gray-700">
                    <span className="text-primary-500 mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"/>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href="https://wa.me/79094311193"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
            </svg>
            Записаться через WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Service Details for Modals ─── */
const serviceDetails: Record<string, { description: string; price?: string; features?: string[]; documents?: string[] }> = {
  'tech-inspection': {
    description: 'Проводим технический осмотр всех категорий транспортных средств с внесением в единую автоматизированную информационную систему технического осмотра (ЕАИСТО). Выдаем диагностическую карту установленного образца.',
    price: 'от 1 700 ₽ (по предварительной записи)',
    features: [
      'Внешний осмотр транспортного средства',
      'Проверка работы тормозной системы',
      'Диагностика рулевого управления',
      'Проверка световых приборов',
      'Проверка выхлопной системы',
      'Внесение данных в ЕАИСТО',
      'Выдача диагностической карты',
    ],
    documents: [
      'Паспорт собственника',
      'Свидетельство о регистрации ТС (СТС)',
      'Доверенность (если владелец другой)',
    ],
  },
  'insurance': {
    description: 'Оформляем полисы ОСАГО и КАСКО от ведущих страховых компаний России. Помощь в выборе оптимальной программы страхования.',
    price: 'ОСАГО от 5 000 ₽, КАСКО — индивидуально',
    features: [
      'Оформление ОСАГО за 15 минут',
      'Скидки за безаварийную езду (КБМ)',
      'Возможность оформления без визита в офис',
      'Помощь при наступлении страхового случая',
      'Работаем со всеми крупными страховыми',
    ],
    documents: [
      'Паспорт собственника',
      'Водительские удостоверения всех водителей',
      'Свидетельство о регистрации ТС',
      'Диагностическая карта (для ОСАГО)',
      'Предыдущий полис (если есть)',
    ],
  },
  'license-replacement': {
    description: 'Помогаем заменить водительское удостоверение в связи с окончанием срока действия, утратой, изменением персональных данных.',
    price: 'от 2 000 ₽ (без учета госпошлины)',
    features: [
      'Помощь в подготовке документов',
      'Запись в ГИБДД',
      'Сопровождение при необходимости',
      'Срок оформления от 1 дня',
    ],
    documents: [
      'Паспорт',
      'Старое водительское удостоверение',
      'Медицинская справка (форма 003-В/у)',
      'Квитанция об оплате госпошлины',
    ],
  },
  'registration': {
    description: 'Помощь в постановке автомобилей на учет в ГИБДД. Снятие с учета, внесение изменений в регистрационные данные.',
    price: 'от 3 000 ₽ (без учета госпошлин)',
    features: [
      'Подготовка полного пакета документов',
      'Запись в ГИБДД на удобное время',
      'Сопровождение в ГИБДД',
      'Помощь в получении номеров',
    ],
    documents: [
      'Паспорт собственника',
      'ПТС (паспорт транспортного средства)',
      'СТС (старое, если есть)',
      'Договор купли-продажи',
      'Полис ОСАГО',
      'Квитанции об оплате госпошлин',
    ],
  },
  'medical': {
    description: 'Оформление медицинских справок для водителей всех категорий (форма 003-В/у). Прохождение медкомиссии за 30 минут.',
    price: 'от 1 500 ₽',
    features: [
      'Все врачи в одном месте',
      'Без очередей',
      'Справка готова за 30-40 минут',
      'Действует 12 месяцев',
      'Официальная лицензия',
    ],
    documents: [
      'Паспорт',
      'Водительское удостоверение (если есть)',
      'Старая медсправка (если есть)',
    ],
  },
  'life-insurance': {
    description: 'Страхование жизни и здоровья, ипотечное страхование. Индивидуальные программы под ваши потребности.',
    price: 'индивидуальный расчет',
    features: [
      'Страхование от несчастных случаев',
      'Ипотечное страхование',
      'Накопительное страхование жизни',
      'Гибкие программы',
      'Выплаты до 10 млн ₽',
    ],
    documents: [
      'Паспорт',
      'Медицинская справка (для больших сумм)',
    ],
  },
  'property-insurance': {
    description: 'Страхование домов, квартир, дач и другого имущества от пожара, затопления, кражи и других рисков.',
    price: 'от 3 000 ₽ в год',
    features: [
      'Страхование от огня и воды',
      'Защита от кражи со взломом',
      'Страхование гражданской ответственности',
      'Выплаты до 10 млн ₽',
      'Оплата в рассрочку',
    ],
    documents: [
      'Паспорт',
      'Документы на имущество',
    ],
  },
  'training': {
    description: 'Обучение вождению на все категории прав (A, B, C, D) и спецтехнику. Теоретические и практические занятия.',
    price: 'от 25 000 ₽ (категория B)',
    features: [
      'Лицензированная автошкола',
      'Опытные инструкторы',
      'Современные автомобили',
      'Гибкий график занятий',
      'Возможна рассрочка',
      'Помощь в сдаче экзаменов в ГИБДД',
    ],
    documents: [
      'Паспорт',
      'ИНН',
      'Фото 3x4 (2 шт.)',
      'Медицинская справка',
    ],
  },
  'contracts': {
    description: 'Составление и оформление договоров купли-продажи автомобилей. Юридическая проверка чистоты сделки.',
    price: 'от 1 500 ₽',
    features: [
      'Проверка автомобиля по базам',
      'Проверка на ограничения и залоги',
      'Правильное оформление договора',
      'Консультация по сделке',
      'Готовность за 30 минут',
    ],
    documents: [
      'Паспорта обеих сторон',
      'ПТС автомобиля',
      'СТС автомобиля',
    ],
  },
  'leasing': {
    description: 'Оформление автомобилей в лизинг для физических и юридических лиц. Выгодные условия от партнеров.',
    price: 'индивидуальный расчет',
    features: [
      'Первоначальный взнос от 0%',
      'Срок лизинга до 5 лет',
      'Минимум документов',
      'Рассмотрение заявки за 1 день',
      'Любые автомобили: новые и с пробегом',
    ],
    documents: [
      'Паспорт',
      'Водительское удостоверение',
      'Справка о доходах (2-НДФЛ)',
      'Трудовая книжка (копия)',
    ],
  },
};

/* ─── Hooks ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const children = el.querySelectorAll('.reveal');
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─── SVG Icons ─── */
const ShieldCheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const CarFrontIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IdCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4"/><path d="M14 14h4"/>
  </svg>
);

const ClipboardListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18"/><path d="M3 7l9-4 9 4"/><path d="M3 7v5c0 1.1 2.7 2 6 2s6-.9 6-2V7"/><path d="M18 7v5c0 1.1 2.7 2 6 2"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const WifiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);

const TvIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const ParkingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
  </svg>
);

const SofaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3"/><path d="M2 15v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M4 15v2"/><path d="M20 15v2"/><path d="M4 17h16"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

const MapPinLargeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneLargeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

/* ─── Services data ─── */
const services = [
  { name: 'Техосмотр', desc: 'Технический осмотр транспортных средств с внесением в ЕАИСТО', icon: CarFrontIcon, featured: true, key: 'tech-inspection' },
  { name: 'Каско и ОСАГО', desc: 'Оформление полисов обязательного и добровольного страхования', icon: ShieldCheckIcon, key: 'insurance' },
  { name: 'Замена ВУ', desc: 'Замена водительского удостоверения, помощь в оформлении', icon: IdCardIcon, key: 'license-replacement' },
  { name: 'Постановка на учёт', desc: 'Регистрация автомобилей в ГИБДД, все виды регистрационных действий', icon: ClipboardListIcon, key: 'registration' },
  { name: 'Медсправки', desc: 'Медицинские справки на все категории водительских прав', icon: HeartIcon, key: 'medical' },
  { name: 'Страхование жизни', desc: 'Страхование жизни и ипотеки, индивидуальные программы', icon: HeartIcon, key: 'life-insurance' },
  { name: 'Страхование имущества', desc: 'Страхование домов, квартир и другого имущества', icon: HomeIcon, key: 'property-insurance' },
  { name: 'Обучение', desc: 'Обучение на все категории водительских прав и спецтехнику', icon: GraduationCapIcon, key: 'training' },
  { name: 'Договоры купли-продажи', desc: 'Составление и оформление договоров купли-продажи автомобилей', icon: ScaleIcon, key: 'contracts' },
  { name: 'Лизинг авто', desc: 'Оформление автомобилей в лизинг для физических и юридических лиц', icon: BriefcaseIcon, key: 'leasing' },
];

/* ─── Team data ─── */
const teamMembers = [
  {
    name: 'Свиридова Оксана Валерьевна',
    role: 'Владелец, эксперт по техосмотру',
    phone: '+7 909 431 11 93',
    phoneLink: '+79094311193',
    photo: `${import.meta.env.BASE_URL}images/image.jpg`,
    initials: 'СО',
  },
  {
    name: 'Лавренко Данил Михайлович',
    role: 'Оператор техосмотра',
    phone: '+7 960-455-60-22',
    phoneLink: '+79604556022',
    photo: `${import.meta.env.BASE_URL}images/image1.jpg`,
    initials: 'ЛД',
  },
  {
    name: 'Ткаченко Дмитрий Юрьевич',
    role: 'Оператор техосмотра',
    phone: '+7 989-522-45-26',
    phoneLink: '+79895224526',
    photo: `${import.meta.env.BASE_URL}images/image2.jpg`,
    initials: 'ТД',
  },
];

/* ─── Working hours ─── */
const workingHours = [
  { day: 'Понедельник', hours: '9:00 — 15:00' },
  { day: 'Вторник', hours: '8:30 — 16:00' },
  { day: 'Среда', hours: '8:30 — 16:00' },
  { day: 'Четверг', hours: '8:30 — 15:00' },
  { day: 'Пятница', hours: '8:30 — 16:00' },
  { day: 'Суббота', hours: '8:30 — 16:00' },
  { day: 'Воскресенье', hours: 'Выходной' },
];

/* ─── Phone mask helper ─── */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  const d = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;
  let formatted = '+7';
  if (d.length > 0) formatted += ' (' + d.slice(0, 3);
  if (d.length >= 3) formatted += ') ' + d.slice(3, 6);
  if (d.length >= 6) formatted += '-' + d.slice(6, 8);
  if (d.length >= 8) formatted += '-' + d.slice(8, 10);
  return formatted;
}

function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/* ─── Team Card Component ─── */
function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  const [imgError, setImgError] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgError(false);
    img.onerror = () => setImgError(true);
    img.src = member.photo;
  }, [member.photo]);

  return (
    <div className="group card-hover rounded-2xl overflow-hidden dark:bg-white/3 bg-white border dark:border-white/8 border-gray-200 shadow-lg dark:shadow-black/20 shadow-gray-200/50">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {imgError ? (
          <div className="w-full h-full team-photo-placeholder flex items-center justify-center">
            <span className="text-5xl font-bold text-white/80 font-heading">{member.initials}</span>
          </div>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg dark:text-white text-gray-900 mb-1">{member.name}</h3>
        <p className="text-sm dark:text-gray-400 text-gray-600 mb-3">{member.role}</p>
        <a
          href={`tel:${member.phoneLink}`}
          className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-400 transition-colors"
        >
          <PhoneLargeIcon /> {member.phone}
        </a>
      </div>
    </div>
  );
}

/* ─── Contact Form Component ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', car: '', time: '', comment: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setForm(prev => ({ ...prev, phone: formatted }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Введите имя (минимум 2 символа)';
    const digits = getPhoneDigits(form.phone);
    if (digits.length < 11) errs.phone = 'Введите корректный номер телефона';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const timeLabels: Record<string, string> = {
      morning: 'Утро (8:30 — 11:00)',
      day: 'День (11:00 — 14:00)',
      afternoon: 'После обеда (14:00 — 16:00)',
    };

    const message = `🚗 Новая заявка на техосмотр\n\n👤 Имя: ${form.name}\n📱 Телефон: ${form.phone}\n🚙 Авто: ${form.car || 'Не указано'}\n⏰ Время: ${timeLabels[form.time] || 'Не указано'}\n💬 Комментарий: ${form.comment || 'Нет'}`;

    const whatsappNumber = '79094311193';
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-500/10 flex items-center justify-center">
          <CheckCircleIcon />
        </div>
        <h3 className="font-heading font-bold text-2xl dark:text-white text-gray-900 mb-2">Заявка сформирована!</h3>
        <p className="dark:text-gray-400 text-gray-600 mb-6">
          Открылось окно WhatsApp с готовым сообщением. Нажмите "Отправить" в WhatsApp, и мы сразу же перезвоним вам!
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', car: '', time: '', comment: '' }); }}
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all"
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1.5">
          Имя <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Ваше имя"
          className={`w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-gray-50 border ${errors.name ? 'border-red-400' : 'dark:border-white/10 border-gray-200'} dark:text-white text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:outline-none`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1.5">
          Телефон <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={handlePhoneChange}
          placeholder="+7 (___) ___-__-__"
          className={`w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-gray-50 border ${errors.phone ? 'border-red-400' : 'dark:border-white/10 border-gray-200'} dark:text-white text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:outline-none`}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1.5">Марка автомобиля</label>
        <input
          type="text"
          value={form.car}
          onChange={(e) => setForm(prev => ({ ...prev, car: e.target.value }))}
          placeholder="Например: Toyota Camry"
          className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1.5">Удобное время</label>
        <select
          value={form.time}
          onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 transition-all focus:border-primary-500 focus:outline-none appearance-none pr-10"
        >
          <option value="">Выберите время</option>
          <option value="morning">Утро (8:30 — 11:00)</option>
          <option value="day">День (11:00 — 14:00)</option>
          <option value="afternoon">После обеда (14:00 — 16:00)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1.5">Комментарий</label>
        <textarea
          value={form.comment}
          onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
          placeholder="Дополнительная информация"
          rows={3}
          className="w-full px-4 py-3 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 placeholder-gray-500 transition-all focus:border-primary-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-primary-500/25 active:scale-[0.98]"
      >
        <SendIcon /> Записаться на техосмотр
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const containerRef = useScrollReveal();

  const stat1 = useCounter(10);
  const stat2 = useCounter(5000);
  const stat3 = useCounter(20);
  const stat4 = useCounter(100);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToForm = useCallback(() => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToServices = useCallback(() => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openServiceModal = (serviceKey: string) => {
    setSelectedService(serviceKey);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <div ref={containerRef}>
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dark:bg-surface-950 bg-gradient-to-b dark:from-surface-950 from-blue-50 dark:to-surface-900 to-white" />
        <div className="aurora-blob w-[500px] h-[500px] bg-primary-500/30 dark:bg-primary-500/20 top-[-100px] left-[-100px] animate-aurora-1" />
        <div className="aurora-blob w-[400px] h-[400px] bg-accent-500/20 dark:bg-accent-500/15 top-[200px] right-[-50px] animate-aurora-2" />
        <div className="aurora-blob w-[300px] h-[300px] bg-purple-500/15 dark:bg-purple-500/10 bottom-[100px] left-[30%] animate-aurora-3" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-primary-500/10 bg-primary-500/5 border dark:border-primary-500/20 border-primary-500/10 mb-8">
              <ShieldCheckIcon />
              <span className="text-sm font-medium text-primary-500">Официальная аккредитация РСА</span>
            </div>

            <h1 className="reveal reveal-delay-1 fluid-h1 font-heading font-extrabold dark:text-white text-gray-900 mb-6">
              Техосмотр в Шахтах{' '}
              <span className="text-gradient">за 20 минут</span>{' '}
              официально
            </h1>

            <p className="reveal reveal-delay-2 text-lg md:text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Пункт техосмотра и страховой центр «АвтоЭксперт» — все услуги для автовладельцев в одном месте. Работаем более 10 лет.
            </p>

            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={scrollToForm}
                className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-500/25 flex items-center gap-2"
              >
                Записаться на техосмотр
                <ArrowDownIcon />
              </button>
              <button
                onClick={scrollToServices}
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-white text-gray-900 border dark:border-white/10 border-gray-200"
              >
                Наши услуги
              </button>
            </div>

            <div className="reveal reveal-delay-4 flex flex-wrap items-center justify-center gap-6 text-sm dark:text-gray-400 text-gray-500">
              <a href="tel:+79094311193" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <PhoneLargeIcon /> +7 909 431 11 93
              </a>
              <span className="flex items-center gap-2">
                <MapPinLargeIcon /> пер. Мечникова, 1А
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 dark:border-white/20 border-gray-300 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-primary-500 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════ STATS SECTION ═══════ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { counter: stat1, suffix: '+', label: 'Лет опыта', icon: <AwardIcon /> },
              { counter: stat2, suffix: '+', label: 'Довольных клиентов', icon: <UsersIcon /> },
              { counter: stat3, suffix: '', label: 'Минут — среднее время', icon: <ClockIcon /> },
              { counter: stat4, suffix: '%', label: 'Официально', icon: <ShieldCheckIcon /> },
            ].map((stat, i) => (
              <div
                key={i}
                ref={stat.counter.ref}
                className="reveal glass rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-primary-500 mb-3 flex justify-center">{stat.icon}</div>
                <div className="font-heading font-bold text-3xl md:text-4xl dark:text-white text-gray-900 mb-1">
                  {stat.counter.count}{stat.suffix}
                </div>
                <div className="text-sm dark:text-gray-400 text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ADVANTAGES SECTION ═══════ */}
      <section id="advantages" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Почему выбирают <span className="text-gradient">нас</span>
            </h2>
            <p className="reveal reveal-delay-1 text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Мы создали комфортные условия, чтобы визит к нам был быстрым и приятным
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ShieldCheckIcon />, title: 'Аккредитация РСА', desc: 'Официальная аккредитация в Российском Союзе Автостраховщиков' },
              { icon: <FileTextIcon />, title: 'Внесение в ЕАИСТО', desc: 'Гарантия внесения данных в единую автоматизированную систему' },
              { icon: <ClockIcon />, title: 'Без очередей', desc: 'Быстрое обслуживание без задержек, по предварительной записи' },
              { icon: <BriefcaseIcon />, title: 'Работа с юрлицами', desc: 'Обслуживаем как физических, так и юридических лиц' },
              { icon: <ParkingIcon />, title: 'Бесплатная парковка', desc: 'Удобная парковка рядом с пунктом техосмотра' },
              { icon: <SofaIcon />, title: 'Зона ожидания', desc: 'Комфортная зона ожидания с Wi-Fi, телевизором, кофе и чаем' },
            ].map((adv, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} glass rounded-2xl p-6 card-hover group`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  {adv.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg dark:text-white text-gray-900 mb-2">{adv.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES SECTION ═══════ */}
      <section id="services" className="py-20 md:py-28 dark:bg-surface-900/50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Наши <span className="text-gradient">услуги</span>
            </h2>
            <p className="reveal reveal-delay-1 text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Полный спектр услуг для автовладельцев в одном месте
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                className={`reveal card-hover rounded-2xl overflow-hidden ${
                  service.featured ? 'sm:col-span-2 lg:col-span-3 relative' : ''
                }`}
              >
                {service.featured ? (
                  <div className="relative glass-strong rounded-2xl p-8 md:p-10 gradient-border overflow-hidden">
                    <div className="absolute top-4 right-4 px-3 py-1 bg-warn-500/20 text-warn-500 text-xs font-bold rounded-full uppercase tracking-wider">
                      Популярное
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary-500/15 flex items-center justify-center text-primary-500 shrink-0">
                        <service.icon />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-2xl dark:text-white text-gray-900 mb-2">{service.name}</h3>
                        <p className="dark:text-gray-400 text-gray-600 mb-4 leading-relaxed">{service.desc}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-4 py-2 rounded-xl bg-accent-500/10 text-accent-500 font-bold text-lg">
                            от 1 700 ₽
                          </span>
                          <button
                            onClick={() => openServiceModal(service.key || '')}
                            className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all hover:scale-105"
                          >
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass rounded-2xl p-6 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4">
                      <service.icon />
                    </div>
                    <h3 className="font-heading font-semibold text-lg dark:text-white text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed flex-1">{service.desc}</p>
                    <div className="mt-4 pt-4 border-t dark:border-white/5 border-gray-100">
                      <button
                        onClick={() => openServiceModal(service.key || '')}
                        className="text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors"
                      >
                        Подробнее →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING SECTION ═══════ */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Стоимость <span className="text-gradient">услуг</span>
            </h2>
          </div>

          <div className="reveal max-w-2xl mx-auto mb-12">
            <div className="relative glass-strong rounded-3xl p-8 md:p-10 gradient-border text-center animate-pulse-glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-warn-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Специальная цена
              </div>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-500/15 flex items-center justify-center text-primary-500">
                <CarFrontIcon />
              </div>
              <h3 className="font-heading font-bold text-2xl dark:text-white text-gray-900 mb-2">
                Технический осмотр
              </h3>
              <p className="dark:text-gray-400 text-gray-600 mb-6">Полный осмотр транспортного средства с выдачей диагностической карты</p>
              <div className="mb-6">
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-gradient">1 700 ₽</span>
                <p className="text-sm dark:text-gray-500 text-gray-400 mt-2">по предварительной записи</p>
              </div>
              <ul className="text-left max-w-sm mx-auto space-y-2 mb-8">
                {[
                  'Внесение в ЕАИСТО',
                  'Диагностическая карта',
                  'Подлинность гарантирована',
                  'Оплата: наличные, карта, перевод',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm dark:text-gray-300 text-gray-700">
                    <span className="text-accent-500 shrink-0"><CheckCircleIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openServiceModal('tech-inspection')}
                className="w-full sm:w-auto px-10 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary-500/25"
              >
                Подробнее об услуге
              </button>
            </div>
          </div>

          <div className="reveal text-center">
            <p className="dark:text-gray-400 text-gray-600 mb-4">
              Стоимость других услуг уточняйте по телефону или в WhatsApp
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:+79094311193"
                className="px-6 py-3 rounded-xl border dark:border-white/10 border-gray-200 dark:text-white text-gray-900 font-medium hover:bg-primary-500/10 hover:text-primary-500 hover:border-primary-500/30 transition-all"
              >
                Позвонить
              </a>
              <a
                href="https://wa.me/79094311193"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-medium hover:bg-[#25D366]/20 transition-all"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TEAM SECTION ═══════ */}
      <section id="team" className="py-20 md:py-28 dark:bg-surface-900/50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Наша <span className="text-gradient">команда</span>
            </h2>
            <p className="reveal reveal-delay-1 text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом работы
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Как <span className="text-gradient">записаться</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Оставьте заявку', desc: 'Заполните форму на сайте или позвоните нам' },
              { step: '02', title: 'Мы перезвоним', desc: 'Подтвердим запись и согласуем удобное время' },
              { step: '03', title: 'Приезжайте', desc: 'Бесплатная парковка, комфортная зона ожидания' },
              { step: '04', title: 'Получите карту', desc: 'Диагностическая карта с внесением в ЕАИСТО' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} relative`}>
                <div className="glass rounded-2xl p-6 text-center h-full card-hover">
                  <div className="font-heading font-extrabold text-5xl text-primary-500/15 mb-3">{item.step}</div>
                  <h3 className="font-heading font-semibold text-lg dark:text-white text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-primary-500/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AMENITIES SECTION ═══════ */}
      <section className="py-20 md:py-28 dark:bg-surface-900/50 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Комфорт для <span className="text-gradient">клиентов</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <ParkingIcon />, label: 'Бесплатная парковка' },
              { icon: <WifiIcon />, label: 'Бесплатный Wi-Fi' },
              { icon: <TvIcon />, label: 'Телевизор' },
              { icon: <CoffeeIcon />, label: 'Кофе и чай' },
              { icon: <SofaIcon />, label: 'Зона ожидания' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 5)} glass rounded-2xl p-6 text-center card-hover group`}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-500 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <p className="text-sm font-medium dark:text-gray-300 text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACTS SECTION ═══════ */}
      <section id="contacts" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Наши <span className="text-gradient">контакты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div className="reveal glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                    <MapPinLargeIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-gray-900 mb-1">Адрес</h3>
                    <p className="dark:text-gray-400 text-gray-600">346500, Ростовская область, г. Шахты, переулок Мечникова, 1А</p>
                    <a
                      href="https://yandex.ru/maps/-/CDaZiE~P"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-400 transition-colors mt-2"
                    >
                      <NavigationIcon /> Проложить маршрут
                    </a>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-delay-1 glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                    <PhoneLargeIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-gray-900 mb-1">Телефон / WhatsApp</h3>
                    <a href="tel:+79094311193" className="text-lg font-medium dark:text-white text-gray-900 hover:text-primary-500 transition-colors">
                      +7 909 431 11 93
                    </a>
                    <div className="flex gap-2 mt-3">
                      <a href="tel:+79094311193" className="px-4 py-2 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-medium hover:bg-primary-500/20 transition-all">
                        Позвонить
                      </a>
                      <a href="https://wa.me/79094311193" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-all">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-delay-2 glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-500 shrink-0 mt-0.5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white text-gray-900 mb-1">Email</h3>
                    <a href="mailto:sviridova2oksana@mail.ru" className="dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                      sviridova2oksana@mail.ru
                    </a>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-delay-3 glass rounded-2xl p-6">
                <h3 className="font-semibold dark:text-white text-gray-900 mb-4">Режим работы</h3>
                <div className="space-y-2">
                  {workingHours.map((wh, i) => (
                    <div key={i} className={`flex justify-between text-sm py-1.5 ${i < workingHours.length - 1 ? 'border-b dark:border-white/5 border-gray-100' : ''}`}>
                      <span className={`${wh.hours === 'Выходной' ? '' : 'dark:text-gray-300 text-gray-700'} ${wh.hours === 'Выходной' ? 'dark:text-gray-500 text-gray-400' : ''}`}>{wh.day}</span>
                      <span className={`font-medium ${wh.hours === 'Выходной' ? 'dark:text-gray-500 text-gray-400' : 'dark:text-white text-gray-900'}`}>{wh.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs dark:text-gray-500 text-gray-400 dark:bg-white/3 bg-gray-50 rounded-lg p-3">
                  В остальное время работаем по предварительной записи. Звоните или пишите в WhatsApp.
                </p>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <div className="glass rounded-2xl overflow-hidden h-full min-h-[400px] lg:min-h-full">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=40.231948%2C47.687890&pt=40.231948,47.687890&z=16&l=map"
                  width="100%"
                  height="100%"
                  style={{ minHeight: '500px' }}
                  frameBorder="0"
                  title="Карта — АвтоЭксперт, г. Шахты, пер. Мечникова, 1А"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT FORM SECTION ═══════ */}
      <section id="contact-form" className="py-20 md:py-28 dark:bg-surface-900/50 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="reveal fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-4">
              Записаться на <span className="text-gradient">техосмотр</span>
            </h2>
            <p className="reveal reveal-delay-1 dark:text-gray-400 text-gray-600">
              Оставьте заявку, и мы перезвоним для подтверждения записи
            </p>
          </div>

          <div className="reveal reveal-delay-2 glass-strong rounded-3xl p-6 md:p-10 gradient-border">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && serviceDetails[selectedService] && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={services.find(s => s.key === selectedService)?.name || ''}
          description={serviceDetails[selectedService].description}
          price={serviceDetails[selectedService].price}
          features={serviceDetails[selectedService].features}
          documents={serviceDetails[selectedService].documents}
        />
      )}
    </div>
  );
}