const carousel = document.querySelector("media-carousel")
const thumbnail = document.querySelector("page-dots[class~=product-gallery__thumbnail-list")
const infoDiv = document.querySelector("safe-sticky.product-info")
const introDiv = document.querySelector("div.section-stack__intro")
const featureDiv = document.querySelector("div.section-stack__main")

const productArr = [
    {
        id: "0",
        name: "Chuột không dây siêu nhẹ Pulsar X2 Wireless X RandomfrankP (Limited Edition)",
        image: ["https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805208821.jpg?v=1677185468"
            , "https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805405429.jpg?v=1677185471"
            , "https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805569269.jpg?v=1679559602"
            , "https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805503733.jpg?v=1679559602"
            , "https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805307125.jpg?v=1679559602"
            , "https://cdn.shopify.com/s/files/1/0636/9044/0949/products/chu-t-khong-day-sieu-nh-pulsar-x2-wireless-x-randomfrankp-limited-1500pcs-38867805274357.jpg?v=1679559603"
        ],
        vendor_name: "Pulsar",
        vendor_image: "https://cdn.shopify.com/s/files/1/0636/9044/0949/files/logo_240x240.jpg?v=1677387831",
        price: "2.499.000₫",
        rating: "5.0",
        pre_order: "5/2023",
        limit: "Giới hạn chỉ 1500 chiếc toàn cầu mỗi loại.",
        design_location: "Korea",
        warranty: "Bảo hành: 24 tháng đổi mới",
        size: ["Medium", "Mini"],
        related_link: ["https://www.pulsar.gg/pages/download-x2"
            , "https://www.phongcachxanh.vn/blogs/tin-tuc/huong-dan-su-dung-phan-mem-pulsar-fusion-cho-pulsar-x2-va-pulsar-xlite-v2"
            , "https://www.phongcachxanh.vn/blogs/tin-tuc/huong-dan-cap-nhat-firmware-chuot-pulsar"],
        intro: "Đối xứng, Claw Grip, cảm biến Pixart PAW3395 mới nhất - Đó là Pulsar X2 Wireless. Với form chuột đối xứng được thiết kế hoàn toàn mới bởi Pulsar, X2 Wireless là mẫu chuột đối xứng giúp bạn chơi game và giành lấy những vị trí cao thật cao trên bảng xếp hạng. Trọng lượng khoảng dưới 60 gram, thiết kế không lỗ cùng thời lượng pin lên đến 70 giờ giúp bạn sử dụng chuột cả ngày dài mà không lo mệt mỏi như những mẫu chuột không dây nặng nề truyền thống.",
        feature: {
            ["Kích thước"]: ["Medium: 120mm x 63mm x 38mm", "Mini: 116mm x 61mm x 37mm"],
            ["Trọng lượng"]: ["Medium: 59g (+- 1g)", "Mini: 56g (+- 1g)"],
            ["Dáng chuột"]: "Đối xứng - Symmetrical",
            ["Switch"]: "Huano Blue Shell Pink Dot",
            ["Con lăn"]: "TTC Dustproof",
            ["Pin"]: "Lên đến 70 giờ",
        }
        
    }
]

window.onload = () => {
    // retrieveData();
    loadContent();
};

function loadContent() {
    loadGallery();
    loadThumbnail();
    bindFunction();

    loadInfo();
}

function loadGallery() {
    carousel.innerHTML = "";

    let curProduct = productArr[0];

    for (let img of curProduct.image) {
        carousel.innerHTML += `
        <div class="product-gallery__media  snap-center" data-media-type="image" data-media-id="31478696837365">
            <img
                src="` + img + `"
                alt="` + curProduct.name + `"
                srcset="` + img + `&width=200 200w, ` + img + `&width=300 300w, ` + img + `&width=400 400w, ` 
                + img + `&width=500 500w, ` + img + `&width=600 600w, ` + img + `&width=700 700w, ` 
                + img + `&width=800 800w, ` + img + `&width=1000 1000w, ` + img + `&width=1200 1200w, ` 
                + img + `&width=1400 1400w, ` + img + `&width=1600 1600w"
                width="1600" height="1600" loading="eager" fetchpriority="high"
                sizes="(max-width: 740px) calc(100vw - 40px), (max-width: 999px) calc(100vw - 64px), min(730px, 40vw)"
                class="rounded">
        </div>
        `;
    }
}

function loadThumbnail() {
    thumbnail.innerHTML = "";

    let curProduct = productArr[0];

    for (let [id, img] of curProduct.image.entries()) {
        let order = id+1;

        thumbnail.innerHTML += `
        <button type="button" class="product-gallery__thumbnail" aria-current="` + ((order == 1) ? "true" : "false") + `" aria-label="Đến mục ` + order + `">
        <img
            src="` + img + `"
            alt="Chuột không dây siêu nhẹ Pulsar X2 Wireless X RandomfrankP (Limited 1500pcs)"
            srcset="` + img + `&width=56 56w, ` + img + `&width=64 64w, ` + img + `&width=112 112w, ` 
            + img + `&width=128 128w, ` + img + `&;width=168 168w, ` + img + `&width=192 192w"
            width="1600" height="1600" loading="lazy" sizes="(max-width: 699px) 56px, 64px"
            class="object-contain rounded-sm">
        </button>
        `;
    }
}

function loadInfo() {
    console.log(infoDiv)

    let curProduct = productArr[0];

    // Load vendor name
    infoDiv.querySelector("div.product-info__vendor").innerHTML = `
    <a class=" link-faded">` + curProduct.vendor_name + `</a>`;

    // Load product name
    infoDiv.querySelector(".product-info__title").innerHTML = curProduct.name;

    // Load price
    infoDiv.querySelector("price-list").innerHTML = `
    <sale-price form="product-form-7993893847285-template--16714356457717__main" class="text-lg">` + curProduct.price + `</sale-price>`;

    // Load rating
    let rating = document.createElement("span")
    rating.classList.add("text-sm")
    rating.innerHTML = curProduct.rating;
    infoDiv.querySelector("a.rating").insertBefore(rating, infoDiv.querySelector("a.rating").firstChild);

    // Load description
    let div = document.createElement("div")
    div.classList.add("prose")
    div.innerHTML += `
    <div style="text-align: left;">
        <strong>Pre-order:</strong> thời gian về hàng dự kiến ` +  curProduct.pre_order + `
    </div>
    <div style="text-align: left;">
        <img
        src="` + curProduct.vendor_image + `"
        alt="" style="float: none;" loading="lazy">
    </div>
    `;

    if (curProduct.limit) {
        div.innerHTML += `<p><em>` + curProduct.limit + `</em></p>`
    }

    div.innerHTML += `
    <p><strong>Designed in ` + curProduct.design_location + `</strong></p>
    <p><strong>` + curProduct.warranty + `</strong></p>
    `;

    infoDiv.querySelector("div.product-info__description").appendChild(div)

    // Load variant picker for size
    for (let size of curProduct.size) {
        infoDiv.querySelector("div.variant-picker__option-values").innerHTML += `
        <input class="sr-only" type="radio" name="option1" form="product-form-7993893847285-template--16714356457717__main"
            id="swatch-template--16714356457717__main-product-form-7993893847285-template--16714356457717__main--option1-` + size.toLowerCase() + `"
            value="` + size + `">
        <label class="block-swatch" for="swatch-template--16714356457717__main-product-form-7993893847285-template--16714356457717__main--option1-` + size.toLowerCase() + `"
        data-option-value="">
        <span>` + size + `</span>
        </label>
        `;
    }
    
    // Load related link
    let ul = document.createElement("ul")
    
    for (let [id, link] of curProduct.related_link.entries()) {
        let order = id+1;
        ul.innerHTML += `
        <li>
            <a href="` + link + `">Link ` + order + `</a>
        </li>
        `;
    }

    infoDiv.querySelector("div#related-link").appendChild(ul);

}

// Add event listener for all thumbnail images 
function bindFunction() {
    const thumbnails = document.querySelectorAll("button.product-gallery__thumbnail")
    const images = document.querySelectorAll("div[class~=product-gallery__media")

    thumbnails.forEach( (thumbnail) => {
        thumbnail.addEventListener("click", function(e) {
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
                    thumbnails[id].ariaCurrent = "true";
                }

                else {
                    if (img.classList.contains("is-selected")) {
                        console.log(2)
                        img.classList.remove("is-selected")
                        
                    } 
                    img.style.display = 'none';
                    thumbnails[id].ariaCurrent = "false";
                }
            }
        });
    })
}