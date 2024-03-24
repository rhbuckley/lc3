import type { Metadata } from "next";

// styling
import "./globals.css";
import { Inter, IBM_Plex_Mono, Montserrat } from "next/font/google";
import Header from "~/components/Header";

// components

// fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-plex-mono",
});
const monsterrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});
const fontVariable = [inter, plexMono, monsterrat]
    .map((font) => font.variable)
    .join(" ");

// metatdata
export const metadata: Metadata = {
    title: "LC3 Tools",
    description: "A modern toolset for the LC3 Assembly Language.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={fontVariable}>
            <body className="bg-transparent">
                <div className="fixed left-0 top-0 inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#fefefe3a_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <Header />
                {children}
            </body>
        </html>
    );
}
