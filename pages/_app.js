import "../styles/globals.css";

import TagManager from "react-gtm-module";
import { useEffect } from "react";

const tagManagerArgs = {
  id: "G-B8LRCBXDX3",
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
