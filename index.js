document.title = "HAAMU CORPORATION";

const body = document.body;

body.style.margin = "0";
body.style.width = "100vw";
body.style.height = "100vh";
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.background = "#04060b";
body.style.color = "#ffffff";

const title = document.createElement("div");
title.textContent = "HAAMU CORPORATION";
title.style.color = "#ffffff";
title.style.fontFamily = "Arial, sans-serif";
title.style.fontSize = "32px";
title.style.textAlign = "center";

body.replaceChildren(title);
