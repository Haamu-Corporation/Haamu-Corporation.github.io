function main() {
  document.title = "HAAMU CORPORATION";

  document.body.style.margin = "0";
  document.body.style.width = "100vw";
  document.body.style.height = "100vh";
  document.body.style.background = "#04060b";
  document.body.style.color = "#ffffff";

  document.body.innerText = "HAAMU CORPORATION";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main, { once: true });
} else {
  main();
}
