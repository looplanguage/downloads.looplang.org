import { useEffect, useState } from "react";
import styles from "../../../styles/AllDownloads.module.css";

function ArrowDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
  );
}

function FormatDate(_date) {
  let date = new Date(_date);

  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

export default function AllDownloads() {
  let [stableReleases, setStableReleases] = useState([]);
  let [prereleases, setPrereleases] = useState([]);

  let [stableExpanded, setStableExpanded] = useState(true);
  let [prereleaseExpanded, setPrereleaseExpanded] = useState(true);

  const fetchData = async () => {
    const response = await fetch("/api/prereleases");

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const releases = await response.json();
    return setPrereleases(releases);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Releases</h2>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td width={"10%"}>Version</td>
              <td width={"20%"}>Released</td>
              <td width={"20%"}>Platform</td>
              <td width={"20%"}>Installer</td>
              <td width={"20%"}>Binary</td>
            </tr>
          </thead>
          <tbody
            onClick={() => {
              setStableExpanded(!stableExpanded);
            }}
          >
            <tr className={styles.expand_category}>
              <td colSpan={5}>
                <div className={styles.expand_category_td}>Stable Versions {stableExpanded ? <ArrowUp /> : <ArrowDown />}</div>
              </td>
            </tr>
          </tbody>
          <tbody className={!stableExpanded && styles.hidden}>
            <tr>
              <td colSpan={5}>None available</td>
            </tr>
          </tbody>
          <tbody
            onClick={() => {
              setPrereleaseExpanded(!prereleaseExpanded);
            }}
          >
            <tr className={styles.expand_category}>
              <td colSpan={5}>
                <div className={styles.expand_category_td}>Pre-release Versions {prereleaseExpanded ? <ArrowUp /> : <ArrowDown />}</div>
              </td>
            </tr>
          </tbody>
          <tbody className={!prereleaseExpanded && styles.hidden}>
            {prereleases.map((prerelease) => (
              <tr key={prerelease.build}>
                <td>
                  {prerelease.version}-{prerelease.build}
                </td>
                <td>{FormatDate(prerelease.built)}</td>
                <td>{prerelease.platform}</td>
                <td>None Available</td>
                <td>
                  {prerelease.downloads.map((download) => (
                    <a key={download.url} href={download.url}>
                      {download.filename}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
