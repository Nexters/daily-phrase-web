"use client";

import * as stylex from "@stylexjs/stylex";
import { globalStyles } from "~/styles/globals.style";
import { BookmarkLinearIcon, LikeLinearIcon } from "./ui/icons";

export default function AppFooter() {
  return (
    <div {...stylex.props(globalStyles.container, styles.container)}>
      <div {...stylex.props(styles.footer)}>
        <button
          type="button"
          {...stylex.props(styles.footerItem, styles.iconBtn)}
        >
          <LikeLinearIcon {...stylex.props(styles.icon)} />
        </button>
        <button
          type="button"
          {...stylex.props(styles.footerItem, styles.iconBtn)}
        >
          <BookmarkLinearIcon {...stylex.props(styles.icon)} />
        </button>
        <button
          type="button"
          {...stylex.props(styles.footerItem, styles.primaryBtn)}
        >
          앱 설치하고 공유하기
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 10px",
    height: 90,
    background: "#fff",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconBtn: {
    padding: "16px 6px",
    margin: "-16px -6px",
  },
  icon: {
    width: 48,
    height: 48,
  },
  primaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    background: "#FF7900",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "22px",
  },
});
