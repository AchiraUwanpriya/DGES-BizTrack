import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getBannerImages } from "../../action/Common";
// Inline carousel CSS so the styles are bundled with the component.
const carouselCss = `
/* Constrain carousel images so they aren't too tall on desktop */
.carousel-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

/* Desktop: limit height to keep carousel from dominating the page */
@media (min-width: 1024px) {
  .carousel-image {
    max-height: 300px;
  }
}

/* Tablet and smaller: a slightly smaller cap */
@media (max-width: 1023px) {
  .carousel-image {
    max-height: 200px;
  }
}
`;
function NewCarousel() {
  const { responseBody } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  useEffect(() => {
    if (responseBody) {
      dispatch(getBannerImages());
    }
  }, [dispatch]);

  return (
    <>
      <style>{carouselCss}</style>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {(responseBody || []).map((name, index) => (
            <div className="slide" key={index}>
              <img
                className="carousel-image"
                src={`https://esystems.cdl.lk/backend-test/BizTrack/home/GetBannerImg?imgName=${name}`}
                alt={`banner-${index}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default NewCarousel;
