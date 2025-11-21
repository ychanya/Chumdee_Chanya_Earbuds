// *********************** JS Guide ***********************

//   00. Mobile Menu 
//   01. Earbuds Scrub
//   02. Video Player
//   03. Model Viewer
//   04. X-Ray view

// ********************************************************

console.log("JS file connected");

// ------------- Mobile Menu ------------- 

(function() {
    const hambergurBtn = document.querySelector("#hamburgerBtn");
    const closingBtn = document.querySelector("#closeHamburger");

    function toggleHamburger() {
        const mobileMenu = document.querySelector("#mobileMenu");

        if(mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.remove("hidden");
        } else {
            mobileMenu.classList.add("hidden");
        }
    }

    hambergurBtn.addEventListener("click",toggleHamburger);
    closingBtn.addEventListener("click",toggleHamburger);
})();

// ------------- Earbuds Scrub ------------- 

(function(){

    canvas = document.querySelector("#earbud-scrub");
    const context = canvas.getContext("2d");

    // Canvas resolution
    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 201;

    const images = [];

    // Using an object to hold the current frame and animate its property with GSAP
    const buds = {
        frame: 0
    }

    for (let i=0; i<frameCount; i++) {
        const img = new Image();
        img.src = `images/still_images/earbuds_${i}.webp`;
        images.push(img);
    }

    gsap.to(buds, {
        frame: 200,
        snap: "frame",
        scrollTrigger: {
            trigger: "#earbud-scrub",
            pin: true, // Keep canvas fixed while scrolling
            scrub: 1.5,
            start: "top +=6%",
            end: "+=120%"
        },
        onUpdate: drawFrame
    })

    // Draw the first frame after the first image loads
    images[0].addEventListener("load", drawFrame);

    function drawFrame() {
        // Clear canvas before drawing
        context.clearRect(0,0, canvas.width, canvas.height);
        // Draw the current frame
        context.drawImage(images[buds.frame], 0, 0);
    }
})();

// ------------- Video Player ------------- 

(function() {
     const player = new Plyr("video", {
        controls: [
            "play", 
            "mute" 
        ]
    });
})();

// ------------- Model Viewer ------------- 
(function(){
    const hotspots = document.querySelectorAll(".Hotspot");
    const productDetails = [
        {
            title:"Clear Audio",
            description:"Designed for clarity and depth, advanced sound technology and precise microphones work together to deliver an effortlessly pure sound experience.",
            image:"images/audio-waves.png",
            alt:"Audio icon"
        },
        {
            title:"Fast Charge",
            description:"Fast charging gives you hours of playback in just a few minutes, keeping you powered and ready at all times.",
            image:"images/charging.png",
            alt:"Fast charging battery icon"
        },
        {
            title:"Long Lasting Battery",
            description:"A single charge lets you enjoy hours of music and calls without interruption, keeping you powered all day.",
            image:"images/clock.png",
            alt:"Clock icon"
        },
        {
            title:"Comfortable Fit",
            description:"Inspired by earcuff design, these earbuds stay securely in place while adding a stylish touch to your everyday look.",
            image:"images/ear.png",
            alt:"Ear icon"
        }
    ]

    function populateHotspots() {

        // forEach passes two parameters (productDetail, index) automatically from the array
        productDetails.forEach((productDetail, index) =>{

            // +1 because hotspot IDs start at 1, but arrays start at 0
            let currentHotspot = document.querySelector(`#hotspot-${index+1}`)

            const titleElement = document.createElement("h2");
            titleElement.textContent = productDetail.title;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = productDetail.description;

            const imageElement = document.createElement("img");
            imageElement.src = productDetail.image;
            imageElement.alt = productDetail.alt;

            currentHotspot.appendChild(imageElement);
            currentHotspot.appendChild(titleElement);
            currentHotspot.appendChild(descriptionElement);
        });
    }

    populateHotspots();

    function showProductDetail() {
        let currentHotspot = document.querySelector(`#${this.slot}`);
        // Fade in the hotspot content using GSAP animation
        gsap.to(currentHotspot, { duration: 1, autoAlpha: 1 });
    }

    function hideProductDetail() {
        let currentHotspot = document.querySelector(`#${this.slot}`);
        // Fade out the hotspot content using GSAP animation
        gsap.to(currentHotspot, { duration: 1, autoAlpha: 0 });
    }

    hotspots.forEach(function(hotspot) {
        hotspot.addEventListener("mouseenter", showProductDetail);
        hotspot.addEventListener("mouseleave", hideProductDetail);
    });
})();

// ------------- X-Ray view ------------- 

(function() {
    const xrayView = document.querySelector("#xrayView");
    const sliderControl = document.querySelector("#slider");

    function moveXrayView() {
        xrayView.style.width = `${slider.value}%`;
    }

    function resetSlider() {
        sliderControl.value = 50;
    }

    sliderControl.addEventListener("input", moveXrayView);
    window.addEventListener("load", resetSlider);
})();