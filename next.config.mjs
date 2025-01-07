import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['e1.pxfuel.com', 'cdn-icons-png.flaticon.com', 'cdn.icon-icons.com', 'www.pngitem.com', 'images.freeimages.com','static.vecteezy.com', 'example.com'],
  }
};

export default withNextIntl(config);
  