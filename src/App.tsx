import { FormEvent, useEffect, useMemo, useState } from "react";
import { ADVANTAGES, BRAND_NAME, CONTACTS, SCHEDULE, SERVICES, TEAM } from "./siteData";
import { CookieBanner, Footer, Header, useReveal, useTheme } from "./shared";

type FormDataState = {
  name: string;
  phone: string;
  car: string;
  time: string;
  comment: string;
};

const initialForm: FormDataState = { name: "", phone: "", car: "", time: "", comment: "" };

function formatPhone(raw: string) {
  const stripped = raw.replace(/\D/g, "").replace(/^8/, "7");
  const digits = (stripped.startsWith("7") ? stripped : `7${stripped}`).slice(0, 11);
  const a = digits.slice(1, 4);
  const b = digits.slice(4, 7);
  const c = digits.slice(7, 9);
  const d = digits.slice(9, 11);
  return `+7${a ? ` (${a}` : ""}${a.length === 3 ? ")" : ""}${b ? ` ${b}` : ""}${c ? `-${c}` : ""}${d ? `-${d}` : ""}`;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [countersStarted, setCountersStarted] = useState(false);
  const [form, setForm] = useState<FormDataState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  useReveal();

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const clickHandler = (event: Event) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      event.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    links.forEach((link) => link.addEventListener("click", clickHandler));
    return () => links.forEach((link) => link.removeEventListener("click", clickHandler));
  }, []);

  useEffect(() => {
    const statsNode = document.getElementById("stats");
    if (!statsNode) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCountersStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(statsNode);
    return () => obs.disconnect();
  }, []);

  const stats = useMemo(
    () => [
      { label: "лет опыта", value: 10, suffix: "+" },
      { label: "довольных клиентов", value: 5000, suffix: "+" },
      { label: "минут среднее время", value: 20, suffix: "" },
      { label: "официально", value: 100, suffix: "%" },
    ],
    []
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Введите имя от 2 символов";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 11) nextErrors.phone = "Введите корректный телефон";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
    setForm(initialForm);
    window.setTimeout(() => setSent(false), 3200);
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <Header page="home" onToggleTheme={toggleTheme} theme={theme} />

      <main>
        <section id="hero" className="aurora hero-grid relative overflow-hidden pt-34 text-white">
          <div className="container-wide grid min-h-[88vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="reveal max-w-2xl">
              <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">Официальная аккредитация РСА</p>
              <h1 className="kinetic text-[clamp(2.1rem,6vw,4.4rem)] font-semibold leading-[1.02]">Техосмотр в Шахтах за 20 минут официально</h1>
              <p className="mt-5 max-w-xl text-lg text-slate-200">
                {BRAND_NAME} проводит техосмотр и страховое оформление без очередей. Данные вносятся в ЕАИСТО, работаем с физическими и юридическими лицами.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#form" className="min-h-11 rounded-xl bg-[var(--primary)] px-6 py-3 font-medium text-white transition hover:scale-[1.03]">
                  Записаться на техосмотр
                </a>
                <a href="#services" className="min-h-11 rounded-xl border border-white/40 px-6 py-3 font-medium transition hover:bg-white/10">
                  Наши услуги
                </a>
              </div>
              <div className="mt-8 flex flex-col gap-1 text-sm text-slate-200">
                <a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a>
                <p>{CONTACTS.shortAddress}</p>
              </div>
            </div>

            <div className="reveal floating relative">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80"
                alt="Автомобиль проходит диагностику на линии техосмотра"
                className="h-[72vh] w-full rounded-[28px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="stats" className="container-wide py-18">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <Counter key={item.label} item={item} start={countersStarted} delay={index * 120} />
            ))}
          </div>
        </section>

        <section id="advantages" className="container-wide py-12">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Почему выбирают нас</h2>
          <p className="reveal mt-3 max-w-3xl text-[var(--text-muted)]">Официальная диагностика, прозрачные процессы и комфортный сервис для каждого клиента.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((item) => (
              <div key={item} className="reveal rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="container-wide py-16">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Наши услуги</h2>
          <p className="reveal mt-3 text-[var(--text-muted)]">Полный спектр услуг для автовладельцев</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const featured = service === "Техосмотр";
              return (
                <article
                  key={service}
                  className={`reveal rounded-2xl border p-5 transition hover:-translate-y-1 ${
                    featured
                      ? "border-[var(--primary)] bg-[color-mix(in_oklab,var(--primary)_14%,var(--surface))] lg:col-span-2"
                      : "border-[var(--line)] bg-[var(--surface)]"
                  }`}
                >
                  {featured && <p className="mb-2 text-xs font-semibold uppercase text-[var(--primary)]">Популярное</p>}
                  <h3 className={`font-semibold ${featured ? "text-2xl" : "text-lg"}`}>{service}</h3>
                </article>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="container-wide py-16">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Стоимость услуг</h2>
          <div className="reveal mt-8 rounded-[28px] border border-[var(--primary)] bg-[var(--surface)] p-8">
            <p className="text-sm text-[var(--primary)]">По предварительной записи</p>
            <p className="mt-2 text-5xl font-semibold">1700₽</p>
            <p className="mt-2 text-[var(--text-muted)]">Техосмотр, оформление диагностической карты, внесение в ЕАИСТО, консультация специалиста.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#form" className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white">
                Записаться
              </a>
              <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--line)] px-5 py-3">
                Узнать цену других услуг
              </a>
            </div>
          </div>
        </section>

        <section id="team" className="container-wide py-16">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Наша команда</h2>
          <p className="reveal mt-3 text-[var(--text-muted)]">Профессионалы с многолетним опытом</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <article key={person.name} className="reveal overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)]">
                <div className="overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="h-[400px] w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{person.role}</p>
                  <a href={person.phoneHref} className="mt-3 inline-block text-sm underline">
                    {person.phone}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container-wide py-10">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Комфорт для клиентов</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {["Бесплатная парковка", "Бесплатный Wi-Fi", "Телевизор в зоне ожидания", "Кофе/чай", "Комфортная зона ожидания"].map((item) => (
              <div key={item} className="reveal rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 text-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide py-12">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Как записаться на техосмотр</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Оставьте заявку", "Мы перезвоним", "Приезжайте в удобное время", "Получите диагностическую карту"].map((step, i) => (
              <li key={step} className="reveal rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <p className="text-xs text-[var(--primary)]">Шаг {i + 1}</p>
                <p className="mt-2">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contacts" className="container-wide py-16">
          <h2 className="reveal text-[clamp(1.8rem,3.8vw,3rem)] font-semibold">Контакты</h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="reveal rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <p className="font-semibold">{CONTACTS.address}</p>
              <a href={CONTACTS.phoneHref} className="mt-4 block underline">
                {CONTACTS.phoneDisplay}
              </a>
              <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="mt-1 block underline">
                WhatsApp
              </a>
              <a href={CONTACTS.emailHref} className="mt-1 block underline">
                {CONTACTS.email}
              </a>
              <div className="mt-6 overflow-hidden rounded-xl border border-[var(--line)]">
                <table className="w-full text-sm">
                  <tbody>
                    {SCHEDULE.map(([day, time]) => (
                      <tr key={day} className="border-b border-[var(--line)] last:border-b-0">
                        <td className="px-3 py-2">{day}</td>
                        <td className="px-3 py-2 text-right">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">В остальное время работаем по предварительной записи (звонить или писать в WhatsApp)</p>
              <p className="mt-5 text-sm text-[var(--text-muted)]">
                {CONTACTS.owner}, ИНН {CONTACTS.inn}, ОГРНИП {CONTACTS.ogrnip}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={CONTACTS.phoneHref} className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm text-white">
                  Позвонить
                </a>
                <a href={CONTACTS.whatsapp} target="_blank" rel="noreferrer" className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm">
                  Написать в WhatsApp
                </a>
                <a
                  href="https://yandex.ru/maps/?pt=40.231948,47.687890&z=16&l=map"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm"
                >
                  Проложить маршрут
                </a>
              </div>
            </div>

            <div className="reveal overflow-hidden rounded-2xl border border-[var(--line)] shadow-xl">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=40.231948%2C47.687890&pt=40.231948,47.687890&z=16"
                title="Карта пункта техосмотра"
                width="100%"
                height="400"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="form" className="container-wide pb-18">
          <div className="reveal rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-7 lg:p-10">
            <h2 className="text-[clamp(1.7rem,3.6vw,2.8rem)] font-semibold">Записаться на техосмотр</h2>
            <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                Имя
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                  required
                />
                {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name}</span>}
              </label>

              <label className="text-sm">
                Телефон
                <input
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                  required
                />
                {errors.phone && <span className="mt-1 block text-xs text-red-500">{errors.phone}</span>}
              </label>

              <label className="text-sm">
                Марка автомобиля
                <input
                  value={form.car}
                  onChange={(e) => setForm((prev) => ({ ...prev, car: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                />
              </label>

              <label className="text-sm">
                Удобное время
                <select
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                >
                  <option value="">Выберите время</option>
                  <option>Утро (08:30 - 11:00)</option>
                  <option>День (11:00 - 14:00)</option>
                  <option>После 14:00</option>
                </select>
              </label>

              <label className="text-sm md:col-span-2">
                Комментарий
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                />
              </label>

              <button type="submit" className="rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white md:col-span-2 md:w-fit">
                Отправить заявку
              </button>
              {sent && <p className="text-sm text-[var(--accent)] md:col-span-2">Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>}
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}

function Counter({
  item,
  start,
  delay,
}: {
  item: { label: string; value: number; suffix: string };
  start: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const timeout = window.setTimeout(() => {
      const duration = 1100;
      const from = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - from) / duration, 1);
        setValue(Math.round(item.value * progress));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [delay, item.value, start]);

  return (
    <div className="reveal rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <p className="text-4xl font-semibold text-[var(--primary)]">
        {value}
        {item.suffix}
      </p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{item.label}</p>
    </div>
  );
}
