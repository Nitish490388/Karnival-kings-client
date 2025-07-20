import { useState, useEffect } from "react";
import { GalleryMedia } from "@/types/gallery";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type GallerySliderProps = {
  images: GalleryMedia[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  close: () => void;
};

const GallerySlider = ({ images, index, setIndex, close }: GallerySliderProps) => {
  const [startX, setStartX] = useState<number | null>(null);

  // Handle touch or mouse start
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(x);
  };

  // Handle touch or mouse end
  const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (startX === null) return;

    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const deltaX = endX - startX;

    if (deltaX > 50 && index > 0) {
      setIndex(index - 1);
    } else if (deltaX < -50 && index < images.length - 1) {
      setIndex(index + 1);
    }

    setStartX(null);
  };

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && index < images.length - 1) setIndex(index + 1);
      if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, images.length, close, setIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      {/* Back Button */}
      <button className="absolute top-4 left-4 text-white text-xl" onClick={close}>
        <FaArrowLeft />
      </button>

      {/* Image Viewer */}
      <div
        className="max-w-3xl w-full flex items-center justify-center relative"
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
      >
        {/* Left Arrow */}
        {index > 0 && (
          <button
            className="absolute left-2 text-white text-2xl"
            onClick={() => setIndex(index - 1)}
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Image */}
        <img
          src={images[index].url}
          alt="gallery-slide"
          className="max-h-[80vh] max-w-full object-contain rounded"
          draggable={false}
        />

        {/* Right Arrow */}
        {index < images.length - 1 && (
          <button
            className="absolute right-2 text-white text-2xl"
            onClick={() => setIndex(index + 1)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default GallerySlider;
