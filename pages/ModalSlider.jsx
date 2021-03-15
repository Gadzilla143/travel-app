import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  A11y,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper";

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Mousewheel,
  Keyboard,
  Autoplay,
]);

const ModalSlider = (props) => {
  //console.log(props.attractions);
  return (
    <div
      className={`modal__wrapper ${props.isOpened ? "open" : "close"}`}
      style={{ ...props.style }}
    >
      <div className="modal__body" onClick={(e) => e.stopPropagation}>
        <div className="modal__close" onClick={props.onModalClose}>
          X
        </div>
        <div className="modal__swiper_container">
          <Swiper
            className="modal__swiper_attraction"
            effect="fade"
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
          >
            {props.attractions.map((attraction, index) => {
              //console.log(attraction);
              return (
                <li key={index}>
                  <SwiperSlide key={index}>
                    <img
                      className="modal__swiper_img"
                      src={attraction.imageUrl}
                      alt={attraction.imageUrl}
                    />
                  </SwiperSlide>
                </li>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default ModalSlider;
