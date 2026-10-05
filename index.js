document.addEventListener("DOMContentLoaded", () => {
  document.title = "Haamu Corporation";

  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; }

    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    body {
      display: grid;
      place-items: center;
      overflow: hidden;
      background:
        radial-gradient(circle at 50% 50%, rgba(80, 120, 255, 0.12), transparent 42%),
        linear-gradient(145deg, #070a12 0%, #0b1020 50%, #05070c 100%);
      color: #f4f7ff;
      font-family: Inter, "Segoe UI", Arial, sans-serif;
    }

    .haamu {
      position: relative;
      padding: 2rem 3rem;
      text-align: center;
      font-size: clamp(2rem, 7vw, 6rem);
      font-weight: 300;
      line-height: 1;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-indent: 0.22em;
      text-shadow:
        0 0 18px rgba(150, 185, 255, 0.32),
        0 0 52px rgba(90, 125, 255, 0.18);
    }

    .haamu::after {
      content: "";
      position: absolute;
      left: 20%;
      right: 20%;
      bottom: 0.8rem;
      height: 1px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0.4;
    }
  `;

  const main = document.createElement("main");
  main.className = "haamu";
  main.textContent = "Haamu Corporation";

  document.head.append(style);
  document.body.replaceChildren(main);
});
