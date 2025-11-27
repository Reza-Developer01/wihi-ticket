import Items from "./Items";

const InformationSection = ({ getInfo }) => {
  return (
    <section className="mt-[38px] mb-[29px]">
      <div className="container">
        <Items getInfo={getInfo} />
      </div>
    </section>
  );
};

export default InformationSection;
