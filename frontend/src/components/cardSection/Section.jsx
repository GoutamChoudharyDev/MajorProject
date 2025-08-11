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
          <Card key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Section;
