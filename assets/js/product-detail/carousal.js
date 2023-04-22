const thumbnails = document.querySelectorAll("button.product-gallery__thumbnail")
const images = document.querySelectorAll("div[class~=product-gallery__media")

// console.log(thumbnails.length)
// console.log(images.length)

// Add event listener for all thumbnail images 
thumbnails.forEach( (thumbnail) => {
    thumbnail.addEventListener("click", onClickThumbnail);
})


function onClickThumbnail(e) {
    console.log(e.path[1])
    let selectedId = Array.from(thumbnails).indexOf(e.path[1])

    // console.log(images.entries())

    for (let [id, img] of images.entries()) {
        if (id == selectedId) {
            if (!img.classList.contains("is-selected")) {
                console.log(1)
                img.classList.add("is-selected")
                
            }
            img.style.display = 'block';
        }

        else {
            if (img.classList.contains("is-selected")) {
                console.log(2)
                img.classList.remove("is-selected")
                
            } 
            img.style.display = 'none';
        }
    }
}