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
          <symbol
            id="calendar-due"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.667 2V4.66667M5.33366 2V4.66667M2.66699 7.33333H13.3337M2.66699 4.66667C2.66699 4.31304 2.80747 3.97391 3.05752 3.72386C3.30756 3.47381 3.6467 3.33333 4.00033 3.33333H12.0003C12.3539 3.33333 12.6931 3.47381 12.9431 3.72386C13.1932 3.97391 13.3337 4.31304 13.3337 4.66667V12.6667C13.3337 13.0203 13.1932 13.3594 12.9431 13.6095C12.6931 13.8595 12.3539 14 12.0003 14H4.00033C3.6467 14 3.30756 13.8595 3.05752 13.6095C2.80747 13.3594 2.66699 13.0203 2.66699 12.6667V4.66667ZM7.33366 10.6667C7.33366 10.8435 7.4039 11.013 7.52892 11.1381C7.65395 11.2631 7.82351 11.3333 8.00033 11.3333C8.17714 11.3333 8.34671 11.2631 8.47173 11.1381C8.59675 11.013 8.66699 10.8435 8.66699 10.6667C8.66699 10.4899 8.59675 10.3203 8.47173 10.1953C8.34671 10.0702 8.17714 10 8.00033 10C7.82351 10 7.65395 10.0702 7.52892 10.1953C7.4039 10.3203 7.33366 10.4899 7.33366 10.6667Z"
              stroke="#ACB5BB"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="arrow-down-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9.95906 4.4751L6.69906 7.7351C6.31406 8.1201 5.68406 8.1201 5.29906 7.7351L2.03906 4.4751"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="eye-off"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.05671 7.05794C6.8067 7.30804 6.66628 7.64721 6.66634 8.00085C6.6664 8.35448 6.80694 8.6936 7.05704 8.94361C7.30714 9.19362 7.64631 9.33404 7.99994 9.33398C8.35358 9.33392 8.6927 9.19338 8.94271 8.94328M11.1207 11.1154C10.1855 11.7005 9.1031 12.0073 8 12C5.6 12 3.6 10.6667 2 8.00002C2.848 6.58669 3.808 5.54802 4.88 4.88402M6.78667 4.12002C7.18603 4.03917 7.59254 3.99897 8 4.00002C10.4 4.00002 12.4 5.33335 14 8.00002C13.556 8.74002 13.0807 9.37802 12.5747 9.91335M2 2L14 14"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="loading"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </symbol>
        </svg>
        {children}
        <HotToast />
        <div className="shape"></div>
      </body>
    </html>
  );
}
