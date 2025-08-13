import Card from "../card/Card";
import "./Section.css"; // custom responsive layout

const Section = ({ title, data }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 px-2 sm:px-0">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <span className="text-blue-500 cursor-pointer">›</span>
      </div>

      <div className="section-card-wrapper">
        {data.map((item, idx) => (
          // <Card key={idx} {...item} />
          <Card
            key={item.id || item._id || idx}        // Use unique id as key
            id={item.id || item._id || idx}         // Pass id explicitly
            title={item.title}
            location={item.location}
            price={item.price}
            images={item.images}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
