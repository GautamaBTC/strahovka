import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  children: React.ReactNode;
}

/* ─── SVG Icons ─── */
const CarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h1"/>
    <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
  </svg>
);

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ─── Header Component ─── */
function Header({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const scrollToSection = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, [location, navigate]);

  const navItems = [
    { label: 'Главная', action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Услуги', action: () => scrollToSection('services') },
    { label: 'Преимущества', action: () => scrollToSection('advantages') },
    { label: 'Цены', action: () => scrollToSection('pricing') },
    { label: 'Команда', action: () => scrollToSection('team') },
    { label: 'Контакты', action: () => scrollToSection('contacts') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'dark:bg-surface-900/80 bg-white/80 backdrop-blur-xl shadow-lg dark:shadow-black/20 shadow-gray-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 md:py-5'}`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="text-primary-500 group-hover:text-primary-400 transition-colors">
              <CarIcon />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight dark:text-white text-gray-900">
                Авто<span className="text-primary-500">Эксперт</span>
              </span>
              <div className="text-[10px] uppercase tracking-widest dark:text-gray-500 text-gray-400 -mt-0.5">
                Техосмотр · Страхование
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="px-3 py-2 text-sm font-medium dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors rounded-lg dark:hover:bg-white/5 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/10 hover:bg-gray-100 transition-all"
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href="https://wa.me/79094311193"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-sm font-medium"
            >
              <WhatsAppIcon />
              <span className="hidden xl:inline">Написать</span>
            </a>

            <a
              href="tel:+79094311193"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 transition-all text-sm font-medium"
            >
              <PhoneIcon size={18} />
              <span>+7 909 431 11 93</span>
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg dark:text-gray-400 text-gray-500"
              aria-label="Переключить тему"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="tel:+79094311193" className="p-2 rounded-lg text-primary-500">
              <PhoneIcon />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg dark:text-gray-300 text-gray-700"
              aria-label="Меню"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="dark:bg-surface-900/95 bg-white/95 backdrop-blur-xl border-t dark:border-white/5 border-gray-200 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium dark:text-gray-300 text-gray-700 dark:hover:bg-white/5 hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-2 pt-3 border-t dark:border-white/10 border-gray-200">
            <a
              href="https://wa.me/79094311193"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] text-sm font-medium"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
            <a
              href="tel:+79094311193"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-500/10 text-primary-500 text-sm font-medium"
            >
              <PhoneIcon size={16} /> Позвонить
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Footer Component ─── */
function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative dark:bg-surface-950 bg-gray-50 border-t dark:border-white/5 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-primary-500"><CarIcon /></div>
              <span className="font-heading font-bold text-xl dark:text-white text-gray-900">
                Авто<span className="text-primary-500">Эксперт</span>
              </span>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4">
              Пункт техосмотра и страховой центр в Шахтах. Официальная аккредитация РСА. Работаем более 10 лет.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/79094311193"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="tel:+79094311193"
                className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 transition-all"
                aria-label="Телефон"
              >
                <PhoneIcon size={20} />
              </a>
              <a
                href="mailto:sviridova2oksana@mail.ru"
                className="p-2.5 rounded-xl bg-accent-500/10 text-accent-500 hover:bg-accent-500/20 transition-all"
                aria-label="Email"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold dark:text-white text-gray-900 mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Главная', to: '/' },
                { label: 'Услуги', to: '/', section: 'services' },
                { label: 'Цены', to: '/', section: 'pricing' },
                { label: 'Контакты', to: '/', section: 'contacts' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      navigate(item.to);
                      if (item.section) {
                        setTimeout(() => {
                          document.getElementById(item.section!)?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-heading font-semibold dark:text-white text-gray-900 mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+79094311193" className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  <PhoneIcon size={14} /> +7 909 431 11 93
                </a>
              </li>
              <li>
                <a href="mailto:sviridova2oksana@mail.ru" className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  <MailIcon /> sviridova2oksana@mail.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm dark:text-gray-400 text-gray-600">
                <MapPinIcon /> г. Шахты, пер. Мечникова, 1А
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold dark:text-white text-gray-900 mb-4">Информация</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm dark:text-gray-400 text-gray-600 hover:text-primary-500 transition-colors">
                  Правила пользования
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl dark:bg-white/3 bg-gray-100 text-xs dark:text-gray-500 text-gray-500 leading-relaxed">
              <p className="font-medium dark:text-gray-400 text-gray-600 mb-1">ИП Свиридова О.В.</p>
              <p>ИНН: 615521270061</p>
              <p>ОГРНИП: 326619600105912</p>
              <p>346500, Ростовская обл., г. Шахты, пер. Мечникова, 1А</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t dark:border-white/5 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            &copy; {new Date().getFullYear()} АвтоЭксперт. Все права защищены.
          </p>
          <p className="text-xs dark:text-gray-600 text-gray-400">
            Сайт носит информационный характер и не является публичной офертой (ст. 437 ГК РФ)
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Cookie Banner ─── */
function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-3xl mx-auto dark:bg-surface-800/95 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-black/40 shadow-gray-300/50 border dark:border-white/10 border-gray-200 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm dark:text-gray-300 text-gray-600 text-center sm:text-left leading-relaxed">
            Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с{' '}
            <Link to="/privacy" className="text-primary-500 hover:text-primary-400 underline transition-colors">
              Политикой конфиденциальности
            </Link>.
          </p>
          <button
            onClick={accept}
            className="shrink-0 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium text-sm transition-all hover:scale-105 shadow-lg shadow-primary-500/20"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── WhatsApp Floating Button ─── */
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/79094311193"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 whatsapp-float hover:scale-110 transition-transform"
      aria-label="Написать в WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ─── Layout Component ─── */
export default function Layout({ theme, toggleTheme, children }: LayoutProps) {
  return (
    <div className="min-h-screen dark:bg-surface-950 bg-surface-50 dark:text-gray-100 text-gray-900 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <WhatsAppFloat />
    </div>
  );
}
