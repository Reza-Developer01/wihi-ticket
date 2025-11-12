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
          <symbol
            id="document-copy"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M7.75 6.575H6.665C5.775 6.575 5.05 5.855 5.05 4.96V3.875C5.05 3.67 4.885 3.5 4.675 3.5H3.09C1.935 3.5 1 4.25 1 5.59V8.91C1 10.25 1.935 11 3.09 11H6.035C7.19 11 8.125 10.25 8.125 8.91V6.95C8.125 6.74 7.955 6.575 7.75 6.575Z"
              fill="currentColor"
            />
            <path
              d="M8.91086 1H7.92586H7.38086H5.96586C4.83586 1 3.92086 1.72 3.88086 3.005C3.91086 3.005 3.93586 3 3.96586 3H5.38086H5.92586H6.91086C8.06586 3 9.00086 3.75 9.00086 5.09V6.075V7.43V8.415C9.00086 8.445 8.99586 8.47 8.99586 8.495C10.1109 8.46 11.0009 7.72 11.0009 6.415V5.43V4.075V3.09C11.0009 1.75 10.0659 1 8.91086 1Z"
              fill="currentColor"
            />
            <path
              d="M5.99031 3.575C5.83531 3.42 5.57031 3.525 5.57031 3.74V5.05C5.57031 5.6 6.03531 6.05 6.60531 6.05C6.96031 6.055 7.45531 6.055 7.88031 6.055C8.09531 6.055 8.20531 5.805 8.05531 5.655C7.51031 5.11 6.54031 4.135 5.99031 3.575Z"
              fill="currentColor"
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
