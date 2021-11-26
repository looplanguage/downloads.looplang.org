import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { allObjects } from "./api/prereleases";
import Downloads from "./downloads";
import AllDownloads from "./downloads/all-downloads";

export default function Home({ prereleases }) {
  return (
    <div className={styles.container}>
      <h1>Loop Downloads</h1>
      <Downloads />
      <AllDownloads prereleases={prereleases} />
    </div>
  );
}

export async function getStaticProps() {
  const prereleases = await allObjects();

  return {
    props: {
      prereleases,
    },
  };
}
