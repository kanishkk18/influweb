import { Inter } from "next/font/google";

const PPEditorialNewUltralightItalic = () => (
  <style jsx global>{`
    :root {
      --font-pp-editorial: PPEditorialNew-UltralightItalic;
    }
    .font-pp-editorial {
      font-family: var(--font-pp-editorial);
      font-weight: 200;
      font-style: italic;
    }
  `}</style>
);

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export { PPEditorialNewUltralightItalic, inter };
