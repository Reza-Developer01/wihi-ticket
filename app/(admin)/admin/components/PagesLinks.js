import PagesLink from "./PagesLink";

const PagesLinks = ({ data }) => {
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
            labelTitle={`${data.number_agent} | کارشناس`}
            href="/admin/create-agent"
          />
          <PagesLink
            title="افزودن کاربــــر"
            hasLabel={true}
            labelTitle={`${data.number_customer} | کاربــر`}
            href="/admin/create-user"
          />
        </div>
      </div>
    </section>
  );
};

export default PagesLinks;
