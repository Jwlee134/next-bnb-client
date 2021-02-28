module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: { JSX: true }, // JSX is not defined 경고 제거
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: "off", // 들여쓰기시에 무조건 스페이스 4칸 경고 제거
    quotes: ["error", "double"], // 문자열 더블 쿼터 허용
    "react/no-unescaped-entities": "off", // 문자열 내에서 " ' > } 허용
    "no-unused-vars": "off", //사용안한 변수 경고 중복
    "@typescript-eslint/no-unused-vars": "warn", //사용안한 변수는 경고
    "spaced-comment": "off", // 주석을 뒤에 달 수 있게 허용
    "react/react-in-jsx-scope": "off", // React를 꼭 import할 필요 없음
    "linebreak-style": 0, // Expected linebreaks to be 'LF' but found 'CRLF' 경고 제거
    "no-use-before-define": "off", // 'React' was used before it was defined 경고 제거
    "no-console": "off", // console.log 허용
    "react/jsx-props-no-spreading": "off", // Props에 spread 연산자 허용
    "arrow-body-style": "off", // 화살표 함수 안에 return 사용 허용
    "no-param-reassign": "off", // 변수 재할당 허용
    "import/prefer-default-export": "off", // 오직 export default만 사용하지 않아도 됨
    "comma-dangle": "off", // 마지막에 , 을 적을 필요 없게 해줌
    "react/jsx-one-expression-per-line": "off", // 한 라인에 문자열과 변수를 같이 적을 수 있게 허용
    "react/no-array-index-key": "off", // key값으로 index를 사용할 수 있게 허용
    "implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있음
    "object-curly-newline": "off", // { 다음 줄 바꿈을 강제로 사용하지 않아도 됨
    "@typescript-eslint/no-use-before-define": ["warn"], // 선언하기 전에 사용한다면 경고
    "jsx-a11y/anchor-is-valid": "off", // a에 href없이 사용
    "react/jsx-boolean-value": "off", // 스타일드 컴포넌트의 prop으로 불리언 값을 줄 수 있게 허용
    "operator-linebreak": "off", // 연산자 다음 줄 바꿈을 사용 할 수 있게 허용
    "react/require-default-props": "off", // custom props 추가 허용
    "global-require": "off", //함수 내에서 require 사용가능
    "jsx-a11y/label-has-associated-control": "off", // 상호작용하는 엘리먼트에 label을 넣음
    "no-confusing-arrow": "off",
    "prefer-destructuring": "off",
    "no-plusplus": "off",
    "no-undef": "off",
    "no-alert": "off",
    "import/no-unresolved": "off",
    "react/button-has-type": "off",
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] }, // jsx를 사용가능한 파일 확장자명 설정
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      }, // import 시 확장자명을 써 줄 필요 없음
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
