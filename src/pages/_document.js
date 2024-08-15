import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-[url('../assets/images/bgApp.jpg')] bg-no-repeat bg-cover">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
