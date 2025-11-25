import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../globals.css";
import AuthProvider from "@/context/AuthContext";

export default async function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
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
            <symbol
              id="star"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 39"
              fill="none"
            >
              <path
                d="M17.8296 1.72742C18.5779 -0.575861 21.8365 -0.575861 22.5848 1.72742L25.6412 11.1339C25.9759 12.1639 26.9358 12.8613 28.0188 12.8613H37.9093C40.3311 12.8613 41.3381 15.9604 39.3788 17.3839L31.3772 23.1974C30.501 23.834 30.1343 24.9624 30.469 25.9924L33.5254 35.3989C34.2737 37.7022 31.6375 39.6175 29.6783 38.194L21.6767 32.3805C20.8004 31.7439 19.614 31.7439 18.7377 32.3805L10.7361 38.194C8.77686 39.6175 6.14066 37.7022 6.88904 35.3989L9.94538 25.9924C10.2801 24.9624 9.91342 23.834 9.0372 23.1974L1.0356 17.3839C-0.92368 15.9604 0.0832586 12.8613 2.50507 12.8613H12.3956C13.4786 12.8613 14.4385 12.1639 14.7732 11.1339L17.8296 1.72742Z"
                fill="currentColor"
              />
            </symbol>
            <symbol
              id="profile"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.9349 9.0258C3.39664 9.0258 2.08301 8.78643 2.08301 7.82777C2.08301 6.86911 3.38831 5.98413 4.9349 5.98413C6.47316 5.98413 7.7868 6.86053 7.7868 7.81919C7.7868 8.77746 6.48149 9.0258 4.9349 9.0258Z"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.93253 4.65568C5.942 4.65568 6.76018 3.8375 6.76018 2.82803C6.76018 1.81856 5.942 1 4.93253 1C3.92306 1 3.1045 1.81856 3.1045 2.82803C3.10109 3.83409 3.91359 4.65227 4.91965 4.65568C4.9242 4.65568 4.92837 4.65568 4.93253 4.65568Z"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol
              id="send"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.022124 11.8535C-0.00686678 11.9489 -0.00757449 12.0501 0.0214164 12.1455C0.711553 14.4054 12.2706 20.4943 15.8698 21.4602C16.8074 21.712 17.4756 21.5741 17.8525 21.0515C18.945 19.539 16.4228 15.0425 14.9605 12.6963L7.80949 12.6956C7.39513 12.6956 7.05925 12.3598 7.05925 11.9454C7.05925 11.531 7.39513 11.1952 7.80949 11.1952L15.0291 11.1966C16.4998 8.81928 18.928 4.43805 17.8525 2.94959C17.8122 2.89373 17.7684 2.8414 17.721 2.79403C17.3293 2.40229 16.707 2.31744 15.8705 2.54159C12.2735 3.50537 0.713674 9.59074 0.022124 11.8535Z"
                fill="currentColor"
              />
            </symbol>
            <symbol
              id="paper-download"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.1594 8.29988L14.4894 2.89988C13.7594 2.79988 12.9394 2.74988 12.0394 2.74988C5.74941 2.74988 3.64941 5.06988 3.64941 11.9999C3.64941 18.9399 5.74941 21.2499 12.0394 21.2499C18.3394 21.2499 20.4394 18.9399 20.4394 11.9999C20.4394 10.5799 20.3494 9.34988 20.1594 8.29988Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.9336 2.83252V5.49352C13.9336 7.35152 15.4396 8.85652 17.2976 8.85652H20.2486"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6602 16.0172V9.9762"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.31445 13.6622L11.6595 16.0172L14.0045 13.6622"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </symbol>
            <symbol
              id="arrow-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 14"
              fill="none"
            >
              <g clipPath="url(#clip0_1563_2885)">
                <path
                  d="M6.85153 13.2736L7.68162 9.29272C7.87667 8.35627 8.84813 7.4506 9.85182 7.26996L13.4846 6.6147C14.4879 6.43406 14.5567 5.94839 13.6382 5.53042L1.84791 0.168907C0.928988 -0.249065 0.477837 0.135421 0.839796 1.02729L5.84265 13.3538C6.20461 14.2457 6.65612 14.21 6.85153 13.2736Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1563_2885">
                  <rect width="15" height="14" fill="white" />
                </clipPath>
              </defs>
            </symbol>
          </svg>

          {children}
          <HotToast />
          <div className="shape"></div>
        </AuthProvider>
      </body>
    </html>
  );
}
