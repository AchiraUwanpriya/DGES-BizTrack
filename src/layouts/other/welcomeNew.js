// welcome.js

// Add event listener to the first img element
const imageElement = document.querySelector('img');
if (imageElement) {
  imageElement.addEventListener('click', function() {
    // Perform an action when the image is clicked
    console.log('Image clicked!');
  });
}
