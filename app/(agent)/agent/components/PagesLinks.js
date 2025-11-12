import PagesLink from "./PagesLink";

const PagesLinks = () => {
  return (
    <section className="mb-5">
      <div className="container">
        <div className="flex flex-col gap-y-[15px]">
          <PagesLink
            title="تیکت ها"
            subTitle="جدیدترین ها"
            hasLabel={true}
            labelTitle="مشاهد آرشیو"
          />
          <PagesLink
            title="تماس ها"
            subTitle="جدیدترین ها"
            hasLabel={true}
            labelTitle="مشاهد آرشیو"
          />
          <PagesLink title="گزارشات" href="admin/reports" />
        </div>
      </div>
    </section>
  );
};

export default PagesLinks;
