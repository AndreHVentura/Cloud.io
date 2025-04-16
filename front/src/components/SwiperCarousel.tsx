// src/components/SwiperCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import styled from "styled-components";

const images = [
  "https://picsum.photos/id/1005/800/400",
  "https://picsum.photos/id/1006/800/400",
  "https://picsum.photos/id/1008/800/400"
];

const SwiperCarousel = () => (
  <CarouselContainer>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      modules={[Autoplay]}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img src={img} alt={`slide-${idx}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  </CarouselContainer>
);

export default SwiperCarousel;

const CarouselContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 50%;

  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    height: 100%;
  }
`;
