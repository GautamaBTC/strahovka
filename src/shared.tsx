import { useEffect, useMemo, useState } from "react";
import { BRAND_NAME, CONTACTS, HOME_NAV } from "./siteData";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
  };
}

type HeaderProps = {
  page: "home" | "privacy" | "terms";
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

export function Header({ page, onToggleTheme, theme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const nav = useMemo(
    () =>
      page === "home"
        ? HOME_NAV.map(([label, id]) => ({ label, href: `#${id}` }))
        : [
            { label: "Главная", href: "/" },
            { label: "Политика", href: "/privacy.html" },
            { label: "Правила", href: "/terms.html" },
          ],
    [page]
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--line)]/80 bg-[color-mix(in_oklab,var(--surface)_84%,transparent)] py-2 backdrop-blur-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-5">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <LogoIcon />
          </span>
          <span className="text-sm font-semibold leading-tight sm:text-base">{BRAND_NAME}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--line)] px-4 text-sm"
          >
            <ChatIcon />Написать
          </a>
          <a href={CONTACTS.phoneHref} className="flex min-h-11 items-center rounded-xl bg-[var(--primary)] px-4 text-sm text-white">
            {CONTACTS.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Переключить тему"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--line)]"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] lg:hidden"
          aria-label="Меню"
        >
          <BurgerIcon open={isOpen} />
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 border-t border-[var(--line)] bg-[var(--surface)]/98 px-4 pb-6 pt-4 lg:hidden">
          <div className="space-y-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-[var(--line)] px-4 py-3 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] py-10">
      <div className="container-wide grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{BRAND_NAME}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Официальный пункт техосмотра и страховой центр в Шахтах.</p>
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          <a className="mr-5 underline" href="/privacy.html">
            Политика конфиденциальности
          </a>
          <a className="underline" href="/terms.html">
            Правила пользования
          </a>
        </div>
        <div className="text-sm text-[var(--text-muted)]">
          <p>{CONTACTS.owner}</p>
          <p>ИНН: {CONTACTS.inn}</p>
          <p>ОГРНИП: {CONTACTS.ogrnip}</p>
          <p className="mt-2">© 2026 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      const t = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  return (
    <div
      id="cookie-banner"
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-slate-900 p-4 text-white shadow-2xl transition-transform duration-500 sm:p-6 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-slate-300 sm:text-left">
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с{" "}
          <a href="/privacy.html" className="text-blue-400 underline transition hover:text-blue-300">
            Политикой конфиденциальности
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
        >
          Принять
        </button>
      </div>
    </div>
  );
}

export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 15h16l-1.8 4H5.8L4 15Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 15 9.3 9h5.4l1.8 6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="18" r="1.5" fill="currentColor" />
      <circle cx="16" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5h14v10H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05 4.93 4.93" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={open ? "M6 6l12 12" : "M4 7h16"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d={open ? "M18 6 6 18" : "M4 12h16"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      {!open && <path d="M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />}
    </svg>
  );
}