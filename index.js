document.title = "HAAMU CORPORATION";

const root = document.documentElement;
const body = document.body;

root.style.cssText = "width:100%;height:100%;margin:0;background:#05070d;";
body.style.cssText = "width:100%;height:100vh;margin:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 50%,#172449 0%,#0a1020 40%,#04060b 100%);color:#f4f8ff;font-family:Arial,sans-serif;";

const title = document.createElement("div");
title.textContent = "HAAMU CORPORATION";
title.style.cssText = "max-width:90vw;padding:32px;text-align:center;font-family:Arial,sans-serif;font-size:clamp(28px,7vw,88px);font-weight:300;line-height:1.15;letter-spacing:.22em;text-indent:.22em;color:#f4f8ff;text-shadow:0 0 14px rgba(190,215,255,.85),0 0 48px rgba(80,125,255,.55);border-bottom:1px solid rgba(190,215,255,.35);";

body.replaceChildren(title);