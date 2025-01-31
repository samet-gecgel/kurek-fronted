import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/app/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../public/locales/${locale}/common.json`))
      .default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
