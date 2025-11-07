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
          <PagesLink
            title="افزودن کارشناس"
            hasLabel={true}
            labelTitle="12 | کارشناس"
          />
          <PagesLink
            title="افزودن کاربــــر"
            hasLabel={true}
            labelTitle="102 | کاربــر"
          />
        </div>
      </div>
    </section>
  );
};

export default PagesLinks;
