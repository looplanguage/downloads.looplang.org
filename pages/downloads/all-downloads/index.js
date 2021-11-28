import { useEffect, useState } from "react";
import styles from "../../../styles/AllDownloads.module.css";
import { ArrowDown, ArrowUp } from "../../../utils/arrows";

function AllDownloads({ prereleases }) {
  let [stableExpanded, setStableExpanded] = useState(true);
  let [prereleaseExpanded, setPrereleaseExpanded] = useState(true);

  if (!prereleases) {
    return <div>Loading...</div>;
  }

  function FormatDate(_date) {
    let date = new Date(_date);

    return (
      <span>
        <span className={styles.date}>
          {("0" + date.getDay()).slice(-2)}-{("0" + date.getMonth()).slice(-2)}-{date.getFullYear()}
        </span>
        <span>
          {("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}
        </span>
      </span>
    );
  }

  return (
    <div>
      <h2>All Releases</h2>
      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
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
          <tbody className={!stableExpanded ? styles.hidden : undefined}>
            <tr className={styles.header}>
              <td width={"10%"}>Version</td>
              <td width={"10%"}>Build</td>
              <td width={"30%"}>Released</td>
              <td width={"20%"}>Platform</td>
              <td width={"20%"}>Binary</td>
            </tr>
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
          <tbody className={!prereleaseExpanded ? styles.hidden : undefined}>
            <tr className={styles.header}>
              <td width={"10%"}>Version</td>
              <td width={"10%"}>Build</td>
              <td width={"30%"}>Released</td>
              <td width={"20%"}>Platform</td>
              <td width={"20%"}>Binary</td>
            </tr>
            {prereleases.map((prerelease) => (
              <tr key={prerelease.build}>
                <td>{prerelease.version}</td>
                <td>{prerelease.build}</td>
                <td>{FormatDate(prerelease.released)}</td>
                <td>
                  {prerelease.os} {prerelease.architecture}
                </td>
                <td>
                  <a href={prerelease.link}>{prerelease.filename}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDownloads;
