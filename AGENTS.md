# AGENTS.md

Инструкции для AI-агентов, работающих с этим репозиторием. Файл относится ко всему проекту.

## Назначение проекта

Это Next.js-приложение для сайта `uchitel.ru` и связанных лендингов. Основной контент страниц приходит из Builder.io, а навигация и новости подтягиваются из WordPress API `https://uchitel.ru/wp-json/wp/v2/...`.

Ключевой пользовательский интерфейс:

- catch-all маршрут `app/[[...slug]]/page.tsx` получает Builder.io page content по `urlPath`;
- `Header` и `Footer` добавляются вокруг Builder-контента;
- кастомные Builder-компоненты регистрируются в `builder-registry.ts`;
- `News` показывает новости из WordPress API;
- `Accordioon` отображает rich text, переданный из Builder.io.

## Технологии и зависимости

- Next.js App Router, Next 16, React 19.
- TypeScript в строгом режиме.
- Builder.io SDK: `@builder.io/sdk-react` и Builder DevTools в `next.config.mjs`.
- TanStack React Query для клиентских запросов к WordPress API.
- Headless UI для раскрывающихся меню, dialog и tabs.
- Tailwind CSS 4 через `@import 'tailwindcss'` в `app/globals.css`.
- CSS Modules и SCSS Modules для локальных стилей компонентов.
- Пакетный менеджер: `pnpm` и `pnpm-lock.yaml`.

## Команды

Используйте `pnpm`, не смешивайте npm/yarn/bun lock-файлы.

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm exec tsc --noEmit --pretty false
```

Практический порядок перед сдачей изменений:

1. Для обычных правок выполните `pnpm lint`.
2. Для TypeScript/React/API правок выполните `pnpm exec tsc --noEmit --pretty false`.
3. Для маршрутов, Builder.io, env, Next config и production-поведения выполните `pnpm build`.
4. Для визуальных правок поднимите `pnpm dev` и проверьте страницу в браузере на desktop и mobile.

## Переменные окружения

Локальный `.env` игнорируется Git. Не печатайте и не коммитьте значения секретов.

Используемые переменные:

- `NEXT_PUBLIC_BUILDER_API_KEY` - публичный ключ Builder.io, нужен для `fetchOneEntry` и `<Content />`.
- `NEXT_PUBLIC_DOMAIN` - влияет на `assetPrefix`, canonical URL и вариант header.
- `NODE_OPTIONS` - присутствует в локальном окружении, не полагайтесь на конкретное значение без проверки.

Важное поведение `NEXT_PUBLIC_DOMAIN`:

- при `https://uchitel.vercel.app` header строится из WordPress menu API, canonical указывает на `https://uchitel.ru`;
- при другом значении header переключается на набор ссылок для `konturkultury.uchitel.ru`;
- в production `next.config.mjs` использует `NEXT_PUBLIC_DOMAIN` как `assetPrefix`.

## Структура

- `app/layout.tsx` - глобальная разметка, шрифт Onest, GTM, VK retargeting scripts, Vercel Speed Insights.
- `app/[[...slug]]/page.tsx` - единственный динамический маршрут Builder.io, metadata и 404 fallback.
- `builder-registry.ts` - регистрация кастомных компонентов Builder.io. Держите имена и inputs стабильными, так как они видны в Builder.
- `components/Header` - desktop/mobile навигация, WordPress menu API, альтернативный header для внешнего лендинга.
- `components/Footer` - footer с WordPress menu API и соцссылками.
- `components/News` - клиентский carousel новостей через Headless UI Tabs и WordPress news API.
- `components/shared/api` - общий `QueryClient`, `fetchNews`, `fetchLinks`.
- `components/shared` - Logo, MainLink, Accordioon.
- `public` - статические ассеты.
- `out`, `.next`, `node_modules`, `next-env.d.ts`, `.env` - generated/local artifacts; не редактируйте их как исходники.

Пустые директории в `components/Carousel`, `components/PartnerCard`, `components/ProjectFriends`, `components/ScrollRevealText`, `components/TeamMemberCard` сейчас не содержат исходников. Не считайте их активной архитектурой без новых файлов.

## Правила разработки

- Server Components по умолчанию. Добавляйте `'use client'` только для state/effects/browser API, Headless UI, React Query или hooks из `next/navigation`.
- Сохраняйте строгую типизацию. Не добавляйте новые `any`, `@ts-ignore` или небезопасные приведения без крайней необходимости.
- Если трогаете WordPress API или компоненты, потребляющие его данные, сначала заведите явные типы для menu/news responses.
- Для импортов через дерево проекта можно использовать alias `@/*` из `tsconfig.json`; внутри соседних компонентов допустимы короткие relative imports.
- Публичный текст сайта преимущественно на русском. Не переводите существующую копию случайно.
- Tailwind utility-классы являются основным способом layout-стилей. Для локальной анимации и компонентных исключений используйте CSS/SCSS Modules.
- Глобальные CSS-переменные находятся в `app/globals.css`: `--primary`, `--light-grey`.
- Для новых изображений в React-компонентах предпочитайте `next/image`. Если источник не `uchitel.ru`, обновите `images.remotePatterns` в `next.config.mjs`.
- Для внешних ссылок с `target="_blank"` добавляйте `rel="noopener noreferrer"` при изменении рядом расположенного кода.
- Не удаляйте аналитику, VK scripts, Speed Insights, canonical logic и domain-specific header без явной задачи.
- Не меняйте `html lang`, SEO metadata или canonical поведение как побочный эффект. Если исправляете SEO, проверяйте весь маршрут `app/[[...slug]]/page.tsx`.

## Builder.io

- `builder-registry.ts` должен оставаться клиентским модулем, потому что регистрирует интерактивные компоненты.
- При добавлении Builder-компонента экспортируйте обычный React-компонент и зарегистрируйте его в `customComponents`.
- `inputs` должны точно соответствовать props компонента.
- Не переименовывайте существующие registered component names без миграции контента в Builder.io.
- `Accordioon` принимает rich text и выводит его через `dangerouslySetInnerHTML`; передавайте туда только доверенный HTML из Builder.io.

## WordPress API и React Query

- `fetchLinks` ожидает структуру `data[0].items`, а header/footer зависят от `children`, `id`, `title`, `url`.
- `fetchNews` дополнительно запрашивает media endpoint для `featured_media` и добавляет `featured_image_url`.
- Обрабатывайте пустые массивы, отсутствующие `children`, `featured_image_url` и неуспешные ответы. Сейчас часть компонентов предполагает счастливый путь.
- Не создавайте новый `QueryClient` внутри render-функций. Текущий singleton находится в `components/shared/api/index.ts`.
- При серьезной SSR/hydration переработке вынесите React Query provider в отдельный клиентский provider, но не делайте это как побочный рефакторинг.

## Безопасность и HTML

В проекте есть `dangerouslySetInnerHTML` для Builder.io и WordPress content:

- `components/shared/Accordioon.tsx`;
- `components/News/index.tsx`.

Не используйте `dangerouslySetInnerHTML` для произвольного пользовательского ввода. Если добавляете новый HTML-вывод, явно укажите источник данных и способ sanitization или доверенную границу.

## Текущий baseline качества

На момент создания этого файла:

- `pnpm lint` проходит с одним warning: `components/News/index.tsx` использует `<img>` вместо `next/image`;
- `pnpm exec tsc --noEmit --pretty false` падает на типах `components/News/index.tsx`, потому что данные WordPress API выводятся как `unknown`.

Не скрывайте эти ошибки через новые `any` или `@ts-ignore`. Если задача касается `News` или `shared/api`, лучше исправить baseline типами для WordPress news/menu responses.

## Git и рабочее дерево

- Перед изменениями смотрите `git status --short`.
- Не откатывайте чужие изменения. В рабочем дереве могут быть локальные правки в компонентах, `package.json` или `pnpm-lock.yaml`, не связанные с вашей задачей.
- Коммитьте только файлы, относящиеся к задаче.
- Не редактируйте generated artifacts (`.next`, `out`, `next-env.d.ts`) вручную.

## Чеклист перед ответом пользователю

- Изменения соответствуют App Router и текущей структуре проекта.
- Env-значения не раскрыты.
- Для UI-правок проверены desktop/mobile состояния header, footer и affected route.
- Для Builder.io изменений обновлен `builder-registry.ts` и сохранена совместимость inputs.
- Для API-правок добавлены или уточнены типы данных.
- Указаны реально выполненные проверки и их результат.
