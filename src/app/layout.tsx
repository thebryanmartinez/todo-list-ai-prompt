import type { Metadata } from 'next';
import { Noto_Serif, Outfit, Sacramento } from 'next/font/google';

import './globals.css';

const bodyFont = Outfit({
    variable: '--font-body',
    subsets: ['latin'],
});

const titleFont = Noto_Serif({
    variable: '--font-serif',
    subsets: ['latin'],
});

const cursiveFont = Sacramento({
    variable: '--font-cursive',
    subsets: ['latin'],
    weight: '400',
});

export const metadata: Metadata = {
    title: 'Todo AI',
    description: 'A minimalist todo app, able to create your tasks with AI',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${bodyFont.variable} ${titleFont.variable} ${cursiveFont.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
