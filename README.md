# BIZNET.WORK — лендинг

Одностраничный лендинг для презентации проекта инвесторам, бизнесу (поставщикам данных) и AI-лабораториям.
Next.js 16 (App Router) + TypeScript. Анимации — чистый CSS/SVG, без сторонних библиотек.
Зависимости: только `next`, `react`, `react-dom`. Шрифты Inter и JetBrains Mono лежат локально в `app/fonts` (лицензия SIL OFL) — сборка не ходит в Google Fonts.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшен-сборка (страница статическая)
npm run typecheck  # проверка типов
```

Нужен Node.js 20.9+.

## Деплой на Vercel

**Вариант 1 — через GitHub.** Залейте папку в репозиторий → Vercel → *Add New Project* → импорт репозитория.
Если в репозитории лежит вся папка `biznet.work` (с документами), в настройках проекта укажите **Root Directory = `landing`**.
Framework Preset определится сам (Next.js), остальные настройки по умолчанию.

**Вариант 2 — из терминала.**

```bash
cd landing
npx vercel          # превью-ссылка для ревью
npx vercel --prod   # продакшен
```

## Что поменять перед отправкой

Все контакты — в `lib/site.ts`:

- `email` — адрес, на который ведут все кнопки (сейчас `hello@biznet.work`);
- `bookingUrl` — ссылка на Calendly / Cal.com. Если заполнена, кнопки «Book a demo» ведут туда, иначе — на e-mail.

## Структура страницы

| Секция | Файл | Для кого |
| --- | --- | --- |
| Hero + живая карта процессов (BPMN + heatmap) | `components/Hero.tsx`, `HeroDiagram.tsx` | все |
| «biznet.work за 10 секунд»: кто мы / зачем / что получает каждый | `Summary.tsx` | все |
| Проблема: Data Wall | `Problem.tsx` | все |
| Как работает: пайплайн Slack/Jira/GitHub/Meet → ядро → AI-лабы | `HowItWorks.tsx` | все |
| Что получает каждая сторона (вкладки бизнес / AI-лабы) | `Value.tsx`, `TraceConsole.tsx`, `JsonStream.tsx` | бизнес, лабы |
| Безопасность: PII Shield, карантинная зона | `Security.tsx` | бизнес (CTO) |
| CorpTwin — бесплатный дашборд для бизнеса | `TwinDashboard.tsx` | бизнес |
| Бизнес-модель, юнит-экономика, сравнение | `Investors.tsx` → `Investors` | инвесторы |
| Рынок, roadmap, The Ask | `Investors.tsx` → `Market` | инвесторы |
| Финальный CTA (3 сценария) + футер | `FinalCta.tsx`, `Footer.tsx` | все |

Ссылки в hero «A business owner / An AI lab / An investor» сразу открывают нужную вкладку или секцию.

## Откуда цифры

Все цифры взяты из документов проекта (Founders Vision, Concept Deck, deck-investor, Monetization Pricing Model, Value Proposition Map):
TAM >$100B / SAM $20B / SOM $5B, маржа ETL 85–90%, RevShare 5–30%, 3–5 лаб на датасет, TTFR < 24 ч, LTV/CAC > 10:1, ARR $5M / $25M / $100M (год 1 / 3 / 5).
На странице они явно подписаны как цели/оценки компании. Значения в демо-интерфейсах (дашборд, ledger, JSON) помечены как «sample / illustrative».

## Бренд

Цвета и типографика — по brand book: Premium Cream `#F4F4F0`, Institutional Black `#121212`, Trust Blue `#1D52A8`, Highlight Yellow `#F2D53A`;
чёрная «якорная» панель слева, водяные знаки на вылет, тонкая сетка-чертёж, карточки с острыми углами. Токены — в начале `app/globals.css`.

Анимации уважают системную настройку «уменьшить движение» (`prefers-reduced-motion`).
