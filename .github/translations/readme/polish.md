# Relivator: Najbogatszy w funkcje starter Next.js 14

<!-- https://github.com/blefnk/relivator#readme -->

🌐 [Relivator Demo](https://relivator.bleverse.com)

<!-- **TŁUMACZENIE NIE JEST AKTUALNE Z v1.2.4 [WERSJI ANGLOJĘZYCZNEJ README.MD](https://github.com/blefnk/relivator#readme)!** -->

**Uwaga: Poniższy tekst jest w większości maszynowym tłumaczeniem pliku [README.md](https://github.com/blefnk/relivator#readme). Aktywnie pracujemy nad jego ulepszeniem. Prosimy o zapoznanie się z oryginałem, jeśli niektóre fragmenty tekstu są niejasne.**

Naszym celem jest stworzenie najbardziej bogatego w funkcje i globalnego startera Next.js na świecie. Oferuje więcej niż tylko kod - to podróż. Jest stabilny i gotowy do produkcji. Przewiń w dół i sprawdź zapierającą dech w piersiach listę funkcji projektu, w tym przełączanie między Clerk/NextAuth.js oraz MySQL/PostgreSQL "on-the-fly".

## Jak zainstalować i rozpocząć

1. **Niezbędne narzędzia**: Upewnij się, że [_VSCode_](https://code.visualstudio.com), [_Git_](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git), _GitHub Desktop_ ([Windows/macOS](https://desktop.github.com/) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)) i _Node.js LTS_ ([Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis)) są zainstalowane.
2. **Klonowanie projektu**: [_Utwórz nowy fork_](https://github.com/blefnk/relivator/fork) i użyj GitHub Desktop, aby go pobrać.
3. **Konfiguracja**: Otwórz VSCode i załaduj folder projektu. Naciśnij `Ctrl+Shift+P` i wyszukaj `>Create New Terminal`. Zainstaluj _PNPM_ używając `corepack enable`. Następnie wpisz `pnpm install`, aby zainstalować pakiety. Następnie skopiuj plik `.env.example` do nowego pliku `.env` i wypełnij przynajmniej pola `NEXT_PUBLIC_DB_PROVIDER` i `DATABASE_URL`. Na koniec wyślij schemat bazy danych do swojej bazy danych za pomocą `pnpm mysql:push` lub `pnpm pg:push`.
4. **Run, Stop, Build**: Użyj `pnpm dev` by uruchomić aplikację (odwiedź <http://localhost:3000> by to sprawdzić). Zatrzymaj ją, skupiając się na konsoli i naciskając `Ctrl+C`. Po wprowadzeniu zmian, zbuduj aplikację używając `pnpm build`. W porządku, jeśli zobaczysz ostrzeżenia Clerk.
5. **Commit and Deploy**: Prześlij projekt do swojego profilu GitHub za pomocą GitHub Desktop. Następnie wdróż go, importując projekt do [Vercel](https://vercel.com/new), dzięki czemu Twoja witryna będzie publicznie dostępna w Internecie. Jeśli chcesz podzielić się swoją pracą, uzyskać opinię lub poprosić o pomoc, możesz to zrobić [na naszym serwerze Discord](https://discord.gg/Pb8uKbwpsJ) lub [za pośrednictwem dyskusji GitHub](https://github.com/blefnk/relivator/discussions).

Przewiń stronę w dół, aby zobaczyć wiele przydatnych informacji o tym, jak wszystko działa w projekcie.

## Lista kontrolna funkcji projektu

Przestań biegać od jednego startera do drugiego. Dzięki Relivator będziesz mieć nieograniczone możliwości. Możesz stworzyć wszystko, co chcesz; wszystkie narzędzia są już przygotowane, specjalnie dla Ciebie.

**Uwaga:** Co dwa tygodnie darujemy wczesny dostęp do przyszłych wtyczek Relivator trzem losowo wybranym osobom. Po prostu dodaj `gwiazdkę do tego repozytorium` i [daj nam znać, jak się z Tobą skontaktować](https://forms.gle/NXZ6QHpwrxh52VA36). Aby dyskutować, dołącz do [Discord projektu](https://discord.gg/Pb8uKbwpsJ).

- [x] Wykorzystano [Next.js 14](https://nextjs.org), [React 18](https://react.dev), [TailwindCSS](https://tailwindcss.com) i [TypeScript](https://typescriptlang.org) to podstawowe technologie projektu.
- [x] Wdrożono uwierzytelnianie poprzez **zarówno [Clerk](https://clerk.com/), jak i [NextAuth.js](https://authjs.dev)**.
- [x] Rozpętano szeroką internacjonalizację **w 10 językach** (_angielski, niemiecki, hiszpański, perski, francuski, hindi, włoski, polski, turecki, ukraiński_), używając [next-intl](<https://next-intl> -docs.vercel.app).
- [x] Podjęto próbę [Drizzle ORM](https://orm.drizzle.team), wykorzystując **bazy danych MySQL i PostgreSQL** oraz [PlanetScale](https://planetscale.com)/[Neon](https://neon.tech)/[Vercel](https://vercel.com)/[Railway](https://railway.app).
- [x] Pomyślnie skonfigurowano `next.config.mjs` z obsługą i18n i MDX.
- [x] Przez cały projekt dążyłem do dokładnej dokumentacji i przyjaznego podejścia dla początkujących.
- [x] Umiejętnie skonfigurowany i skomentowany `middleware.ts` dla i18n i next-auth.
- [x] Skonfigurowano system Content-Security-Policy (CSP) jako środek bezpieczeństwa zapobiegający atakom XSS (domyślnie wyłączony).
- [x] Podano przykładowe ustawienia VSCode i zalecane rozszerzenia.
- [x] Zoptymalizowano [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) pod kątem SEO, integrując procedury obsługi systemu plików.
- [x] Zintegrowano wskaźnik rozmiaru ekranu TailwindCSS dla lokalnych uruchomień projektów.
- [x] Utworzono system subskrypcji i kasowania użytkowników przy użyciu [Stripe](hhttps://github.com/stripe/stripe-node#readme).
- [x] Zapewniono weryfikację bezpieczeństwa typów schematów projektu i pól interfejsu użytkownika przy użyciu [Zod](https://zod.dev).
- [x] Zatrudniłem [EsLint](https://eslint.org) i [Prettier](https://prettier.io), aby zapewnić bezpieczeństwo i czytelność kodu.
- [x] Elegancko wykonany system czcionek, wykorzystujący [Inter](https://rsms.me/inter) i dodatkowe kroje pisma.
- [x] Opracowano witrynę sklepową zawierającą funkcjonalność produktu, kategorii i podkategorii.
- [x] Zaprojektowano nowoczesny, przejrzyście skomponowany interfejs użytkownika przy użyciu [Radix](https://radix-ui.com) z atrakcyjnymi komponentami interfejsu użytkownika od [shadcn/ui](https://ui.shadcn.com).
- [x] Utworzono obszerny, przyjazny dla początkujących plik „README.md”, zawierający opisy [zmiennych środowiskowych] (<https://nextjs.org/docs/basic-features/environment-variables>).
- [x] Funkcjonalność bloga realizowana poprzez wykorzystanie plików MDX.
- [x] Zaimplementowano [tRPC](https://trpc.io) i [Zapytanie TanStack](https://tanstack.com/query) (z [React Normy](<https://github.com/klis87/> normy#readme)), aby mieć zaawansowane pobieranie danych serwera i klienta.
- [ ] Użyj ścieżek bezwzględnych, jeśli są stosowane.
- [ ] Użyj [Kysely](https://kysely.dev) z Drizzle, aby uzyskać pełne bezpieczeństwo typu kreatora zapytań SQL TypeScript.
- [ ] Przetłumacz README.md i powiązane pliki na więcej języków.
- [ ] Przekształć się poza prosty sklep e-commerce w uniwersalny starter stron internetowych.
- [ ] Uporządkuj `package.json` z poprawnie zainstalowanymi i uporządkowanymi pakietami w `zależnościach` i `devDependency`.
- [ ] Autor projektu powinien opublikować serię szczegółowych filmów wideo na temat korzystania z tego projektu. Powinni też znaleźć się pasjonaci chcący publikować w swoich zasobach własne filmy o projekcie.
- [ ] Zmniejsz w miarę możliwości liczbę pakietów projektu, plików konfiguracyjnych itp.
- [ ] Ogranicz zagnieżdżanie znaczników HTML i zapewnij ich prawidłowe użycie, jeśli to możliwe.
- [ ] Nadaj priorytet dostępności, zarówno w przypadku interfejsu użytkownika aplikacji (interfejsu użytkownika), UX (doświadczenia użytkownika), jak i DX (doświadczenia programisty) dla programistów. Zachowaj użyteczność bez uszczerbku dla estetyki.
- [ ] Preferuj `funkcję`/`typ` zamiast `const`/`interfejs`, aby zachować czytelny, czysty i przyjazny dla początkujących kod.
- [ ] Zoptymalizuj wszystkie elementy aplikacji, aby poprawić prędkość zimnego startu programistów i kompilacji.
- [ ] Przeprowadź migrację do NextAuth.js' [next-auth@beta](https://npmjs.com/package/next-auth?activeTab=versions) ([dyskusje](<https://github.com/nextauthjs/> next-auth/releases/tag/next-auth%405.0.0-beta.4)) i do [@clerk/*@alpha] Clerka.
- [ ] Przenieś każdy powiązany system do jego specjalnego folderu (do folderu `src/core`), aby każdy system mógł zostać łatwo usunięty z projektu, jeśli zajdzie taka potrzeba.
- [ ] Przenieś style komponentów do plików .css lub .scss lub użyj pakietów zapewniających lepszą składnię stylów w plikach .tsx.
- [ ] Zarządzaj weryfikacją e-maili, zapisami do biuletynu i marketingiem e-mailowym za pomocą opcji [Wyślij ponownie] (<https://resend.com>) i [Reaguj e-mailem] (<https://react.email>).
- [ ] Spraw, aby każda zmienna środowiskowa była opcjonalna, umożliwiając aplikacji działanie bez skonfigurowania czegokolwiek, po prostu pomijając określone sekcje kodu, jeśli to konieczne.
- [ ] Po wbudowaniu terminala programistycznego upewnij się, że każda strona i oprogramowanie pośrednie są zielone lub żółte, ale nie czerwone.
- [ ] Utrzymuj projekt w najlepszym możliwym sposobie pisania dobrego i czystego kodu, postępując zgodnie z wytycznymi takimi jak [Przewodnik po stylu JavaScript Airbnb](https://github.com/airbnb/javascript/tree/master/react) / [Airbnb Przewodnik po stylu React/JSX](https://github.com/airbnb/javascript/tree/master/react).
- [ ] Utrzymuj projekt wolny od `@ts-expect-error` i powiązanych rzeczy, które nie są zbyt bezpieczne dla typów.
- [ ] Utrzymuj jak najmniejszą liczbę plików cookie, przygotuj się na przyszłość bez plików cookie, wdrażaj zarządzanie plikami cookie i powiadomienia.
- [ ] Wprowadź system komentarzy do produktów, obejmujący typy recenzji i pytań.
- [ ] Zintegruj cenne spostrzeżenia z [Next.js Weekly](https://nextjsweekly.com/issues) z tym starterem.
- [ ] Zintegruj cenne rzeczy z [Przykładów Next.js](https://github.com/vercel/next.js/tree/canary/examples) do tego projektu.
- [ ] Wdrożyć inteligentny i ujednolicony system logów, zarówno na potrzeby programowania, jak i produkcji, zarówno dla konsoli, jak i zapisu do określonych plików.
- [ ] Zaimplementuj najlepsze rzeczy z [Payload CMS](https://github.com/payloadcms/payload) dzięki ulepszeniom Relivator.
- [ ] Implementuj przesyłanie plików za pomocą [UploadThing](https://uploadthing.com) i [Cloudinary](https://cloudinary.com).
- [ ] Zaimplementuj dynamiczne przełączanie między funkcjami aplikacji, takimi jak dostawca bazy danych, dokonując odpowiednich kontroli zmiennych środowiskowych.
- [ ] Zaimplementuj pełną obsługę `next dev --turbo`.
- [ ] Zaimplementuj obsługę Storybook 8.0 (przeczytaj ogłoszenie „[Storybook for React Server Components](https://storybook.js.org/blog/storybook-react-server-components)”.
- [ ] Wdrażaj możliwości współpracy, korzystając z takich rzeczy jak [liveblocks](https://liveblocks.io).
- [ ] Zaimplementuj dokumentację do projektu i przenieś każde wyjaśnienie z kodu do tego dokumentu.
- [ ] Zaimplementuj Sentry do obsługi błędów i raportów CSP dla aplikacji.
- [ ] Zaimplementuj głęboką zgodność funkcji i łatwą migrację z Reliverse.
- [ ] Zaimplementuj własną wersję [Saas UI] (<https://saas-ui.dev/>) Relivator/Reliverse, aby była w pełni kompatybilna z naszym projektem z tylko potrzebną funkcjonalnością, z użyciem Tailwind i Shadcn zamiast Chakra.
- [ ] Zaimplementuj nasz własny rozwidlenie biblioteki [Radix Themes] (<https://www.radix-ui.com/>) z skonfigurowanym `<main>` jako opakowaniem zamiast aktualnej `<sekcji>`; LUB zaimplementuj nasze własne rozwiązanie, które generuje Tailwind zamiast klas Radix.
- [ ] Implementuj funkcje AI i czat, używając na przykład [Vercel AI SDK](https://sdk.vercel.ai/docs) (patrz: [Przedstawiamy zestaw Vercel AI SDK](<https://vercel.com> /blog/przedstawiamy-vercel-ai-sdk)).
- [ ] Zaimplementuj zaawansowane przełączanie motywów bez flashowania, wykorzystując tryb ciemny Tailwind z [obsługą React Server Side](https://michaelangelo.io/blog/darkmode-rsc) i dynamicznymi plikami cookie.
- [ ] Zaimplementuj testy [Jest](https://jestjs.io), zoptymalizowane pod kątem Next.js.
- [ ] Zaimplementuj pełną obsługę [Million.js](https://million.dev) (przeczytaj [Ogłoszenie Million 3.0](https://million.dev/blog/million-3), aby dowiedzieć się więcej).
- [ ] Zaimplementuj obsługę [GraphQL](https://hygraph.com/learn/graphql) bezpieczną dla typu, używając framework [Fuse.js](https://fusejs.org).
- [ ] Zaimplementuj CLI, aby szybko uzyskać Relivator tylko z wybranymi opcjami; spróbuj użyć [Charm](https://charm.sh) rzeczy do zbudowania interfejsu CLI Reliverse.
- [ ] Gwarancja, że każda możliwa strona zostanie otoczona przy użyciu przedefiniowanych opakowań powłoki.
- [ ] Obficie komentuj cały kod, dbając o jego czystość.
- [ ] W pełni opracuj zaawansowane strony rejestracji i logowania, integrując zarówno media społecznościowe, jak i metody klasycznych formularzy.
- [ ] Postępuj zgodnie z zaleceniami [Material Design 3](https://m3.material.io) i innych systemów projektowania, jeśli ma to zastosowanie.
- [ ] Postępuj zgodnie ze sprawdzonymi metodami z artykułów i filmów, takich jak „[10 antywzorców reagowania, których należy unikać](https://www.youtube.com/watch?v=b0IZo2Aho9Y)” (sprawdź także sekcję z komentarzami).
- [ ] Ustal, udokumentuj i przestrzegaj konwencji, takich jak utrzymywanie jednego stylu nazewnictwa dla plików i zmiennych.
- [ ] Utworzenie wszechstronnego i18n, wykorzystującego kody krajów i ustawień regionalnych oraz obsługę jeszcze większej liczby języków. Upewnij się, że native speakerzy sprawdzają każdy język po tłumaczeniu maszynowym. Rozważ użycie biblioteki [next-international](https://github.com/QuiiBz/next-international).
- [ ] Wyeliminuj wszelkie wyłączenia w pliku `.eslintrc.cjs`, skonfiguruj konfigurację na ścisłą, ale nadal przyjazną dla początkujących.
- [ ] Zapewnij najwyższe bezpieczeństwo typów, używając trybu ścisłego w [TypeScript] (<https://typescriptlang.org>), typedRoutes, Zod, oprogramowaniu pośrednim itp.
- [ ] Upewnij się, że w projekcie nie ma żadnych nieużywanych elementów, w tym pakietów, bibliotek, zmiennych itp.
- [ ] Zapewnij pełną obsługę i kompatybilność Next.js Edge.
- [ ] Upewnij się, że projekt używa pętli tam, gdzie jest to naprawdę i zdecydowanie konieczne (artykuł: [Kodowanie bez pętli](https://codereadability.com/coding-without-loops)).
- [ ] Zapewnij pełną obsługę i kompatybilność [Biome](https://biomejs.dev/), [Bun](https://bun.sh) i [Docker](https://docker.com).
- [ ] Upewnij się, że wszystkie języki witryny są poprawne gramatycznie i zgodne z najnowszymi zasady dla każdego języka.
- [ ] Upewnij się, że wszystkie elementy projektu są posortowane w kolejności rosnącej, chyba że gdzie indziej wymagane jest inne sortowanie.
- [ ] Zapewnij dostępność **użytkownikom**, **programistom** (zarówno początkującym, jak i ekspertom), **botom** (takim jak [Googlebot](<https://developers.google.com/search/docs/crawling> -indexing/googlebot) lub [robot indeksujący PageSpeed Insights](https://pagespeed.web.dev)), dla **wszystkich**.
- [ ] Ulepszono konfigurację `middleware.ts` dzięki implementacji multi-middleware.
- [ ] Wykorzystaj wszystkie odpowiednie biblioteki [TanStack](https://tanstack.com).
- [ ] Elegancko skonfiguruj `app.ts`, oferując jedną konfigurację, która zastąpi wszystkie inne.
- [ ] Opracuj przepływy pracy zarówno dla sprzedawców, jak i klientów.
- [ ] Stwórz zaawansowaną witrynę sklepową zawierającą produkty, kategorie i podkategorie.
- [ ] Opracuj zaawansowaną stronę 404 Not Found z pełną obsługą internacjonalizacji.
- [ ] Opracuj zaawansowaną rejestrację, logowanie i przywracanie za pomocą hasła e-mail i magicznych linków.
- [ ] Opracuj jeszcze bardziej wyrafinowaną implementację subskrypcji użytkowników i systemu realizacji transakcji za pośrednictwem Stripe; a także napisz testy Jest/Ava dla Stripe i użyj do tych testów plików danych `.thing/hooks/stripe_*.json` [webhookthing](https://docs.webhookthing.com).
- [ ] Zmniejsz liczbę plików, łącząc podobne elementy itp.
- [ ] Stwórz możliwie najbardziej przyjazny dla początkujących i estetyczny starter.
- [ ] Utwórz zaawansowany system powiadomień, obejmujący tostery, wyskakujące okienka i strony.
- [ ] Utwórz nową stronę docelową z charakterystycznym projektem i zaktualizuj komponenty, a także całkowicie przeprojektuj wszystkie pozostałe strony i komponenty.
- [ ] Potwierdź, że projekt nie zawiera duplikatów, takich jak pliki, komponenty itp.
- [ ] Przeprowadź przydatne testy, w tym ewentualne testy warunków skrajnych, aby symulować i oceniać wydajność aplikacji w warunkach dużego ruchu.
- [ ] Kompleksowa konfiguracja routera aplikacji Next.js 14 z trasami API zarządzanymi przez moduły obsługi tras, w tym RSC i wszystkimi innymi nowymi funkcjami.
- [ ] Wypełnij listę kontrolną BA11YC (Konwencja dostępności Bleverse).
- [ ] Wypełnij części [listy kontrolnej BA11YC (Konwencja Bleverse Accessibility)](https://github.com/bs-oss/BA11YC).
- [ ] Zwiększ wyniki wydajności aplikacji na platformach takich jak Google PageSpeed Insights. Upewnij się, że aplikacja przeszła wszystkie rygorystyczne testy.
- [ ] W razie potrzeby zastosuj bibliotekę [next-usequerystate](https://github.com/47ng/next-usequerystate) ([przeczytaj artykuł](<https://francoisbest.com/posts/2023/storing-react> -stan-w-adresie-url-z-następnymi)).
- [ ] Dodaj do projektu kilka interesujących i przydatnych typów, na przykład korzystając z biblioteki [type-fest](https://github.com/sindresorhus/type-fest).
- [ ] Dodaj najcenniejsze i najbardziej przydatne rzeczy ESLint z kolekcji [awesome-eslint](https://github.com/dustinspecker/awesome-eslint).
- [ ] Dodaj wyskakujące okienka dla powiadomień o plikach cookie/RODO (z odpowiednią stroną ustawień zarządzania) i pływające powiadomienia Google umożliwiające szybkie logowanie itp.
- [ ] Dodaj panel administracyjny zawierający sklepy, produkty, zamówienia, subskrypcje i płatności.
- [ ] Dodaj zaawansowane wskaźniki zainstalowanych pakietów, zmienne środowiskowe i ulepszenia rozmiarów ekranu TailwindCSS.

Ten plan działania przedstawia najważniejsze funkcje i ulepszenia planowane do wdrożenia w tym starterze Next.js. Elementy nieoznaczone mogą być już skonfigurowane, ale mogły nie przejść szeroko zakrojonych testów. Jeśli znajdziesz jakieś błędy, utwórz problem.

![Zrzut ekranu strony docelowej Relivator](/public/screenshot.png)

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

## Polecenia projektu

- **`pnpm stripe:listen`**: To polecenie uruchamia odbiornik webhook Stripe i pomaga w konfigurowaniu zmiennych środowiskowych Stripe. Aby uruchomić to polecenie, może być konieczne zainstalowanie [Stripe CLI](https://stripe.com/docs/stripe-cli).
- **`pnpm appts`**: To polecenie przeprowadza kompleksowe sprawdzenie bazy kodu. Wykonuje sekwencyjnie polecenie „pnpm lint” w celu lintingu kodu, „pnpm typecheck” w celu sprawdzenia typu i zidentyfikowania błędów TypeScript, „pnpm format” w celu sformatowania w Prettier, „pnpm test” w celu sprawdzenia testów Jest i na koniec uruchamia `kompilacja pnpm`.
- **`pnpm last`**: To polecenie aktualizuje wszystkie pakiety projektu do najnowszych stabilnych wersji i aktualizuje `next-intl` do najnowszej wersji beta/rc.
- **`pnpm up-next:canary`**: To polecenie uruchamia `pnpm najnowszy` i aktualizuje Next.js i React do najnowszych wersji dostępnych w ich oddziałach Canary. Używaj tej opcji tylko wtedy, gdy masz pewność, dlaczego jej potrzebujesz.

## O projekcie

Położyliśmy fundamenty — teraz Twoja kolej, aby zagłębić się w szczegóły i przyspieszyć swój rozwój. I tak, baw się dobrze — pomyśl o Relivator jak o sandbox\*\*! To jest jak Minecraft; z Relivator możesz zbudować wszystko, ponieważ Twoja kreatywność nie ma granic! Odkryj wszystko, co nowe w z Next.js 14 i wieloma rzeczami internetowymi tu i teraz — dzięki Relivator.

Możesz nawet myśleć o Relivator jako o frameworku Next.js! Więc w końcu, po prostu to złap, pobierz i ciesz się! I nie zapominaj: Twoja opinia i gwiazdki są dla nas bardzo ważne. Naciśnij ten gwiazdkowy przycisk, prosimy! Zrób forka! Twoje zaangażowanie podnosi projekt na nowe wyżyny! Jeśli masz umiejętności kodowania, Twoje wnioski kodu są zawsze mile widziane!

Napotkałeś problemy? Dołącz do dyskusji w naszym repozytorium, otwórz problem lub napisz do nas na DM: [Twitter/𝕏](https://x.com/blefnk), [Discord](https://discord.gg/Pb8uKbwpsJ), [Fiverr](https://fiverr.com/blefnk), [LinkedIn](https://linkedin.com/in/blefnk) lub [Facebook](https://facebook.com/blefnk).

Ten projekt ma wielkie plany i cenimy każdą pomoc, jaką możemy uzyskać! Jeśli chcesz dokonać własnych zmian, zapoznaj się z powyższą mapą drogową projektu, aby zobaczyć potencjalne ulepszenia projektu. Użyj także `Cmd/Ctrl+Shift+F` w VSCode i wyszukaj `todo:`, aby znaleźć miejsca wymagające uwagi. Odwiedź kartę **[Zatwierdzenia](https://github.com/blefnk/relivator/issues)**, aby uzyskać więcej możliwości pomocy.

[![Dołącz do Relivator Discord](https://discordapp.com/api/guilds/1075533942096150598/widget.png?style=banner2)][bleverse-discord]

**🔥 Szybko się rozwijamy! Ogromne podziękowania dla [wszystkich naszych wspierających](https://github.com/blefnk/relivator/stargazers)! Sprawdź historię naszych gwiazd:**

[![Wykres historii gwiazd](https://api.star-history.com/svg?repos=blefnk/relivator&type=Date)](https://star-history.com/#blefnk/relivator&Date)

> **Uwaga**
> Starając się być bardzo użytecznym, ten plik README zawiera wiele informacji. Niektóre teksty mogą być nieaktualne i będą aktualizowane w miarę rozwoju. Daj nam znać na [stronie dyskusji](https://github.com/blefnk/relivator/discussions/6), jeśli zauważysz jakieś drobne problemy, takie jak nieaktualne informacje, uszkodzone linki lub błędy gramatyczne/ortograficzne w pliku README.md lub inne pliki.

## Zmienne środowiskowe (plik `.env`)

**Jako przewodnik użyj pliku [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example). Po prostu skopiuj z niego dane do nowego pliku `.env`.**

Zmienne środowiskowe `DATABASE_URL`, `NEXT_PUBLIC_DB_PROVIDER` i `NEXT_PUBLIC_AUTH_PROVIDER` są obowiązkowe; inne są opcjonalne. Możesz wdrożyć aplikację w niezmienionej postaci, ale upewnij się, że sprawdziłeś, co jest konieczne. Chociaż aplikacja będzie działać bez pewnych zmiennych, ich brak może dezaktywować określone funkcje.

Upewnij się, że dla podstawowych zmiennych środowiskowych zdefiniowano wartości domyślne. Nigdy nie przechowuj sekretów w pliku `.env.example`. W przypadku nowicjuszy lub klonujących repo użyj `.env.example` jako szablonu do utworzenia pliku `.env`, upewniając się, że nigdy nie zostanie on zatwierdzony. Zaktualizuj schemat w `/src/env.mjs` podczas dodawania nowych zmiennych.

Dalsze [informacje o zmiennych środowiskowych są dostępne tutaj](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

_Już wkrótce pojawi się czystsza i ulepszona wersja tej sekcji. Miej oko!_

W wersji 1.1.0 Relivator plik `.env.example` został znacznie uproszczony i będzie jeszcze bardziej usprawniony w nadchodzących wersjach. Naszym celem jest zapewnienie, że nieokreślone wartości po prostu dezaktywują powiązane funkcje bez zatrzymywania kompilacji aplikacji.

## Płatności w paski

Skorzystaj z pliku [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example) jako przewodnika, gdzie i jak uzyskać wszystkie ważne klucze zmiennych środowiskowych dla Stripe , w tym webhooki zarówno dla hosta lokalnego, jak i wdrożenia.

Lokalnie zainstaluj [Stripe CLI] (<https://stripe.com/docs/stripe-cli>) i uruchom polecenie „pnpm stripe:listen”, aby zainicjować odbiornik webhook Stripe. Ta czynność łączy Stripe z Twoim kontem i generuje klucz webhooka, który możesz następnie ustawić jako zmienną środowiskową w ustawieniach Stripe.

Podczas testowania Stripe możesz wykorzystać jego dane testowe: `4242424242424242` | `12/34` | `567` | `Losowa nazwa` | „Przypadkowy kraj”.

Proszę zapoznać się z plikiem [src/app/api/webhooks/stripe/route.ts](https://github.com/blefnk/relivator/blob/main/src/app/api/webhooks/stripe/route.ts) aby dowiedzieć się więcej o szczegółach działania Stripe w aplikacji. Możesz także odwiedzić [oficjalne repozytorium Stripe](https://github.com/stripe/stripe-node#readme), gdzie znajdziesz wiele przydatnych informacji.

## Obsługa baz danych

Relivator został zaprojektowany tak, aby bezproblemowo obsługiwać zarówno bazy danych `MySQL`, jak i `PostgreSQL`. Chociaż jest dostarczany z MySQL i [PlanetScale](https://planetscale.com) skonfigurowanymi jako domyślny dostawca bazy danych, przejście na PostgreSQL zapewniane przez [Neon](https://neon.tech)/[Vercel](https:/ /vercel.com/storage/postgres)/[Railway](https://railway.app) — to naprawdę proste jak bułka z masłem. Aby to zrobić, po prostu zaktualizuj klucz `NEXT_PUBLIC_DB_PROVIDER` w pliku `.env` do odpowiednio `neon`/`vercel`/`railway`. Chociaż Relivator jest zoptymalizowany dla tych dostawców, inne kompatybilne z Drizzle i NextAuth.js mogą również działać, chociaż mogą wymagać dodatkowej konfiguracji.

Aby zainicjować nową bazę danych lub propagować zmiany schematu, wykonaj polecenie `pnpm mysql:push` lub `pnpm pg:push`. Dzięki temu wszystkie wersje robocze plików schematu — znajdujące się w `src/data/db/*` — zostaną odzwierciedlone w wybranym dostawcy bazy danych.

W przypadku migracji baz danych użyj polecenia `mysql:generate`/`pg:generate`, przejrzyj folder `drizzle`, aby upewnić się, że wszystko jest w porządku (uruchom `db:drop`, jeśli nie) i uruchom komendę `pnpm:migrate`, gdy są gotowi.

Upewnij się, że nie usuwasz ręcznie plików z katalogu `drizzle`. Jeśli konieczne jest cofnięcie migracji, użyj metody [`ppm db:drop`](https://orm.drizzle.team/kit-docs/commands#drop-migration), aby zarządzać tym w kontrolowany sposób.

W wydaniu Relivator v1.1.0 dołożyliśmy wszelkich starań, aby zapewnić jednoczesną obsługę zarówno MySQL, jak i PostgreSQL dla Drizzle ORM. W przyszłych wersjach zamierzamy zintegrować Prisma ORM również z tym projektem. Dzięki temu projekt będzie jeszcze bardziej włączający dla wszystkich.

Domyślnie upewniamy się, że każdy system baz danych ma wszystko to samo, używając zmiennej env `NEXT_PUBLIC_DB_PROVIDER` i eksportując rzeczy do pliku `src/data/db/index.ts`. Kiedy już zdecydujesz, który dostawca bazy danych najlepiej odpowiada Twoim potrzebom, możesz bezpiecznie skomentować lub usunąć niepotrzebnych dostawców w „skrzynce przełącznika” tego pliku, a następnie można również usunąć powiązane pliki schematu; pamiętaj, że może być również wymagana niewielka dodatkowa praca.

### Dodatkowe uwagi na temat paska

Trasa interfejsu API webhooka Stripe nie musi być wywoływana jawnie w aplikacji, na przykład po wybraniu przez użytkownika planu subskrypcji lub dokonaniu zakupu. Webhooki działają niezależnie od działań użytkownika na interfejsie i służą Stripe do przekazywania zdarzeń bezpośrednio do Twojego serwera.

Gdy po stronie Stripe nastąpi zdarzenie, np. pomyślna płatność, Stripe generuje obiekt zdarzenia. Obiekt ten jest następnie automatycznie wysyłany do określonego punktu końcowego, albo w panelu kontrolnym Stripe, albo w celach testowych w pliku `package.json` poprzez interfejs CLI Stripe. Na koniec trasa API Twojego serwera odbiera zdarzenie i odpowiednio je przetwarza.

Na przykład, gdy użytkownik wybierze plan subskrypcji, zazwyczaj najpierw użyjesz interfejsu API Stripe, aby utworzyć obiekt „Zamiar płatności” lub „Zamiar konfiguracji”. Tę akcję można wykonać po stronie klienta lub serwera. Następnie frontend potwierdza płatność za pomocą Stripe.js, kończąc w ten sposób proces konfiguracji płatności lub subskrypcji.

Twój webhook jest automatycznie uruchamiany na podstawie tych zdarzeń. Nie ma potrzeby ręcznego „wywoływania” trasy webhooka; Stripe zarządza tym za Ciebie zgodnie z Twoimi ustawieniami w Panelu Stripe lub w pliku `package.json` na potrzeby testów lokalnych.

Po wdrożeniu aplikacji nie zapomnij podać adresu URL elementu webhook w panelu kontrolnym Stripe. Przejdź do sekcji Webhooks i wprowadź następujący adres URL: `https://twojadomena.com/api/webhooks/stripe`.

Podsumowując, nie ma potrzeby określania ścieżki do trasy API Stripe, w której użytkownik wybiera plan subskrypcji. Mechanizm webhooka działa niezależnie i jest uruchamiany automatycznie przez Stripe.

## Internacjonalizacja

_Bądź na bieżąco z dalszymi rozszerzeniami tej sekcji w przyszłości._

Wielojęzyczność w Bleverse jest szanowana. Uwielbiamy o tym dyskutować i planujemy zagłębić się w temat internacjonalizacji routera aplikacji Next.js 14 w przyszłych artykułach.

Użyj `pnpm lint:i18n`, aby zweryfikować pliki i18n. Narzędzie próbuje naprawić problemy, jeśli to możliwe, oferując takie funkcje, jak sortowanie rosnąco. Brak sygnału wyjściowego oznacza, że wszystko jest w porządku.

Obecnie wszystkie języki są tłumaczone maszynowo. Planowane są przyszłe poprawki przez native speakerów.

Należy pamiętać, że wiadomości i18n z innego naszego projektu open source są obecnie obecne i wkrótce zostaną usunięte.

Do internacjonalizacji używamy wersji beta/rc _next-intl_. Więcej informacji o [tutaj](https://next-intl-docs.vercel.app/blog/next-intl-3-0) i [tutaj](<https://github.com/amannn/next-intl> /pociągnij/149).

**Obecnie obsługiwane lokalizacje (możesz dodać własne ręcznie):**

de-DE, en-US, es-ES, fa-IR, fr-FR, hi-IN, it-IT, pl-PL, tr-TR, uk-UA.

## Zasady, decyzje projektowe, spostrzeżenia dotyczące kodu, zalecenia

_Nieustannie udoskonalamy tę sekcję. Wpłaty są mile widziane!_

Nasz starter ma być bogatym źródłem informacji dla programistów na wszystkich etapach ich podróży. W blokach komentarzy i dedykowanych sekcjach na końcu wybranych plików znajdziesz cenne spostrzeżenia i wyjaśnienia na szeroki zakres tematów. Gorąco zachęcamy do Twojego wkładu w ulepszanie tych edukacyjnych bryłek!

**Zasady (W.I.P):**

- [ ] Każdy plik i komponent powinien być tworzony świadomie, z pewnym poczuciem inteligencji i z myślą o wydajności.
- [ ] Musimy myśleć o projekcie tak, jakby był planetą z własnymi kontynentami, krajami, miastami, pokojami, osobami, podmiotami itp.

**Wysoce zalecane rozszerzenia VSCode:**

1. [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
2. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
3. [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
4. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
5. [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
6. [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
7. [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
8. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
9. [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
10. [POP! Icon Theme](https://marketplace.visualstudio.com/items?itemName=mikekscholz.pop-icon-theme)
11. [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
12. [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
13. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
14. [TailwindCSS Tune](https://marketplace.visualstudio.com/items?itemName=omkarbhede.tailwindcss-tune)
15. [TypeScript Essential Plugins](https://marketplace.visualstudio.com/items?itemName=zardoy.ts-essential-plugins)

<details>
   <summary>Dlaczego zalecane są „Niezbędne wtyczki TypeScript”</summary>

«Kompletna wtyczka TypeScript, która ulepsza każdą wbudowaną funkcję, taką jak uzupełnienia, definicje, odniesienia itd., a także dodaje nawet nowe funkcje zabójcze TypeScript, dzięki czemu możesz szybciej pracować z dużymi bazami kodu! Sprawiamy, że uzupełnienia są bardziej pouczające. Definicje, odniesienia (a czasem nawet uzupełnienia) są mniej hałaśliwe. I wreszcie naszym głównym celem jest zapewnienie najbardziej konfigurowalnego środowiska TypeScript dla funkcji IDE.» © [Repozytorium rozszerzeń VSCode](https://github.com/zardoy/typescript-vscode-plugins#readme)

Uwaga: możesz skonfigurować ustawienia rozszerzenia, otwierając interfejs użytkownika ustawień VSCode i wyszukując tam `@ext:zardoy.ts-essential-plugins`.

</details>

**Zaawansowane zmienne środowiskowe:**

Plik `.env.example` zawiera wszystkie niezbędne zmienne dla w pełni funkcjonalnej strony internetowej, dostosowanej dla początkujących. Jeśli jednak potrzebujesz zaawansowanych konfiguracji, możesz w razie potrzeby zmodyfikować dowolną wartość w pliku `.env`.

**Informacje o folderze wtyczek:**

Ten folder zawiera opcjonalne wtyczki do Relivator. Wtyczki te, opracowane przez @blefnk i innych autorów, rozszerzają funkcjonalność i zapewniają dodatkowe funkcje. Jeśli stwierdzisz, że niektóre wtyczki nie są korzystne dla Twojego projektu, możesz usunąć odpowiadające im foldery.

**Funkcja nad stałą dla komponentów:**

Zalecamy używanie słowa kluczowego `function` zamiast `const` podczas definiowania komponentów React. Używanie „funkcji” często poprawia ślady stosu, ułatwiając debugowanie. Dodatkowo sprawia, że semantyka kodu jest bardziej przejrzysta, ułatwiając w ten sposób innym programistom zrozumienie Twoich intencji.

**Osobiste rekomendacje:**

Zalecamy regularne czyszczenie pamięci podręcznej przeglądarki i usuwanie folderu `.next`, aby zapewnić optymalną wydajność i funkcjonalność.

Obecnie nie korzystamy z Contentlayer ze względu na jego niestabilność w systemie Windows. Dlatego badamy możliwości jego użycia w pliku konfiguracyjnym `.env`. Plany na przyszłość mogą obejmować opracowanie własnego rozwiązania do pisania treści. Integracja z dostawcami zewnętrznymi, takimi jak Sanity, może być również przyszłą funkcją, z odpowiednimi opcjami włączania/wyłączania.

**Konfiguracja projektu:**

Plik `src/app.ts` zawiera krytyczne konfiguracje umożliwiające modyfikację zawartości i ustawień witryny internetowej, umożliwiając:

- Kontroluj treści prezentowane na stronie.
- Dostosuj różne ustawienia, takie jak dezaktywacja przełącznika motywu.
- Zarządzaj ogólnymi informacjami dotyczącymi całej witryny.

Dostosuj ten plik zgodnie ze swoimi wymaganiami.

**Uwierzytelnianie:**

Konfigurowanie uwierzytelniania jest proste.

Dostępnych dostawców logowania dla Clerk możesz skonfigurować w pliku `src/app.ts`.

Pamiętaj, że Clerk w pełni współpracuje z usługami stron trzecich, takimi jak „Google PageSpeed Insight”, tylko wtedy, gdy używana jest domena i aktywne klucze.

_Ta sekcja zostanie wkrótce wdrożona._

**Jak wdrożyć projekt:**

Przed przystąpieniem do wstępnego wdrożenia sprawdź sekcję _Jak zainstalować i rozpocząć pracę_.

Zapoznaj się z przewodnikami wdrażania dla [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) i [Docker](https://create.t3.gg/en/deployment/docker), aby uzyskać więcej informacji. Projekt został przetestowany jedynie na Vercel; prosimy o poinformowanie nas, jeśli napotkasz problemy z innymi usługami wdrożeniowymi.

**Projekt systemu i komponentów interfejsu użytkownika:**

DO ZROBIENIA: Wdrożenie systemu projektowania i przewodnika po stylu.

Domyślnie ten projekt zawiera komponenty z różnych bibliotek, a także komponenty [shadcn/ui](https://ui.shadcn.com) bez stylu. Shadcn/ui umożliwia nawet generowanie nowych komponentów interfejsu użytkownika przy użyciu interfejsu CLI (gdzie „przyciskiem” może być dowolny element interfejsu użytkownika Shadcn): `pnpm dlx shadcn-ui@latest add przycisk`.

**Zgodność z bułkami:**

`Relivator` może już wykorzystać kilka fantastycznych funkcji **[`Bun`](https://bun.sh)**. W przypadku tego startera obecnie zalecamy użycie `pnpm`. Pełna obsługa i kompatybilność Bun zostaną dostarczone, gdy tylko dostępne będą pliki binarne systemu Windows. _Rozbudowa sekcji już wkrótce._

**Typowy przepływ pracy w aplikacji (wkrótce):**

Obszerny przewodnik szczegółowo opisujący typowe zastosowania zostanie wkrótce wdrożony. Na razie oto krótki przegląd:

1. _Uruchom serwer deweloperski_: `ppm dev`
2. _Konfiguracja środowiska_: `.env`
3. _Konfiguracja oprogramowania pośredniego_: `middleware.ts`
4. _Dodatkowe kroki_: Bądź na bieżąco...

**FAQ (często zadawane pytania):**

_Q:_ Jak przyznać uprawnienia administratora sobie lub innemu użytkownikowi?
_A:_ Po prostu uruchom `pnpm db:studio`, przejdź do tabeli `acme_user` i ustaw `role: admin` dla użytkownika, którego potrzebujesz. W przyszłości, jeśli posiadasz uprawnienia administratora, będziesz mógł zmieniać uprawnienia wybranych użytkowników bezpośrednio ze strony administratora frontendu.

_Q:_ Co oznacza zmienna środowiskowa `DEV_DEMO_NOTES`?
_A:_ Po prostu tego nie używaj. Jest używany wyłącznie na oficjalnej [witrynie demonstracyjnej Relivator](https://relivator.bleverse.com) w celu zaprezentowania pewnych funkcji, które nie są potrzebne w rzeczywistych aplikacjach.

_P:_ Używam PlanetScale jako mojego dostawcy baz danych. Po przerwie w projekcie wyskakuje mi błąd „nie można połączyć się z oddziałem” w konsoli. Jak mogę to naprawić?
_A:_ Po prostu przejdź do panelu PlanetScale i kliknij przycisk „obudź”. Jeżeli Twoja baza danych nie śpi, a problem nadal występuje, skontaktuj się z nami.

**Zalecane rzeczy do nauczenia:**

1. [Introduction to Next.js and React](https://www.youtube.com/watch?v=h2BcitZPMn4) by [Lee Robinson](https://twitter.com/leeerob)
2. [Relivator: Next.js 14 Starter (Release Announce of Relivator on Medium)](https://cutt.ly/awf6fScS) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
3. [Welcome to the Wild World of TypeScript, Mate! Is it scary?](https://cutt.ly/CwjVPUNu) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
4. [React: Common Mistakes in 2023](https://docs.google.com/presentation/d/1kuBeSh-yTrL031IlmuwrZ8LvavOGzSbo) by [Cory House](https://twitter.com/housecor)
5. [Thoughts on Next.js 13, Server Actions, Drizzle, Neon, Clerk, and More](https://github.com/Apestein/nextflix/blob/main/README.md#overall-thoughts) by [@Apestein](https://github.com/Apestein)
6. [Huge Next-Multilingual Readme About i18n](https://github.com/Avansai/next-multilingual#readme) by [@Avansai](https://github.com/Avansai)

_Więcej zasobów edukacyjnych można znaleźć w plikach tego repozytorium._

## Migracja z innych starterów do Relivator

Jeśli zastanawiasz się, który starter Next.js wybrać do swojego następnego projektu, na przykład [create-next-app](https://vercel.com/templates/next.js/nextjs-boilerplate), [create-t3- aplikacja](https://create.t3.gg), [Next.js Commerce (Vercel Store)](https://vercel.store), [SkateShop](https://github.com/sadmann7/skateshop) , [OneStopShop](https://github.com/jackblatch/OneStopShop), [Taksonomia](https://github.com/shadcn-ui/taxonomy)/[nextflix](<https://github.com/Apestein> /nextflix), [ładunek] (<https://github.com/payloadcms/payload>), [Medusa] (<https://github.com/medusajs/medusa>) lub [dowolne inne projekty] (<https://github> .com/blefnk/relivator/wiki/Project-Credits-&-Contributors) – tutaj możesz zakończyć swoje poszukiwania.

Wszystkie te projekty są niesamowite i jeśli przemawia do Ciebie minimalizm, polecamy je sprawdzić. Twórcy tych projektów to niezwykle utalentowane osoby, za co serdecznie im dziękujemy. Bez nich ten starter by nie istniał.

Jednakże, **jeśli potrzebujesz POWERHOUSE** – Relivator odpowiedniego do każdego scenariusza – to **Relivator to zdecydowanie starter, którego potrzebujesz**, aby go teraz rozwidlić! Relivator zawiera wiele funkcji ze wszystkich tych projektów i stara się przesuwać granice możliwości Next.js i React. Dzięki Relivator Twoje możliwości są nieograniczone.

Jeśli **wybierzesz Relivator jako swój następny projekt startowy** i chcesz migrować z powyższych projektów do Relivator, daj nam kilka dni. Będziemy korzystać z wiki projektu, aby napisać tam przewodnik, jak to zrobić. W tym przewodniku dowiesz się jak przenieść swój projekt do naszego projektu. Przewodnik po migracji będzie dostępny zarówno dla katalogów „aplikacja”, jak i „strony”.

## Wkład i napisy

_Ta sekcja zostanie wkrótce wzbogacona o prostsze kroki umożliwiające przygotowanie wszystkiego._

Wpłaty są mile widziane! Wyrażamy naszą wdzięczność wszystkim, którzy przyczynili się do powstania tego repozytorium. Twój wkład zostanie doceniony. Jeśli masz jakieś pytania lub sugestie, otwórz problem. Aby uzyskać więcej informacji, zobacz [przewodnik współautora](https://github.com/blefnk/relivator/blob/main/contributing.md).

Odwiedź [tę specjalną stronę wiki](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors), aby wyświetlić pełną listę twórców i współautorów. Aby przyczynić się do Bleverse Relivator, wykonaj następujące kroki:

1. Zacznij od przeczytania sekcji „Jak zainstalować i rozpocząć” na górze tego repozytorium oraz od przeczytania pliku [CONTRIBUTING.md](https://github.com/blefnk/relivator/blob/main/contributing.md) strona.
2. Utwórz gałąź: `git checkout -b <nazwa_oddziału>`.
3. Wprowadź i zatwierdź zmiany: `git commit -m '<commit_message>'`
4. Prześlij do oryginalnej gałęzi: `git Push Origin <nazwa_branży>`
5. Prześlij żądanie ściągnięcia.

Alternatywnie przejrzyj dokumentację GitHuba na temat [jak utworzyć żądanie ściągnięcia](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) .

## Licencja projektu

Ten projekt jest objęty licencją MIT i można go swobodnie wykorzystywać i modyfikować do własnych projektów. Szczegóły znajdziesz w pliku [LICENSE.md](https://github.com/blefnk/relivator/LICENSE.md).

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

---

**Śledź nas wszędzie:** [GitHub](https://github.com/blefnk) | [Twitter/𝕏](https://x.com/blefnk) | [Discord](https://discord.gg/Pb8uKbwpsJ) | [Fiverr](https://fiverr.com/blefnk) | [LinkedIn](https://linkedin.com/in/blefnk) | [Facebook](https://facebook.com/blefnk)

Ten starter Next.js 14 został stworzony z miłością przez [@blefnk Nazarii Korniienko](https://github.com/blefnk) i niesamowitą [społeczność Bleverse OSS](<https://github.com/blefnk/relivator> /wiki/Project-Credits-&-Contributors). Jesteśmy głęboko wdzięczni za wszelki wkład i wsparcie udzielone przez wszystkich na rzecz tego projektu.

---

Miłego kodowania! Rozpocznij swoją przygodę z kodowaniem, ucz się, iteruj i co najważniejsze – ciesz się procesem! Pamiętaj – to przestrzeń nauki i eksperymentowania. Zanurz się i rozkoszuj podróżą! 🚀🌌

![Obraz OG Bleverse Relivator](/public/og-image.png)

Sprawdź [nasz inny darmowy starter Next.js 14](https://github.com/blefnk/reliverse). To, monorepo, zapewnia technologię używaną w bieżącym starterze i dodaje: Turborepo/Turbopack, Prisma, Valibot, Lucia, Clerk i wiele więcej, ponieważ eksperymentalnie próbujemy połączyć wszystkie istotne i powszechnie używane technologie. To tak jakby myśleć o: Reliverse (WordPress) + Relivator (WooCommerce) = 😍.

[bleverse-discord]: https://discord.gg/Pb8uKbwpsJ
