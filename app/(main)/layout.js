import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <svg className="hidden">
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
            id="arrow-left-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.6094 6.87502H7.4675C7.42625 5.68252 7.26813 4.60689 6.99125 4.32939C6.63938 3.97752 6.05625 4.15627 5.58625 4.35064C4.60437 4.75689 1.76562 6.47314 1.76562 7.50439C1.76562 8.56877 4.7325 10.2781 5.63313 10.6513C5.915 10.7681 6.21625 10.8713 6.48375 10.8713C6.67687 10.8713 6.8525 10.8181 6.99188 10.6781C7.26938 10.3994 7.4275 9.32002 7.46812 8.12502H12.6094C12.955 8.12502 13.2344 7.84564 13.2344 7.50002C13.2344 7.15439 12.955 6.87502 12.6094 6.87502Z"
              fill="currentColor"
            />
          </symbol>
          <symbol
            id="arrow-down-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g id="Iconly/Curved/Light/Arrow - Down 2">
              <g id="Arrow - Down 2">
                <path
                  id="Stroke 1"
                  d="M15.8337 7.08337C15.8337 7.08337 12.3803 12.9167 10.0003 12.9167C7.62116 12.9167 4.16699 7.08337 4.16699 7.08337"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </symbol>
          <symbol
            id="upload"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.0007 8.64575L15.0944 3.02075C14.334 2.91659 13.4798 2.8645 12.5423 2.8645C5.99023 2.8645 3.80273 5.28117 3.80273 12.4999C3.80273 19.7291 5.99023 22.1353 12.5423 22.1353C19.1048 22.1353 21.2923 19.7291 21.2923 12.4999C21.2923 11.0208 21.1986 9.7395 21.0007 8.64575Z"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5146 2.95056V5.72244C14.5146 7.65785 16.0834 9.22556 18.0188 9.22556H21.0928"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1458 10.3917V16.6844"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5885 12.8453L12.1458 10.3922L9.70312 12.8453"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </svg>
        {children}
      </body>
    </html>
  );
}
