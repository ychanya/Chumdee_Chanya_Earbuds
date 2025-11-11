console.log("JS file connected");

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