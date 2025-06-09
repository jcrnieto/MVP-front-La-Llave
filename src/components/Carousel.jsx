import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';

const Carousel = ({ promotions, onAddToCart }) => {
// console.log('promotions', promotions);

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

return (
    <div className=" relative overflow-hidden bg-gray-100 py-4" ref={emblaRef}>
      <div className="flex">
        {Array.isArray(promotions) && promotions.map((promo) => (
          <div
            key={promo.id}
            className="min-w-full flex flex-col items-center justify-center px-4 cursor-pointer"
            onClick={() => onAddToCart(promo)}
          >
            <img src={promo.image_url} alt={promo.name} className="h-48 object-contain mb-2" />
            <h3 className="text-lg font-semibold">{promo.name}</h3>
            <p className="text-orange-600 font-medium">${promo.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange shadow p-2 rounded-full"
      >
        ◀️
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full"
      >
        ▶️
      </button>
    </div>
  );
}

export default Carousel;