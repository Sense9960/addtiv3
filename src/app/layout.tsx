import type { Metadata } from "next";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';
import SmoothScrolling from "@/components/SmoothScrolling";
import "./globals.css";

// Cấu hình Font SVN-Gilroy
const svnGilroy = localFont({
  src: [
    {
      path: "./fonts/SVN-Gilroy Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SVN-Gilroy Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SVN-Gilroy SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SVN-Gilroy Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-svn-gilroy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Additiv3 - 3D Manufacturing",
  description: "High quality 3D manufacturing for teams.",
  keywords: [
    "3D printing",
    "3D manufacturing",
    "rapid prototyping",
    "Additiv3",
    "in 3D giá rẻ",
    "gia công in 3D"
  ],
  openGraph: {
    title: "Additiv3 - 3D Manufacturing",
    description: "High quality 3D manufacturing for teams.",
    url: 'https://additiv3.com',
    siteName: 'Additiv3',
    images: [
      {
        url: '/cover/LinkedInCover.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={svnGilroy.variable} suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <SmoothScrolling>
              {children}
            </SmoothScrolling>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}