// Ensure GSAP works correctly with the window load
window.addEventListener('load', () => {

    // 1. Core GSAP Timeline for the Entry Sequence
    // We make everything appear smoothly upon page load.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup (we hide elements with GSAP first)
    gsap.set(".nav-links a, .status, .primary-btn, .filled-text, .outline-text, .bio-block, .social-item", {
        opacity: 0,
        y: 20
    });
    gsap.set(".grayscale-portrait", { opacity: 0, scale: 0.95 });
    
    // The Animation Sequence
    tl.to(".outer-glow-container", { scaleX: 1, duration: 1.2, ease: "expo.out" }) // Frame expands
      
      .to(".filled-text", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.6") // Big name fades in
      .to(".outline-text", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
      
      .to(".grayscale-portrait", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.5") // Portrait drops in
      
      .to(".nav-links a", { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, "-=0.8") // Nav links sequential appear
      .to(".status, .primary-btn", { opacity: 1, y: 0, duration: 0.4 }, "-=0.6")
      
      .to(".bottom-info .bio-block, .social-item", { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.5"); // Footer elements appear

    // 2. The "Advanced Data" Portrait Hover Effect
    // When the mouse is over the portrait, we trigger a subtle digital "scanning" effect.
    
    const portraitWrapper = document.querySelector(".portrait-wrapper");
    const portrait = document.querySelector(".grayscale-portrait");

    // Pre-set a subtle digital glitch layer (we create a temp text string of 0s and 1s)
    let glitchLayer = document.createElement("div");
    glitchLayer.classList.add("data-glitch-layer");
    glitchLayer.innerHTML = Array(200).fill('0 1 DATA // ').join('');
    
    // Style the glitch layer (you can add this directly to CSS if preferred)
    glitchLayer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        color: #ffffff;
        font-family: monospace;
        font-size: 8px;
        width: 100%;
        height: 100%;
        opacity: 0;
        overflow: hidden;
        user-select: none;
        pointer-events: none;
        mix-blend-mode: screen;
    `;
    portraitWrapper.appendChild(glitchLayer);

    // Hover Mouse Interaction
    portraitWrapper.addEventListener("mouseenter", () => {
        gsap.to(portrait, { filter: "grayscale(100%) contrast(1.3) brightness(1.1)", duration: 0.3 });
        gsap.to(glitchLayer, { opacity: 0.15, duration: 0.1 }); // Show binary overlay
        
        // Quick subtle "flicker" scanline
        gsap.to(portrait, { x: 1, duration: 0.05, repeat: 3, yoyo: true });
    });

    portraitWrapper.addEventListener("mouseleave", () => {
        gsap.to(portrait, { filter: "grayscale(100%) contrast(1.1) brightness(1)", duration: 0.3 });
        gsap.to(glitchLayer, { opacity: 0, duration: 0.2 });
    });

    // 3. Scroll-in reveal for the Projects / Stack / Research / Contact sections
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".content-frame").forEach((frame) => {
        gsap.fromTo(
            frame,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: frame,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

});
