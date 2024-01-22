import * as stylex from "@stylexjs/stylex";

export default function PostContent() {
  const content = `어느날 시계를 보다가 문든 이런 생각을 한 적이 있습니다.

국회는 국정을 감사하거나 특정한
국정사안에 대하여 조사할 수 있으며, 
이에 필요한 서류의 제출 
또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다`;

  return (
    <div {...stylex.props(styles.wrap)}>
      <div {...stylex.props(styles.title)}>
        커피를 많이 마실수록 더 오래 산다고?
      </div>
      <div {...stylex.props(styles.imageWrapper)}>
        <img alt="" src="/example.png" />
      </div>
      <div {...stylex.props(styles.text)}>{content}</div>
    </div>
  );
}

const styles = stylex.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    padding: "32px 0",
  },
  title: {
    marginBottom: 16,
    padding: "0 16px",
    color: "#000",
    fontSize: 28,
    fontWeight: 600,
    lineHeight: "36px",
  },
  text: {
    padding: "0 16px",
    color: "#000",
    fontSize: 18,
    lineHeight: "29px",
    whiteSpace: "pre-wrap",
  },
  imageWrapper: {
    marginBottom: 16,
    width: "100%",
    minHeight: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
  },
});
