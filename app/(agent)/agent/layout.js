import HotToast from "@/app/(auth)/components/libraries/HotToast";
import "../../globals.css";
import "./agent.css";
import "../../(admin)/admin/admin.css";

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
          <symbol
            id="arrow-down"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M11.875 5.3125C11.875 5.3125 9.285 9.6875 7.5 9.6875C5.71562 9.6875 3.125 5.3125 3.125 5.3125"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
          <symbol
            id="info"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.50313 5.78125H7.4975C7.23875 5.78125 7.02875 5.57125 7.02875 5.3125C7.02875 5.05375 7.23875 4.84375 7.4975 4.84375C7.75625 4.84375 7.96938 5.05375 7.96938 5.3125C7.96938 5.57125 7.76188 5.78125 7.50313 5.78125ZM7.96875 9.93438C7.96875 10.1931 7.75875 10.4031 7.5 10.4031C7.24125 10.4031 7.03125 10.1931 7.03125 9.93438V7.5C7.03125 7.24125 7.24125 7.03125 7.5 7.03125C7.75875 7.03125 7.96875 7.24125 7.96875 7.5V9.93438ZM7.5 1.40625C3.00125 1.40625 1.40625 3.00125 1.40625 7.5C1.40625 11.9987 3.00125 13.5938 7.5 13.5938C11.9987 13.5938 13.5938 11.9987 13.5938 7.5C13.5938 3.00125 11.9987 1.40625 7.5 1.40625Z"
              fill="currentColor"
            />
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
        </svg>
        {children}
        <HotToast />
        <div className="shape"></div>
      </body>
    </html>
  );
}
