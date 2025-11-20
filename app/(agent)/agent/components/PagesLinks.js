import PagesLink from "./PagesLink";

const PagesLinks = ({ user }) => {
  const canViewReports = user?.permissions?.some(
    (p) => p.slug === "view_reports"
  );

  return (
    <section className="mb-5">
      <div className="container">
        <div className="flex flex-col gap-y-[15px]">
          <PagesLink
            title="تیکت ها"
            subTitle="جدیدترین ها"
            hasLabel={true}
            labelTitle="مشاهده آرشیو"
            href="/agent/tickets"
          />

          <PagesLink
            title="تماس ها"
            subTitle="جدیدترین ها"
            hasLabel={true}
            labelTitle="مشاهده آرشیو"
            href="/agent/call"
          />

          {canViewReports && (
            <PagesLink title="گزارشات" href="/agent/reports" />
          )}
        </div>
      </div>
    </section>
  );
};

export default PagesLinks;
