module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      primary: "#5E4FE4",
      "point-red-100": "#FFAFA9",
      "point-red-200": "#FF675C",
      "point-red-300": "#FF0000",
      "point-yellow-100": "#FCF0CF",
      "point-yellow-200": "#FAD55C",
      "point-yellow-300": "#FEAF2F",
      "point-green-100": "#DFF4E4",
      "point-green-200": "#6BD3AD",
      "point-green-300": "#0AB780",
      "point-blue-100": "#E1EFFF",
      "point-blue-200": "#99C9FF",
      "point-blue-300": "#398DFC",
      "point-purple-100": "#E6E4FF",
      "point-purple-200": "#A3A3FF",
      "point-purple-300": "#6150FF",
      "point-gradient-dist": "#822ED4",
      "point-gradient-dest": "#413FC1",
      "basic-100": "#ffffff",
      "basic-200": "#f5f5f5",
      "basic-300": "#d9d9d9",
      "basic-400": "#bfbfbf",
      "basic-500": "#8c8c8c",
      "basic-600": "#595959",
      "basic-700": "#434343",
      "basic-800": "#262626",
      black: "#251666",
    },
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const fontUtilities = {
        /* Bold */
        ".pretendard-bold-12": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "700",
          fontSize: "1.2rem",
          lineHeight: "1.5",
        },

        /* Semibold */
        ".pretendard-semibold-32": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "600",
          fontSize: "3.2rem",
          lineHeight: "1.5",
        },
        ".pretendard-semibold-24": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "600",
          fontSize: "2.4rem",
          lineHeight: "1.5",
        },
        ".pretendard-semibold-20": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "600",
          fontSize: "2rem",
          lineHeight: "1.5",
        },
        ".pretendard-semibold-18": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "600",
          fontSize: "1.8rem",
          lineHeight: "1.5",
        },
        ".pretendard-semibold-16": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "600",
          fontSize: "1.6rem",
          lineHeight: "1.5",
        },

        /* Medium */
        ".pretendard-medium-24": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "500",
          fontSize: "2.4rem",
          lineHeight: "1.5",
        },
        ".pretendard-medium-18": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "500",
          fontSize: "1.8rem",
          lineHeight: "1.5",
        },
        ".pretendard-medium-16": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "500",
          fontSize: "1.6rem",
          lineHeight: "1.5",
        },
        ".pretendard-medium-14": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "500",
          fontSize: "1.4rem",
          lineHeight: "1.5",
        },
        ".pretendard-medium-12": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "500",
          fontSize: "1.2rem",
          lineHeight: "1.5",
        },

        /* Light */
        ".pretendard-light-24": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "300",
          fontSize: "2.4rem",
          lineHeight: "1.5",
        },
        ".pretendard-light-18": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "300",
          fontSize: "1.8rem",
          lineHeight: "1.5",
        },
        ".pretendard-light-16": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "300",
          fontSize: "1.6rem",
          lineHeight: "1.5",
        },
        ".pretendard-light-14": {
          fontFamily: '"Pretendard", sans-serif',
          fontWeight: "300",
          fontSize: "1.4rem",
          lineHeight: "1.5",
        },
      };

      addUtilities(fontUtilities, ["responsive"]);
    },
  ],
};
