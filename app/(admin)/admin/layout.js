import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../../globals.css";
import "./admin.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <svg className="hidden">
          <symbol
            id="arrow-down"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <path
              d="M1.98535 3.20246L2.64035 3.85746C2.83285 4.04996 3.14785 4.04996 3.34035 3.85746L4.97035 2.22746"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.00977 2.22755L1.26977 2.48755"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="arrow-narrow-left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19M5 12L9 16M5 12L9 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </svg>
        {children}
        <HotToast />
      </body>
    </html>
  );
}
