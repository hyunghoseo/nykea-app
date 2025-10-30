// Web-specific initialization for mobile browser compatibility
if (typeof document !== "undefined") {
  // Enable pull-to-refresh and overscroll behavior on mobile browsers
  const style = document.createElement("style");
  style.textContent = `
    html, body, #root {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: auto;
    }
    
    body {
      touch-action: pan-y;
      -webkit-user-select: none;
      user-select: none;
    }
    
    /* Allow scrolling and pull-to-refresh */
    * {
      -webkit-overflow-scrolling: touch;
    }
  `;
  document.head.appendChild(style);
}

export {};
