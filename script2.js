/* =========================================
   WANDERLUST - WORLD TRAVEL JOURNAL
   STEP 3: JAVASCRIPT FUNCTIONALITY
   ========================================= */


/* =========================================
   1. SELECT HTML ELEMENTS
   ========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-button");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxTitle = document.getElementById("lightbox-title");

const lightboxDescription =
    document.getElementById("lightbox-description");

const lightboxCategory =
    document.getElementById("lightbox-category");

const closeButton =
    document.getElementById("lightbox-close");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");


/* =========================================
   2. VARIABLES
   ========================================= */

let visibleItems = Array.from(galleryItems);

let currentIndex = 0;


/* =========================================
   3. CATEGORY FILTER
   ========================================= */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        /* Remove active class from all buttons */

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        /* Add active class to clicked button */

        button.classList.add("active");


        /* Get selected category */

        const selectedCategory =
            button.getAttribute("data-filter");


        /* Filter gallery */

        galleryItems.forEach(function(item) {

            const itemCategory =
                item.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                itemCategory === selectedCategory
            ) {

                item.classList.remove("hide");

                item.classList.add("show");

            } else {

                item.classList.remove("show");

                item.classList.add("hide");

            }

        });


        /*
            Update visible items.
            Only visible images will be used
            for lightbox navigation.
        */

        visibleItems = Array.from(galleryItems).filter(
            function(item) {

                return !item.classList.contains("hide");

            }
        );

    });

});


/* =========================================
   4. OPEN LIGHTBOX
   ========================================= */

function openLightbox(item) {

    /*
        Find the position of the clicked image
        among currently visible images.
    */

    currentIndex =
        visibleItems.indexOf(item);


    if (currentIndex === -1) {

        currentIndex = 0;

    }


    updateLightbox();


    /* Show lightbox */

    lightbox.classList.add("show");

    lightbox.setAttribute("aria-hidden", "false");


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";

}


/* =========================================
   5. UPDATE LIGHTBOX
   ========================================= */

function updateLightbox() {

    if (visibleItems.length === 0) {

        return;

    }


    const currentItem =
        visibleItems[currentIndex];


    /* Get image */

    const image =
        currentItem.querySelector("img");


    /* Get destination information */

    const title =
        currentItem.getAttribute("data-title");


    const description =
        currentItem.getAttribute("data-description");


    const category =
        currentItem.querySelector(".image-category");


    /* Update lightbox */

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title;

    lightboxDescription.textContent = description;

    lightboxCategory.textContent =
        category.textContent.trim();


}


/* =========================================
   6. CLOSE LIGHTBOX
   ========================================= */

function closeLightbox() {

    lightbox.classList.remove("show");

    lightbox.setAttribute("aria-hidden", "true");


    /* Allow page scrolling again */

    document.body.style.overflow = "";

}


/* =========================================
   7. PREVIOUS IMAGE
   ========================================= */

function showPreviousImage() {

    if (visibleItems.length === 0) {

        return;

    }


    currentIndex--;


    /*
        If we go before the first image,
        move to the last image.
    */

    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }


    updateLightbox();

}


/* =========================================
   8. NEXT IMAGE
   ========================================= */

function showNextImage() {

    if (visibleItems.length === 0) {

        return;

    }


    currentIndex++;


    /*
        If we go beyond the last image,
        return to the first image.
    */

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }


    updateLightbox();

}


/* =========================================
   9. VIEW PHOTO BUTTONS
   ========================================= */

galleryItems.forEach(function(item) {

    const viewButton =
        item.querySelector(".view-button");


    viewButton.addEventListener("click", function(event) {

        /*
            Prevent the button click from
            triggering anything behind it.
        */

        event.stopPropagation();


        openLightbox(item);

    });

});


/* =========================================
   10. CLICK IMAGE TO OPEN LIGHTBOX
   ========================================= */

galleryItems.forEach(function(item) {

    const image =
        item.querySelector("img");


    image.addEventListener("click", function() {

        /*
            Only open if the image is visible.
        */

        if (!item.classList.contains("hide")) {

            openLightbox(item);

        }

    });

});


/* =========================================
   11. CLOSE BUTTON
   ========================================= */

closeButton.addEventListener(
    "click",
    closeLightbox
);


/* =========================================
   12. PREVIOUS BUTTON
   ========================================= */

previousButton.addEventListener(
    "click",
    showPreviousImage
);


/* =========================================
   13. NEXT BUTTON
   ========================================= */

nextButton.addEventListener(
    "click",
    showNextImage
);


/* =========================================
   14. CLOSE WHEN CLICKING BACKGROUND
   ========================================= */

lightbox.addEventListener("click", function(event) {

    /*
        Close only when the dark background
        itself is clicked.
    */

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================
   15. KEYBOARD CONTROLS
   ========================================= */

document.addEventListener("keydown", function(event) {

    /*
        Only work when lightbox is open.
    */

    if (!lightbox.classList.contains("show")) {

        return;

    }


    /* Escape = Close */

    if (event.key === "Escape") {

        closeLightbox();

    }


    /* Arrow Left = Previous */

    if (event.key === "ArrowLeft") {

        showPreviousImage();

    }


    /* Arrow Right = Next */

    if (event.key === "ArrowRight") {

        showNextImage();

    }

});


/* =========================================
   16. PRELOAD NEXT/PREVIOUS IMAGES
   ========================================= */

function preloadImages() {

    galleryItems.forEach(function(item) {

        const image =
            item.querySelector("img");


        const preload =
            new Image();


        preload.src = image.src;

    });

}


preloadImages();


/* =========================================
   17. INITIAL STATE
   ========================================= */

galleryItems.forEach(function(item) {

    item.classList.add("show");

});


console.log(
    "Wanderlust Travel Gallery loaded successfully!"
);