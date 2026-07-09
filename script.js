document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================================================
  // Hook 1: Mobile Hamburger Dropdown Controller
  // ==========================================================================
  const hamburg = document.querySelector(".hamburg");
  const cancel = document.querySelector(".cancel");
  const dropdown = document.querySelector(".dropdown");
  const dropdownLinks = document.querySelectorAll(".dropdown .links a");

  const toggleMenu = () => dropdown.classList.toggle("active");

  if (hamburg && cancel && dropdown) {
    hamburg.addEventListener("click", toggleMenu);
    cancel.addEventListener("click", toggleMenu);
    
    // Smoothly closes the menu when a section link is chosen
    dropdownLinks.forEach(link => {
      link.addEventListener("click", toggleMenu);
    });
  }

  // ==========================================================================
  // Hook 2: Sukuna's Red Slashes Canvas (Triggered on Scroll)
  // ==========================================================================
  const canvas = document.getElementById("slash-canvas");
  const ctx = canvas.getContext("2d");

  // Dynamic sizing configuration to handle viewport scales elegantly
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let slashes = [];
  let lastScrollTop = window.scrollY;

 // Class logic tracking structural lifecycle parameters for tapered brush slashes
  class SukunaSlash {
    constructor() {
      // Pick a random starting position on screen
      this.startX = Math.random() * canvas.width;
      this.startY = Math.random() * canvas.height;
      
      // Angle and randomized length configurations
      const angle = Math.random() * Math.PI * 2; 
      const length = Math.random() * 120 + 60; // Mix of short fast cuts and longer slashes
      
      this.endX = this.startX + Math.cos(angle) * length;
      this.endY = this.startY + Math.sin(angle) * length;
      
      this.alpha = 1.0; 
      this.decay = Math.random() * 0.04 + 0.02; // Fade metrics
      
      // Maximum width of the slash at its dead center
      this.maxWidth = Math.random() * 4 + 2; 
      
      // Calculate the perpendicular angle to draw the thickness width offset safely
      this.perpAngle = angle + Math.PI / 2;
    }

    update() {
      this.alpha -= this.decay;
    }

    draw() {
      ctx.fillStyle = `rgba(255, 0, 0, ${this.alpha})`;
      
      // Core neon glow map configurations
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
      
      // Calculate the mid-point of the slash to expand it outwards
      const midX = (this.startX + this.endX) / 2;
      const midY = (this.startY + this.endY) / 2;
      
      // Left and right bulge coordinates for the center thickness
      const side1X = midX + Math.cos(this.perpAngle) * (this.maxWidth / 2);
      const side1Y = midY + Math.sin(this.perpAngle) * (this.maxWidth / 2);
      
      const side2X = midX - Math.cos(this.perpAngle) * (this.maxWidth / 2);
      const side2Y = midY - Math.sin(this.perpAngle) * (this.maxWidth / 2);

      ctx.beginPath();
      // Start at the sharp point A
      ctx.moveTo(this.startX, this.startY);
      // Curve or line outward to the thick middle edge 1
      ctx.lineTo(side1X, side1Y);
      // Taper back down to the sharp point B
      ctx.lineTo(this.endX, this.endY);
      // Pass through the opposite thick middle edge 2
      ctx.lineTo(side2X, side2Y);
      
      ctx.closePath();
      ctx.fill();
    }
  }
  // Animation ticks tracking engine cycles cleanly
  const animateSlashes = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    slashes = slashes.filter(slash => {
      slash.update();
      if (slash.alpha > 0) {
        slash.draw();
        return true;
      }
      return false;
    });

    requestAnimationFrame(animateSlashes);
  };
  animateSlashes();

  // Scroll event detector parsing translation spikes to invoke cuts
  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;
    let delta = Math.abs(currentScroll - lastScrollTop);

    // Spawns cuts proportional to scroll speed intensity
    if (delta > 2) {
      const spawnCount = Math.min(Math.floor(delta / 8), 3); 
      for (let i = 0; i < spawnCount; i++) {
        slashes.push(new SukunaSlash());
      }
    }
    lastScrollTop = currentScroll;
  });
});