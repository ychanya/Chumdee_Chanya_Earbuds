// *********************** JS Guide ***********************

//   00. Mobile Menu 
//   01. Earbuds Scrub
//   02. Video Player
//   03. Model Viewer
//   04. X-Ray View
//   05. Color Options
//   06. Fade-in Animation

// ********************************************************

console.log("JS file connected");

// ------------- Mobile Menu ------------- 

(function() {
    const hambergurBtn = document.querySelector("#hamburgerBtn");
    const closingBtn = document.querySelector("#closeHamburger");

    function toggleHamburger() {
        const mobileMenu = document.querySelector("#mobileMenu");
        const isClosing = mobileMenu.classList.contains("open");

        if (isClosing) {
            mobileMenu.classList.remove("open");
            document.body.classList.remove("no-scroll");
        } else {
            mobileMenu.classList.add("open");
            document.body.classList.add("no-scroll"); 
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
            pin: true, 
            scrub: 1,
            start: "top +=6%",
            end:"+=120%"
            // markers: true
        },
        onUpdate: drawFrame
    })

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
            title:"Clear Audio"
        },
        {
            title:"Fast Charge"
        },
        {
            title:"Long Lasting Battery"
        },
        {
            title:"Comfortable Fit"
        }
    ]

    function populateHotspots() {

        // forEach passes two parameters (productDetail, index) automatically from the array
        productDetails.forEach((productDetail, index) =>{

            // +1 because hotspot IDs start at 1, but arrays start at 0
            let currentHotspot = document.querySelector(`#hotspot-${index+1}`)

            const titleElement = document.createElement("h2");
            titleElement.textContent = productDetail.title;

            currentHotspot.appendChild(titleElement);
        });
    }

    populateHotspots();

    function showProductDetail() {
        let currentHotspot = document.querySelector(`#${this.slot}`);
        gsap.to(currentHotspot, { duration: 1, autoAlpha: 1 });
    }

    function hideProductDetail() {
        let currentHotspot = document.querySelector(`#${this.slot}`);
        gsap.to(currentHotspot, { duration: 1, autoAlpha: 0 });
    }

    hotspots.forEach(function(hotspot) {
        hotspot.addEventListener("mouseenter", showProductDetail);
        hotspot.addEventListener("mouseleave", hideProductDetail);
    });
})();

// ------------- X-Ray View ------------- 

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

// ------------- Color Options ------------- 

(function() {
    const earbudsOptions = document.querySelector("#product-image");
    const buttons = document.querySelectorAll("#color-options button");

    function changeColor() {
        earbudsOptions.src = `images/product_options/earbuds_${this.id}.jpg`;
    }

    buttons.forEach(button=> {
        button.addEventListener("click", changeColor);
    })
})();

// ------------- Fade-in Animation ------------- 

(function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".fade-in");

    sections.forEach((section) => {
        gsap.fromTo(
            section,
            { 
                opacity: 0, 
                y: 100 
            },
            {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top +=90%",
                    end: "bottom +=50%",
                    scrub: 1.5,
                    once: true,
                    // markers: true
                },
            }
        );
    });
})();