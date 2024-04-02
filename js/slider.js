// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

let imageIndex = 0;
let intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  intervalId = setInterval(() => {
    slideImage(imageIndex + 1);
  }, 5000); // Change interval duration to 5 seconds (5000 milliseconds)
};

// Call autoSlide function on page load
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = (index) => {
  const length = images.length;
  imageIndex = (index + length) % length; // Handling negative index and overflow

  // Update the carousel display to show the specified image with a smooth transition
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (direction) => {
  clearInterval(intervalId);
  slideImage(imageIndex + direction);
  autoSlide();
};

// Add event listeners to the navigation buttons
nextButton.addEventListener("click", () => updateClick(1));
prevButton.addEventListener("click", () => updateClick(-1));

// Pause auto sliding on mouse hover
wrapper.addEventListener("mouseenter", () => clearInterval(intervalId));

// Resume auto sliding on mouse leave
wrapper.addEventListener("mouseleave", autoSlide);

// Loop the carousel back to the first image when reaching the end
carousel.addEventListener("transitionend", () => {
  if (images[imageIndex].id === "lastClone") {
    carousel.style.transition = "none";
    imageIndex = images.length - 2;
    carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
  }
  if (images[imageIndex].id === "firstClone") {
    carousel.style.transition = "none";
    imageIndex = images.length - imageIndex;
    carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
  }
});
