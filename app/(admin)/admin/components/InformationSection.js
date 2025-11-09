import Items from "./Items";

const InformationSection = ({ data }) => {
  return (
    <section className="mt-[38px] mb-[29px]">
      <div className="container">
        <Items data={data} />
      </div>
    </section>
  );
};

export default InformationSection;
