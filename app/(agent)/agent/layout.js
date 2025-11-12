import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../../globals.css";
import "./agent.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <svg className="hidden">
          <symbol
            id="filter"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g id="Iconly/Curved/Light/Filter">
              <g id="Filter">
                <path
                  id="Stroke 1"
                  d="M8.73752 14.3312H3.34375"
                  stroke="#808392"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Stroke 3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.123 14.3319C12.123 16.0334 12.6905 16.6 14.3912 16.6C16.092 16.6 16.6594 16.0334 16.6594 14.3319C16.6594 12.6304 16.092 12.0637 14.3912 12.0637C12.6905 12.0637 12.123 12.6304 12.123 14.3319Z"
                  stroke="#808392"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Stroke 5"
                  d="M11.2656 5.63001H16.6587"
                  stroke="#808392"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Stroke 7"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.88081 5.62888C7.88081 3.92813 7.3134 3.36072 5.61265 3.36072C3.91116 3.36072 3.34375 3.92813 3.34375 5.62888C3.34375 7.33037 3.91116 7.89703 5.61265 7.89703C7.3134 7.89703 7.88081 7.33037 7.88081 5.62888Z"
                  stroke="#808392"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
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
        <div className="shape"></div>
      </body>
    </html>
  );
}
