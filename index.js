document.title = "Haamu Corporation";

Object.assign(document.documentElement.style, {
  width: "100%",
  height: "100%",
  margin: "0",
  background: "#070a12"
});

Object.assign(document.body.style, {
  width: "100%",
  minHeight: "100vh",
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  background: "radial-gradient(circle at center, #121d3a 0%, #090e1c 42%, #04060b 100%)",
  color: "#f4f7ff",
  fontFamily: '"Segoe UI", Arial, sans-serif'
});

const main = document.createElement("main");
main.textContent = "HAAMU CORPORATION";

Object.assign(main.style, {
  maxWidth: "92vw",
  padding: "2rem",
  textAlign: "center",
  fontSize: "clamp(1.6rem, 7vw, 5.5rem)",
  fontWeight: "300",
  lineHeight: "1.2",
  letterSpacing: "0.22em",
  textIndent: "0.22em",
  textTransform: "uppercase",
  color: "#f3f7ff",
  textShadow: "0 0 12px rgba(185,210,255,.75), 0 0 36px rgba(80,125,255,.45)",
  borderBottom: "1px solid rgba(185,210,255,.28)"
});

document.body.replaceChildren(main);
