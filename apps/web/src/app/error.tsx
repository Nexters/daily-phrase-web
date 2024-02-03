"use client";

import * as stylex from "@stylexjs/stylex";
import GoAppCard from "~/components/go-app-card";
import { globalStyles } from "~/styles/globals.stylex";

export default function ErrorPage({
  error,
}: {
  error: Error;
}) {
  return (
    <div {...stylex.props(globalStyles.container, styles.container)}>
      <h2 {...stylex.props(styles.title)}>{error.message}</h2>
      <div {...stylex.props(styles.footer)}>
        <GoAppCard />
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    padding: "64px 16px 32px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
  },
});
