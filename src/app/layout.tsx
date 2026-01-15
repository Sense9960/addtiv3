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
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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