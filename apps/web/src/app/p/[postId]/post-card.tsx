"use client";

import * as stylex from "@stylexjs/stylex";
import { CompiledStyles } from "@stylexjs/stylex/lib/StyleXTypes";
import { EyeIcon, LikeLinearIcon } from "~/components/ui/icons";
import { numberWithCommas } from "~/libs/utils";

export default function PostCard({
  style,
}: {
  style?: boolean | CompiledStyles;
}) {
  const onClickPost = () => {};

  return (
    <div {...stylex.props(styles.wrap, style)}>
      <button type="button" onClick={onClickPost}>
        <div {...stylex.props(styles.title)}>{"자식사랑 내리사랑"}</div>
        <div {...stylex.props(styles.text)}>
          {
            "어느날 시계를 보다가 문든 이런 생각을 한 적이 있습니다. 성급한 사람, 무덤덤한 사람, 아무 생각이 없는 사람"
          }
        </div>
        <div {...stylex.props(styles.imageWrapper)}>
          <img src="/" alt="" />
        </div>
      </button>
      <div {...stylex.props(styles.footer)}>
        <button type="button" {...stylex.props(styles.iconWrapper)}>
          <EyeIcon width={20} height={20} />
          <span>{numberWithCommas(1020104)}</span>
        </button>
        <button type="button" {...stylex.props(styles.iconWrapper)}>
          <LikeLinearIcon width={20} height={20} />
          <span>{numberWithCommas(9999)}</span>
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 0 16px",
  },
  title: {
    marginBottom: 4,
    paddingTop: 8,
    color: "#000",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "27px",
  },
  text: {
    color: "#64696B",
    fontSize: 16,
    lineHeight: "22px",
    marginBottom: 10,
  },
  imageWrapper: {
    marginBottom: 10,
    width: "100%",
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 10,
    overflow: "hidden",
  },
  footer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 22px",
    color: "#64696B",
    fontSize: 14,
    lineHeight: "22px",
    textOverflow: "ellipsis",
  },
});
