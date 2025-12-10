import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import BookCard from './BookCard';

// Import Swiper styles - Assuming these are available globally or we will add them to index.css
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CoverFlowView({ books, onBookClick }) {
    return (
        <div className="w-full py-10 relative group">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={Math.floor(books.length / 2)}
                coverflowEffect={{
                    rotate: 30, // Grados de rotación
                    stretch: 0,
                    depth: 100, // Profundidad 3D
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper !pb-14 !pt-4"
                breakpoints={{
                    320: {
                        slidesPerView: 1.5,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3.5, // Más libros visibles en desktop
                        spaceBetween: 40
                    }
                }}
            >
                {books.map((book) => (
                    <SwiperSlide key={book.slug} className="!w-[280px] sm:!w-[320px]">
                        <div className="transform transition-transform">
                            <BookCard book={book} onClick={onBookClick} variant="coverflow" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Button Styles in CSS global usually, but inline here for clarity */}
            <style>{`
                .swiper-pagination-bullet { background: rgba(255,255,255,0.5); }
                .swiper-pagination-bullet-active { background: #fff; }
                .swiper-button-prev, .swiper-button-next { color: white; opacity: 0.5; transition: opacity 0.3s; }
                .swiper-button-prev:hover, .swiper-button-next:hover { opacity: 1; }
            `}</style>
        </div>
    );
}
