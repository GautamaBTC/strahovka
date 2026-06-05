import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 's1', title: '1. Общие положения' },
  { id: 's2', title: '2. Предмет политики конфиденциальности' },
  { id: 's3', title: '3. Цели сбора персональных данных' },
  { id: 's4', title: '4. Способы и сроки обработки' },
  { id: 's5', title: '5. Обязательства сторон' },
  { id: 's6', title: '6. Использование файлов cookie' },
  { id: 's7', title: '7. Защита персональных данных' },
  { id: 's8', title: '8. Права пользователя' },
  { id: 's9', title: '9. Заключительные положения' },
];

export default function Privacy() {
  const [active, setActive] = useState('s1');

  const handleScroll = useCallback(() => {
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActive(sections[i].id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <div className="relative overflow-hidden dark:bg-surface-900/50 bg-gray-50 py-12 md:py-16">
        <div className="aurora-blob w-[300px] h-[300px] bg-primary-500/10 -top-[100px] right-[-50px] animate-aurora-1" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="fluid-h2 font-heading font-bold dark:text-white text-gray-900 mb-3">
            Политика конфиденциальности
          </h1>
          <p className="dark:text-gray-400 text-gray-600">
            Дата последнего обновления: 29 апреля 2026 г.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex gap-10">
          {/* Sidebar TOC - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-28 space-y-1">
              <p className="text-xs uppercase tracking-wider dark:text-gray-500 text-gray-400 font-semibold mb-3">Оглавление</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`toc-link block py-2 px-3 text-sm rounded-lg transition-all border-l-2 ${
                    active === s.id
                      ? 'text-primary-500 border-primary-500 dark:bg-primary-500/5 bg-primary-500/5 font-medium'
                      : 'dark:text-gray-400 text-gray-600 border-transparent hover:text-primary-500 hover:border-primary-500/30'
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Mobile TOC */}
          <div className="lg:hidden mb-8 w-full">
            <details className="glass rounded-2xl overflow-hidden">
              <summary className="px-5 py-4 cursor-pointer font-medium dark:text-white text-gray-900 text-sm">
                Оглавление (нажмите для раскрытия)
              </summary>
              <div className="px-5 pb-4 space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block py-2 text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </details>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="prose dark:prose-invert max-w-none w-full space-y-8 text-base leading-relaxed dark:text-gray-300 text-gray-700">

              <section id="s1">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
                <p className="mb-3">1.1. Настоящая Политика конфиденциальности (далее — «Политика») действует в отношении всей информации, которую Индивидуальный предприниматель Свиридова Оксана Валерьевна (ОГРНИП: 326619600105912, ИНН: 615521270061, адрес: 346500, Ростовская область, г. Шахты, переулок Мечникова, 1А) может получить о Пользователе во время использования сайта.</p>
                <p>1.2. Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и Постановлением Правительства РФ от 01.11.2012 № 1119.</p>
              </section>

              <section id="s2">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">2. ПРЕДМЕТ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</h2>
                <p className="mb-3">2.1. Настоящая Политика устанавливает обязательства ИП Свиридова О.В. по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет по запросу ИП Свиридова О.В. при использовании Сайта.</p>
                <p className="mb-3">2.2. Персональные данные, разрешённые к обработке в рамках данной Политики, предоставляются Пользователем путём заполнения форм на Сайте и включают в себя:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Фамилию, имя, отчество;</li>
                  <li>Контактный телефон;</li>
                  <li>Адрес электронной почты;</li>
                  <li>Марку и модель автомобиля;</li>
                  <li>Иные данные, необходимые для оказания услуг.</li>
                </ul>
                <p>2.3. Сайт осуществляет сбор обезличенных данных о Посетителях с помощью cookies, метрических программ.</p>
              </section>

              <section id="s3">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">3. ЦЕЛИ СБОРА ПЕРСОНАЛЬНЫХ ДАННЫХ ПОЛЬЗОВАТЕЛЯ</h2>
                <p className="mb-3">3.1. ИП Свиридова О.В. собирает и хранит только те персональные данные, которые необходимы для:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Связи с Пользователем, включая направление уведомлений и запросов;</li>
                  <li>Оказания услуг по техническому осмотру транспортных средств;</li>
                  <li>Оформления документов (диагностических карт, полисов ОСАГО);</li>
                  <li>Информирования об услугах и специальных предложениях;</li>
                  <li>Проведения статистических и иных исследований;</li>
                  <li>Улучшения качества услуг.</li>
                </ul>
              </section>

              <section id="s4">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">4. СПОСОБЫ И СРОКИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
                <p className="mb-3">4.1. Обработка персональных данных Пользователя осуществляется без ограничения срока любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств.</p>
                <p className="mb-3">4.2. Персональные данные Пользователя могут быть переданы уполномоченным органам государственной власти Российской Федерации только по основаниям и в порядке, установленным законодательством РФ.</p>
                <p>4.3. При утрате или разглашении персональных данных ИП Свиридова О.В. обязуется немедленно уведомить Пользователя об утрате или разглашении его персональных данных.</p>
              </section>

              <section id="s5">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">5. ОБЯЗАТЕЛЬСТВА СТОРОН</h2>
                <p className="mb-2">5.1. Пользователь обязан:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Предоставить актуальные и полные персональные данные;</li>
                  <li>Обновлять, дополнять предоставленную информацию;</li>
                  <li>Не разглашать свои учётные данные (если такие имеются).</li>
                </ul>
                <p className="mb-2">5.2. ИП Свиридова О.В. обязуется:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Использовать полученную информацию исключительно для целей, указанных в п. 3;</li>
                  <li>Обеспечить хранение конфиденциальной информации в тайне;</li>
                  <li>Принимать необходимые меры для защиты персональных данных;</li>
                  <li>Не передавать персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ;</li>
                  <li>Осуществлять блокирование персональных данных с момента обращения или запроса субъекта персональных данных.</li>
                </ul>
              </section>

              <section id="s6">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">6. ИСПОЛЬЗОВАНИЕ ФАЙЛОВ COOKIE</h2>
                <p className="mb-3">6.1. Сайт использует файлы cookie для улучшения качества обслуживания Пользователей.</p>
                <p className="mb-3">6.2. Cookie — это небольшие текстовые файлы, которые сохраняются на устройстве Пользователя при посещении Сайта.</p>
                <p className="mb-2">6.3. Мы используем cookie для:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Авторизации пользователя;</li>
                  <li>Сбора статистики посещений;</li>
                  <li>Хранения настроек темы (тёмная/светлая);</li>
                  <li>Персонализации контента.</li>
                </ul>
                <p>6.4. Пользователь может отключить использование cookie в настройках своего браузера, однако это может повлиять на функциональность Сайта.</p>
              </section>

              <section id="s7">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">7. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
                <p className="mb-3">7.1. ИП Свиридова О.В. принимает необходимые организационные и технические меры для защиты персональных данных Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения.</p>
                <p className="mb-3">7.2. Защита осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
                <p>7.3. Мы используем современные методы шифрования данных при передаче информации.</p>
              </section>

              <section id="s8">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">8. ПРАВА ПОЛЬЗОВАТЕЛЯ</h2>
                <p className="mb-2">8.1. Пользователь имеет право:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Отзывать согласие на обработку персональных данных;</li>
                  <li>Требовать уточнения, блокирования или уничтожения своих персональных данных;</li>
                  <li>Требовать перечень своих персональных данных, обрабатываемых ИП Свиридова О.В.;</li>
                  <li>Обращаться с жалобами в Роскомнадзор;</li>
                  <li>Получать информацию об обработке своих персональных данных.</li>
                </ul>
              </section>

              <section id="s9">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">9. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
                <p className="mb-3">9.1. Политика вступает в силу с момента размещения на Сайте и действует бессрочно.</p>
                <p className="mb-3">9.2. ИП Свиридова О.В. оставляет за собой право вносить изменения в Политику. Новая редакция вступает в силу с момента её размещения на Сайте.</p>
                <p className="mb-3">9.3. Все предложения или вопросы по настоящей Политике следует направлять по адресу: sviridova2oksana@mail.ru или по телефону: +7 909 431 11 93.</p>
                <p>9.4. В случае возникновения споров применяется законодательство Российской Федерации.</p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
