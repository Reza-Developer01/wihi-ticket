import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../../globals.css";
import "./agent.css";

export default function RootLayout({ children }) {
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
          <symbol
            id="user"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8445 21.6619C8.15273 21.6619 5 21.0874 5 18.7867C5 16.4859 8.13273 14.3619 11.8445 14.3619C15.5364 14.3619 18.6891 16.4653 18.6891 18.7661C18.6891 21.0659 15.5564 21.6619 11.8445 21.6619Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8375 11.1737C14.2602 11.1737 16.2239 9.21002 16.2239 6.7873C16.2239 4.36457 14.2602 2.40002 11.8375 2.40002C9.41477 2.40002 7.45022 4.36457 7.45022 6.7873C7.44204 9.20184 9.39204 11.1655 11.8066 11.1737C11.8175 11.1737 11.8275 11.1737 11.8375 11.1737Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="add-user"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.92259 21.8083C6.10859 21.8083 2.85059 21.2313 2.85059 18.9213C2.85059 16.6113 6.08759 14.5103 9.92259 14.5103C13.7366 14.5103 16.9946 16.5913 16.9946 18.9003C16.9946 21.2093 13.7576 21.8083 9.92259 21.8083Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.92268 11.216C12.4257 11.216 14.4557 9.18602 14.4557 6.68302C14.4557 4.17902 12.4257 2.15002 9.92268 2.15002C7.41968 2.15002 5.38968 4.17902 5.38968 6.68302C5.38068 9.17702 7.39668 11.207 9.89068 11.216H9.92268Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.1318 8.12915V12.1392"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.1779 10.1339H17.0879"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="two-user"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.55802 21.4562C5.88602 21.4562 2.74902 20.9012 2.74902 18.6772C2.74902 16.4532 5.86602 14.4492 9.55802 14.4492C13.23 14.4492 16.366 16.4342 16.366 18.6572C16.366 20.8802 13.25 21.4562 9.55802 21.4562Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.55837 11.2775C11.9684 11.2775 13.9224 9.3235 13.9224 6.9135C13.9224 4.5035 11.9684 2.5495 9.55837 2.5495C7.14837 2.5495 5.19437 4.5035 5.19437 6.9135C5.18537 9.3155 7.12637 11.2695 9.52737 11.2775H9.55837Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.8003 10.0788C18.2033 9.70382 19.2373 8.42482 19.2373 6.90282C19.2383 5.31482 18.1113 3.98882 16.6133 3.68182"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.46 13.6535C19.448 13.6535 21.146 15.0015 21.146 16.2045C21.146 16.9135 20.561 17.6415 19.671 17.8505"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="users"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9728 20.3682C8.7338 20.3682 5.9668 19.8782 5.9668 17.9162C5.9668 15.9542 8.7158 14.2462 11.9728 14.2462C15.2118 14.2462 17.9788 15.9382 17.9788 17.8992C17.9788 19.8602 15.2298 20.3682 11.9728 20.3682Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9731 11.4487C14.0991 11.4487 15.8231 9.72569 15.8231 7.59969C15.8231 5.47369 14.0991 3.74969 11.9731 3.74969C9.84706 3.74969 8.12306 5.47369 8.12306 7.59969C8.11706 9.71769 9.82706 11.4417 11.9461 11.4487H11.9731Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3623 10.3916C19.5993 10.0606 20.5113 8.9326 20.5113 7.5896C20.5113 6.1886 19.5183 5.0186 18.1963 4.7486"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.9434 13.5444C20.6974 13.5444 22.1954 14.7334 22.1954 15.7954C22.1954 16.4204 21.6784 17.1014 20.8944 17.2854"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.58359 10.3916C4.34559 10.0606 3.43359 8.9326 3.43359 7.5896C3.43359 6.1886 4.42759 5.0186 5.74859 4.7486"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.002 13.5444C3.248 13.5444 1.75 14.7334 1.75 15.7954C1.75 16.4204 2.267 17.1014 3.052 17.2854"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </svg>
        {children}
        <HotToast />
        <div className="shape"></div>
      </body>
    </html>
  );
}
