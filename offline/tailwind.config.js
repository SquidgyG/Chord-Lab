export default {
  content: [
    "./offline/index.html",
    "./offline/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  safelist: [
    // Gradient endpoints used via template strings in ProgressBar and static buttons
    { pattern: /(from|to)-(red|orange|yellow|green|blue|indigo|purple|pink)-(400|500|600)/, variants: ['hover'] },
    // Common color utilities used throughout the app
    { pattern: /(bg|text|border)-(red|orange|yellow|green|blue|indigo|purple|pink)-(100|200|300|400|500|600|700|800)/ },
    // Optional: gray scales heavily used for UI chrome
    { pattern: /(bg|text|border|from|to)-gray-(100|200|300|400|500|600|700|800|900)/ }
  ]
};
