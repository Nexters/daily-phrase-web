"use client";
import * as stylex from "@stylexjs/stylex";
import { RemoveScroll } from "react-remove-scroll";

export default function AppDownloadModal() {
  return (
    <RemoveScroll>
      <div {...stylex.props(styles.backdrop)} />
      <div {...stylex.props(styles.card)}>scrollable</div>
    </RemoveScroll>
  );
}

const styles = stylex.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    background: "#fff",
    position: "fixed",
    transform: "translate(-50%, -50%)",
    left: 70,
    right: 70,
  },
});
