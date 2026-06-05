import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 't1', title: '1. Общие положения' },
  { id: 't2', title: '2. Предмет договора' },
  { id: 't3', title: '3. Порядок оказания услуг' },
  { id: 't4', title: '4. Стоимость и порядок расчётов' },
  { id: 't5', title: '5. Права и обязанности сторон' },
  { id: 't6', title: '6. Ответственность сторон' },
  { id: 't7', title: '7. Конфиденциальность' },
  { id: 't8', title: '8. Форс-мажор' },
  { id: 't9', title: '9. Разрешение споров' },
  { id: 't10', title: '10. Заключительные положения' },
  { id: 't11', title: '11. Реквизиты исполнителя' },
];

export default function Terms() {
  const [active, setActive] = useState('t1');

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
            Правила пользования сайтом
          </h1>
          <p className="dark:text-gray-400 text-gray-600 text-lg">
            Публичная оферта на оказание услуг
          </p>
          <p className="dark:text-gray-500 text-gray-400 text-sm mt-2">
            Дата последнего обновления: 29 апреля 2026 г.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
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
          <div className="flex-1 min-w-0 w-full">
            <div className="space-y-8 text-base leading-relaxed dark:text-gray-300 text-gray-700">

              <section id="t1">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
                <p className="mb-3">1.1. Настоящий документ (далее — «Оферта») является официальным предложением Индивидуального предпринимателя Свиридова Оксана Валерьевна (ОГРНИП: 326619600105912, ИНН: 615521270061, адрес: 346500, Ростовская область, г. Шахты, переулок Мечникова, 1А) заключить договор на оказание услуг, предусмотренных на сайте, на условиях, изложенных в настоящей Оферте.</p>
                <p className="mb-3">1.2. Акцептом (принятием) условий настоящей Оферты считается факт использования Пользователем услуг Сайта, включая оформление заявок, заполнение форм или совершение иных действий, направленных на получение услуг.</p>
                <p className="mb-3">1.3. Настоящая Оферта регулирует отношения между ИП Свиридова О.В. (далее — «Исполнитель») и физическими или юридическими лицами (далее — «Клиент» или «Пользователь»), использующими Сайт.</p>
                <p>1.4. Используя Сайт, Пользователь выражает своё полное и безоговорочное согласие со всеми условиями Оферты.</p>
              </section>

              <section id="t2">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">2. ПРЕДМЕТ ДОГОВОРА</h2>
                <p className="mb-3">2.1. Исполнитель обязуется оказать Клиенту следующие услуги:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Технический осмотр автотранспортных средств;</li>
                  <li>Оформление диагностических карт;</li>
                  <li>Оформление полисов ОСАГО и КАСКО;</li>
                  <li>Оформление медсправок для водителей;</li>
                  <li>Помощь в постановке автомобилей на учёт;</li>
                  <li>Замена водительских удостоверений;</li>
                  <li>Страхование жизни, ипотеки, имущества;</li>
                  <li>Оформление договоров купли-продажи;</li>
                  <li>Оформление автомобилей в лизинг;</li>
                  <li>Консультационные услуги по всем видам деятельности.</li>
                </ul>
                <p>2.2. Конкретный перечень, объём и стоимость услуг определяются в заявке Клиента и подтверждаются Исполнителем.</p>
              </section>

              <section id="t3">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">3. ПОРЯДОК ОКАЗАНИЯ УСЛУГ</h2>
                <p className="mb-2">3.1. Для получения услуг Клиент должен:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Заполнить форму заявки на Сайте или связаться по телефону/email;</li>
                  <li>Предоставить необходимые документы (ПТС, СТС, водительское удостоверение, паспорт и др.);</li>
                  <li>Оплатить услуги в соответствии с прайс-листом;</li>
                  <li>Предоставить транспортное средство для осмотра (если требуется).</li>
                </ul>
                <p className="mb-2">3.2. Исполнитель обязуется:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Оказать услуги качественно и в согласованные сроки;</li>
                  <li>Предоставить все необходимые документы;</li>
                  <li>Соблюдать конфиденциальность предоставленных данных;</li>
                  <li>Информировать Клиента о ходе оказания услуг.</li>
                </ul>
                <p>3.3. Срок оказания услуг зависит от вида услуги и загруженности Исполнителя, но не превышает 3 (трёх) рабочих дней с момента оплаты и предоставления всех документов, если иное не согласовано сторонами.</p>
              </section>

              <section id="t4">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">4. СТОИМОСТЬ И ПОРЯДОК РАСЧЁТОВ</h2>
                <p className="mb-3">4.1. Стоимость услуг определяется согласно прайс-листу, размещённому на Сайте, или согласовывается индивидуально.</p>
                <p className="mb-3">4.2. Актуальная стоимость на момент оказания услуг:</p>
                <ul className="list-disc list-inside ml-4 mb-3">
                  <li>Технический осмотр (по предварительной записи): 1700 (одна тысяча семьсот) рублей;</li>
                  <li>Иные услуги — согласно прайс-листу или по договорённости.</li>
                </ul>
                <p className="mb-2">4.3. Оплата производится одним из способов:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Наличными в пункте оказания услуг;</li>
                  <li>Банковской картой;</li>
                  <li>Банковским переводом на реквизиты Исполнителя;</li>
                  <li>Иными способами, не противоречащими законодательству РФ.</li>
                </ul>
                <p className="mb-3">4.4. Для юридических лиц возможна оплата по безналичному расчёту с предоставлением закрывающих документов.</p>
                <p>4.5. Услуги считаются оплаченными с момента поступления денежных средств на счёт Исполнителя.</p>
              </section>

              <section id="t5">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">5. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
                <p className="mb-2">5.1. Клиент обязуется:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Предоставить достоверную информацию и документы;</li>
                  <li>Своевременно оплатить услуги;</li>
                  <li>Предоставить транспортное средство в технически исправном состоянии (для техосмотра);</li>
                  <li>Соблюдать правила внутреннего распорядка пункта техосмотра;</li>
                  <li>Незамедлительно сообщать об изменении контактных данных.</li>
                </ul>
                <p className="mb-2">5.2. Клиент имеет право:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Получить полную информацию об услугах и их стоимости;</li>
                  <li>Требовать качественного оказания услуг;</li>
                  <li>Получать документы, подтверждающие оказание услуг;</li>
                  <li>Отказаться от услуг до их оказания с возвратом оплаченных средств (за вычетом фактически понесённых расходов).</li>
                </ul>
                <p className="mb-2">5.3. Исполнитель обязуется:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Оказать услуги лично или с привлечением квалифицированных специалистов;</li>
                  <li>Соблюдать сроки оказания услуг;</li>
                  <li>Гарантировать внесение данных в единую систему ЕАИСТО (для техосмотра);</li>
                  <li>Хранить коммерческую тайну и персональные данные Клиента.</li>
                </ul>
                <p className="mb-2">5.4. Исполнитель имеет право:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Запросить дополнительные документы при необходимости;</li>
                  <li>Отказать в оказании услуг при предоставлении недостоверной информации;</li>
                  <li>Приостановить оказание услуг при нарушении Клиентом условий Оферты;</li>
                  <li>Изменять стоимость услуг с предварительным уведомлением.</li>
                </ul>
              </section>

              <section id="t6">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">6. ОТВЕТСТВЕННОСТЬ СТОРОН</h2>
                <p className="mb-3">6.1. За неисполнение или ненадлежащее исполнение обязательств по настоящей Оферте Стороны несут ответственность в соответствии с законодательством Российской Федерации.</p>
                <p className="mb-2">6.2. Исполнитель не несёт ответственности за:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Упущенную выгоду Клиента;</li>
                  <li>Косвенные убытки Клиента;</li>
                  <li>Невозможность оказания услуг по причинам, не зависящим от Исполнителя (форс-мажор).</li>
                </ul>
                <p>6.3. Клиент несёт ответственность за достоверность предоставленных документов и информации.</p>
              </section>

              <section id="t7">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">7. КОНФИДЕНЦИАЛЬНОСТЬ</h2>
                <p className="mb-3">7.1. Стороны обязуются сохранять конфиденциальность информации, полученной в ходе исполнения договора.</p>
                <p>7.2. Обработка персональных данных осуществляется в соответствии с Политикой конфиденциальности и Федеральным законом № 152-ФЗ «О персональных данных».</p>
              </section>

              <section id="t8">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">8. ФОРС-МАЖОР</h2>
                <p className="mb-3">8.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по настоящей Оферте, если это явилось следствием обстоятельств непреодолимой силы (форс-мажор), возникших после заключения договора.</p>
                <p>8.2. К форс-мажорным обстоятельствам относятся: стихийные бедствия, войны, забастовки, действия государственных органов и иные обстоятельства, которые Стороны не могли предвидеть или предотвратить.</p>
              </section>

              <section id="t9">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">9. РАЗРЕШЕНИЕ СПОРОВ</h2>
                <p className="mb-3">9.1. Все споры и разногласия решаются путём переговоров между Сторонами.</p>
                <p className="mb-3">9.2. В случае недостижения согласия споры подлежат рассмотрению в суде по месту нахождения Исполнителя в соответствии с законодательством Российской Федерации.</p>
                <p className="mb-3">9.3. До обращения в суд обязательным является соблюдение досудебного порядка урегулирования спора (направление претензии).</p>
                <p>9.4. Срок ответа на претензию — 30 (тридцать) календарных дней с даты её получения.</p>
              </section>

              <section id="t10">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">10. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
                <p className="mb-3">10.1. Настоящая Оферта вступает в силу с момента её размещения на Сайте и действует бессрочно.</p>
                <p className="mb-3">10.2. Исполнитель оставляет за собой право вносить изменения в Оферту без предварительного уведомления. Новая редакция вступает в силу с момента её размещения на Сайте.</p>
                <p className="mb-3">10.3. Продолжение использования Сайта после внесения изменений означает согласие Клиента с новыми условиями.</p>
                <p className="mb-3">10.4. Настоящая Оферта регулируется законодательством Российской Федерации.</p>
                <p>10.5. Если какое-либо положение Оферты будет признано недействительным, это не влияет на действительность остальных положений.</p>
              </section>

              <section id="t11">
                <h2 className="font-heading font-bold text-xl dark:text-white text-gray-900 mb-4 pt-4">11. РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</h2>
                <div className="dark:bg-white/3 bg-gray-50 rounded-2xl p-6 space-y-2">
                  <p className="font-semibold dark:text-white text-gray-900">Индивидуальный предприниматель</p>
                  <p className="font-semibold dark:text-white text-gray-900">Свиридова Оксана Валерьевна</p>
                  <div className="h-px dark:bg-white/10 bg-gray-200 my-3" />
                  <p><span className="dark:text-gray-500 text-gray-400">ОГРНИП:</span> <span className="dark:text-gray-200 text-gray-800">326619600105912</span></p>
                  <p><span className="dark:text-gray-500 text-gray-400">ИНН:</span> <span className="dark:text-gray-200 text-gray-800">615521270061</span></p>
                  <p><span className="dark:text-gray-500 text-gray-400">Адрес:</span> <span className="dark:text-gray-200 text-gray-800">346500, Ростовская область, г. Шахты, переулок Мечникова, 1А</span></p>
                  <p><span className="dark:text-gray-500 text-gray-400">Телефон:</span> <a href="tel:+79094311193" className="text-primary-500 hover:text-primary-400 transition-colors">+7 909 431 11 93</a></p>
                  <p><span className="dark:text-gray-500 text-gray-400">Email:</span> <a href="mailto:sviridova2oksana@mail.ru" className="text-primary-500 hover:text-primary-400 transition-colors">sviridova2oksana@mail.ru</a></p>
                  <div className="h-px dark:bg-white/10 bg-gray-200 my-3" />
                  <p><span className="dark:text-gray-500 text-gray-400">Дата регистрации:</span> <span className="dark:text-gray-200 text-gray-800">29 апреля 2026 г.</span></p>
                  <p><span className="dark:text-gray-500 text-gray-400">Регистратор:</span> <span className="dark:text-gray-200 text-gray-800">Межрайонная инспекция ФНС России № 26 по Ростовской области</span></p>
                  <p><span className="dark:text-gray-500 text-gray-400">Основной вид деятельности:</span> <span className="dark:text-gray-200 text-gray-800">71.20.5 Технический осмотр автотранспортных средств</span></p>
                  <p>
                    <span className="dark:text-gray-500 text-gray-400">Подробнее:</span>{' '}
                    <a href="https://www.rusprofile.ru/ip/326619600105912" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                      www.rusprofile.ru/ip/326619600105912
                    </a>
                  </p>
                </div>
              </section>

              {/* Important notice */}
              <div className="dark:bg-warn-500/5 bg-amber-50 border dark:border-warn-500/20 border-amber-200 rounded-2xl p-6 mt-8">
                <p className="font-semibold dark:text-warn-400 text-amber-700 mb-2">ВАЖНО!</p>
                <p className="dark:text-gray-300 text-gray-700 leading-relaxed">
                  Настоящая Оферта является публичным договором в соответствии со ст. 437 Гражданского кодекса Российской Федерации. Совершая действия по использованию Сайта, вы выражаете своё полное и безоговорочное согласие со всеми условиями Оферты.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}