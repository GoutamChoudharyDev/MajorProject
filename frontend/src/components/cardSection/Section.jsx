import Card from "../card/Card"; // import Card
import "./Section.css"; // optional, if you have custom styles

const Section = ({ title, data }) => {
  const listings = Array.isArray(data) ? data : []; // ensure always an array

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 px-2 sm:px-0">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        <span className="text-blue-500 cursor-pointer">›</span>
      </div>

      <div className="section-card-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((item, idx) => (
          <Card
            key={item.id || idx}
            id={item.id || idx}
            title={item.title}
            location={item.location}
            price={item.price}
            description={item.description}
            images={Array.isArray(item.images) ? item.images : []} // ensure images is array
            listing={item} // pass full listing if needed
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
