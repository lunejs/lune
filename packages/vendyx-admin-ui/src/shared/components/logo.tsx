export const Logo = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1.5rem', height: '1.5rem' }}
    >
      <g filter="url(#filter0_dd_24016_147649)">
        <mask id="path-1-inside-1_24016_147649" fill="white">
          <path d="M3 8C3 4.68629 5.68629 2 9 2H19C22.3137 2 25 4.68629 25 8V18C25 21.3137 22.3137 24 19 24H9C5.68629 24 3 21.3137 3 18V8Z" />
        </mask>
        <path
          d="M3 8C3 4.68629 5.68629 2 9 2H19C22.3137 2 25 4.68629 25 8V18C25 21.3137 22.3137 24 19 24H9C5.68629 24 3 21.3137 3 18V8Z"
          fill="#171717"
        />
        <path
          d="M3 8C3 4.68629 5.68629 2 9 2H19C22.3137 2 25 4.68629 25 8V18C25 21.3137 22.3137 24 19 24H9C5.68629 24 3 21.3137 3 18V8Z"
          fill="url(#paint0_linear_24016_147649)"
          fillOpacity="0.05"
        />
        <path
          d="M9 2V3H19V2V1H9V2ZM25 8H24V18H25H26V8H25ZM19 24V23H9V24V25H19V24ZM3 18H4V8H3H2V18H3ZM9 24V23C6.23858 23 4 20.7614 4 18H3H2C2 21.866 5.13401 25 9 25V24ZM25 18H24C24 20.7614 21.7614 23 19 23V24V25C22.866 25 26 21.866 26 18H25ZM19 2V3C21.7614 3 24 5.23858 24 8H25H26C26 4.13401 22.866 1 19 1V2ZM9 2V1C5.13401 1 2 4.13401 2 8H3H4C4 5.23858 6.23858 3 9 3V2Z"
          fill="white"
          fillOpacity="0.1"
          mask="url(#path-1-inside-1_24016_147649)"
        />
        <path
          d="M13.0581 17L9.97409 8.48H11.6181L14.0061 15.26L16.3821 8.48H18.0261L14.9301 17H13.0581Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_24016_147649"
          x="0"
          y="0"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_24016_147649"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_24016_147649"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_24016_147649"
            result="effect2_dropShadow_24016_147649"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_24016_147649"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_24016_147649"
          x1="14"
          y1="2"
          x2="14"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171717" stopOpacity="0" />
          <stop offset="1" stopColor="#E5E5E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};
