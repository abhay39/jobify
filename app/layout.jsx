import { Inter } from "next/font/google";
import "./globals.css";
import MainPage from "@/pages/MainPage";
import {Toaster} from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobify",
  description: "The platform to land your first job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainPage>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {children}
        </MainPage>
        </body>
    </html>
  );
}
