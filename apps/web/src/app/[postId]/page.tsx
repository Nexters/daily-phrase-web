import * as stylex from "@stylexjs/stylex";
import { BookmarkLinearIcon, EyeIcon, LikeIcon } from "~/components/ui/icons";

export default function PostPage() {
  const postList = [...Array(5)];

  return (
    <main {...stylex.props(styles.base, styles.container)}>
      <div {...stylex.props(styles.headerWrapper)}>
        <div {...stylex.props(styles.header)}># 게시물 타이틀</div>
      </div>
      <div {...stylex.props(styles.imageWrapper)}>
        <div {...stylex.props(styles.tmpImage)} />
      </div>
      <div {...stylex.props(styles.contentWrapper)}>
        <h2 {...stylex.props(styles.contentTitle)}># 게시물 타이틀</h2>
        <p {...stylex.props(styles.contentText)}># 본문 텍스트</p>
      </div>
      <div {...stylex.props(styles.listWrapper)}>
        {postList.map((_, i) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={i} {...stylex.props(styles.item)}>
              <div {...stylex.props(styles.itemTitle)}># 게시물 타이틀</div>
              <div {...stylex.props(styles.itemText)}>
                # 본문 텍스트 미리보기
              </div>
              <div {...stylex.props(styles.tmpImage, styles.itemImage)}>
                (img)
              </div>
              <div {...stylex.props(styles.itemFooter)}>
                <button type="button" {...stylex.props(styles.iconWrapper)}>
                  <EyeIcon width={24} height={24} />
                  <span>320</span>
                </button>
                <button type="button" {...stylex.props(styles.iconWrapper)}>
                  <LikeIcon width={24} height={24} />
                  <span>10</span>
                </button>
                <button
                  type="button"
                  {...stylex.props(
                    styles.iconWrapper,
                    styles.itemFooterLastIcon,
                  )}
                >
                  <BookmarkLinearIcon width={24} height={24} />
                  <span>즐겨찾기</span>
                </button>
              </div>
            </div>
          );
        })}
        <div {...stylex.props(styles.item)}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            설치하고 더 많은 <br /> 글귀를 공유하세요.
          </div>
          <button type="button" {...stylex.props(styles.appDownloadButton)}>
            앱 설치하기
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.footerWrapper)}>
        <div {...stylex.props(styles.footer)}>
          <button type="button" {...stylex.props(styles.footerItem)}>
            <div {...stylex.props(styles.footerItemIcon)} />
            좋아요
          </button>
          <button type="button" {...stylex.props(styles.footerItem)}>
            <div {...stylex.props(styles.footerItemIcon)} />
            즐겨찾기
          </button>
          <button type="button" {...stylex.props(styles.footerItem)}>
            <div {...stylex.props(styles.footerItemIcon)} />
            공유하기
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = stylex.create({
  base: {
    fontSize: 16,
    color: "#171717",
  },
  container: {
    margin: "0 auto",
    width: "100%",
    maxWidth: 600,
    paddingTop: 60,
    paddingBottom: 60,
  },
  headerWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    backgroundColor: "#ECFFE1",
  },
  footerWrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    height: 60,
    backgroundColor: "rgba(5, 0, 255, 0.10);",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "10px 5px",
    background: "rgba(5, 0, 255, 0.10)",
  },
  footerItemIcon: {
    width: 24,
    height: 24,
    background: "rgba(255, 0, 0, 0.10);",
  },
  imageWrapper: {
    width: "100%",
  },
  tmpImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#00000010",
  },
  contentWrapper: {
    padding: "16px 20px",
    minHeight: "236px",
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contentText: {
    marginTop: 16,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "0 20px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  itemTitle: {
    fontSize: 20,
  },
  itemText: {
    marginTop: 16,
  },
  itemImage: {
    margin: "20px 0",
    height: 118,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemFooter: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  itemFooterLastIcon: {
    marginLeft: "auto",
  },
  appDownloadButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#D8D8D8",
    borderRadius: 10,
  },
});
