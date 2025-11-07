import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../../globals.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <HotToast />
      </body>
    </html>
  );
}
