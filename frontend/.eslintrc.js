module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "import/order": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
