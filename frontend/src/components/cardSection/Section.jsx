import { useRef } from "react";
import Card from "../card/Card";
import "./Section.css";

const Section = ({ title, data }) => {
  const listings = Array.isArray(data) ? data : [];

  // Split into 2 rows only
  const half = Math.ceil(listings.length / 2);
  const row1 = listings.slice(0, half);
  const row2 = listings.slice(half);

  // Refs for scrolling
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const scroll = (rowRef, direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300; // adjust scroll px
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3 sm:px-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-600">{title}</h2>
        {/* Example right arrow for row1 */}
        <div className="flex gap-2 text-blue-500 cursor-pointer">
          <span onClick={() => scroll(row1Ref, "left")}>‹</span>
          <span onClick={() => scroll(row1Ref, "right")}>›</span>
        </div>
      </div>

      <div className="section-rows space-y-6">
        {/* Row 1 */}
        {row1.length > 0 && (
          <div className="relative">
            <div ref={row1Ref} className="section-card-wrapper">
              {row1.map((item, idx) => (
                <Card
                  key={item.id || idx}
                  id={item.id || idx}
                  title={item.title}
                  location={item.location}
                  price={item.price}
                  description={item.description}
                  images={Array.isArray(item.images) ? item.images : []}
                  listing={item}
                  booked={item.booked}
                />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-lg sm:text-xl font-bold text-gray-600">🏠 More Homes</h2>

        {/* Row 2 with its own arrows */}
        {row2.length > 0 && (
          <div className="relative">
            <div ref={row2Ref} className="section-card-wrapper">
              {row2.map((item, idx) => (
                <Card
                  key={item.id || idx}
                  id={item.id || idx}
                  title={item.title}
                  location={item.location}
                  price={item.price}
                  description={item.description}
                  images={Array.isArray(item.images) ? item.images : []}
                  listing={item}
                  booked={item.booked}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
