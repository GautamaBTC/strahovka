import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/#services', label: 'Услуги' },
    { to: '/#team', label: 'Команда' },
    { to: '/#contacts', label: 'Контакты' },
    { to: 'https://yandex.ru/maps/-/CDaZiE~P', label: 'Как проехать', external: true },
  ];

  // HashRouter не скроллит по якорям автоматически — делаем вручную
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      e.preventDefault();
      setMenuOpen(false);
      const id = to.replace('/#', '');
      // Если уже на главной — скроллим сразу
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Переходим на главную, потом скроллим после рендера
        window.location.hash = '#/' + '?anchor=' + id;
        window.location.reload();
      }
    }
  };

  // При загрузке проверяем, есть ли якорь в URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const anchor = params.get('anchor');
    if (anchor && location.pathname === '/') {
      requestAnimationFrame(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location]);

  return (
    <div className="min-h-[100dvh] min-h-screen flex flex-col">
      {/* ═══ Global Fixed Backdrop — immune to viewport resize ═══ */}
      <div className="site-backdrop" aria-hidden>
        <div
          className="site-backdrop__image"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/background.jpg)` }}
        />
        <div className="site-backdrop__overlay" />
      </div>

      {/* ═════ HEADER ══════ */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-strong border-b dark:border-white/5 border-gray-200/50 !bg-white/85 dark:!bg-slate-900/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div>
                <div className="font-heading font-bold text-xl dark:text-white text-gray-900 leading-tight">
                  Авто<span className="text-primary-500">Эксперт</span>
                </div>
                <div className="text-xs dark:text-gray-400 text-gray-500 -mt-0.5">
                  ТЕХОСМОТР · СТРАХОВАНИЕ
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-700 hover:text-primary-500 hover:bg-primary-500/5 transition-all"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.to}
                    href={link.to.startsWith('/#') ? link.to : undefined}
                    onClick={(e) => handleAnchorClick(e as any, link.to)}
                    className="px-4 py-2 rounded-lg text-sm font-medium dark:text-gray-300 text-gray-700 hover:text-primary-500 hover:bg-primary-500/5 transition-all cursor-pointer"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Phone */}
              <a
                href="tel:+790****1193"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-all font-medium text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +7 909 431 11 93
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ Mobile Menu Toggle — OUTSIDE header to avoid stacking context ═══ */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden fixed top-2 right-4 w-12 h-12 flex items-center justify-center z-[100] transition-colors duration-300 ${menuOpen ? 'text-white' : 'dark:text-gray-300 text-gray-700'}`}
        aria-label="Toggle menu"
      >
        <div className="w-7 h-[22px] relative flex flex-col justify-between">
          <span className={`block w-full h-[3px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center ${menuOpen ? 'rotate-45 translate-y-[9.5px]' : ''}`} />
          <span className={`block w-full h-[3px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-full h-[3px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center ${menuOpen ? '-rotate-45 -translate-y-[9.5px]' : ''}`} />
        </div>
      </button>

      {/* ═══ Fullscreen Mobile Menu ═══ */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/menu.jpg)` }}
        />
        {/* Dark overlay for readability — lighter */}
        <div className="absolute inset-0 bg-surface-950/50" />

        {/* Content — centered (top padding accounts for burger button) */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 pt-20">
          {/* Animated Logo */}
          <div
            className={`mb-10 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              menuOpen ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 -translate-y-4 blur-sm'
            }`}
          >
            <div className="font-heading font-bold text-3xl text-white leading-tight text-center">
              Авто<span className="text-primary-500">Эксперт</span>
            </div>
            <div className="text-xs text-gray-400 mt-1 tracking-widest uppercase text-center animate-pulse">
              ТЕХОСМОТР · СТРАХОВАНИЕ
            </div>
          </div>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => {
              const animClass = menuOpen
                ? 'opacity-100 translate-y-0 blur-0'
                : 'opacity-0 translate-y-4 blur-sm';
              return link.external ? (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-2xl sm:text-3xl font-heading font-semibold dark:text-white text-white hover:text-primary-500 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${animClass}`}
                  style={{ transitionDelay: menuOpen ? `${i * 40 + 50}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.to}
                  href={link.to === '/' ? undefined : (link.to.startsWith('/#') ? link.to : undefined)}
                  onClick={(e) => {
                    if (link.to === '/') {
                      e.preventDefault();
                      setMenuOpen(false);
                      if (location.pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        window.location.hash = '#/';
                      }
                    } else {
                      handleAnchorClick(e as any, link.to);
                    }
                  }}
                  className={`text-2xl sm:text-3xl font-heading font-semibold dark:text-white text-white hover:text-primary-500 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer ${animClass}`}
                  style={{ transitionDelay: menuOpen ? `${i * 40 + 50}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Phone CTA */}
          <a
            href="tel:+790****1193"
            className={`mt-12 flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary-500/20 text-primary-400 text-lg font-semibold transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              menuOpen ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
            }`}
            style={{ transitionDelay: menuOpen ? `${navLinks.length * 40 + 90}ms` : '0ms' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +7 909 431 11 93
          </a>
        </div>
      </div>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="flex-1 pt-16 md:pt-20 relative z-10">
        {children}
      </main>

      {/* ══════ FOOTER ══════ */}
      <footer className="relative z-10 glass-strong border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/>
                    <circle cx="16.5" cy="16.5" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl dark:text-white text-gray-900">
                    Авто<span className="text-primary-500">Эксперт</span>
                  </div>
                </div>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
                Пункт техосмотра и страховой центр в Шахтах. Официальная аккредитация РСА. Работаем более 10 лет.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/79094311193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                  aria-label="WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                </a>
                <a
                  href="tel:+79094311193"
                  className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 hover:bg-primary-500/20 transition-all"
                  aria-label="Phone"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
                <a
                  href="mailto:sviridova2oksana@mail.ru"
                  className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 hover:bg-primary-500/20 transition-all"
                  aria-label="Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-4">Навигация</h4>
              <nav className="space-y-2">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.to}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.to}
                      href={link.to.startsWith('/#') ? link.to : undefined}
                      onClick={(e) => handleAnchorClick(e as any, link.to)}
                      className="block text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <a href="tel:+79094311193" className="block dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  +7 909 431 11 93
                </a>
                <a href="mailto:sviridova2oksana@mail.ru" className="block dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  sviridova2oksana@mail.ru
                </a>
                <p className="dark:text-gray-400 text-gray-600">
                  г. Шахты, пер. Мечникова, 1А
                </p>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-4">Информация</h4>
              <div className="space-y-2 text-sm">
                <Link to="/privacy" className="block dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="/terms" className="block dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  Правила пользования
                </Link>
              </div>
              <div className="mt-4 p-3 rounded-lg dark:bg-white/3 bg-gray-100 text-xs dark:text-gray-500 text-gray-400">
                <p className="font-medium dark:text-gray-400 text-gray-600 mb-1">ИП Свиридова О.В.</p>
                <p>ИНН: 615521270061</p>
                <p>ОГРНИП: 326619600105912</p>
                <p>346500, Ростовская обл., г. Шахты, пер. Мечникова, 1А</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pt-6 border-t dark:border-white/5 border-gray-200/50 text-center text-sm dark:text-gray-500 text-gray-400">
            <p>© 2026 АвтоЭксперт. Все права защищены.</p>
            <p className="mt-2 text-xs">
              Сайт носит информационный характер и не является публичной офертой (ст. 437 ГК РФ)
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/79094311193"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all animate-float"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
        </svg>
      </a>
    </div>
  );
}