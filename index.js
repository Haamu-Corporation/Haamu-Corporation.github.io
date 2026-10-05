document.title = "HAAMU CORPORATION";

const body = document.body;
body.style.margin = "0";
body.style.width = "100vw";
body.style.height = "100vh";
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.overflow = "hidden";
body.style.background = "radial-gradient(circle at center, #172449 0%, #0a1020 42%, #04060b 100%)";

const title = document.createElement("div");
title.textContent = "HAAMU CORPORATION";
title.style.maxWidth = "90vw";
title.style.padding = "2rem";
title.style.textAlign = "center";
title.style.fontFamily = "Arial, sans-serif";
title.style.fontSize = "clamp(1.75rem, 7vw, 5.5rem)";
title.style.fontWeight = "300";
title.style.lineHeight = "1.2";
title.style.letterSpacing = "0.22em";
title.style.textIndent = "0.22em";
title.style.color = "#f4f8ff";
title.style.textShadow = "0 0 14px rgba(190,215,255,.85), 0 0 48px rgba(80,125,255,.55)";
title.style.borderBottom = "1px solid rgba(190,215,255,.35)";

body.replaceChildren(title);
