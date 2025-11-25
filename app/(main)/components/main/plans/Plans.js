import PlansItem from "./PlansItem";

const Plans = ({ currentPlan }) => {
  const plans = [
    { icon: "user", title: "پایـــــه", name: "basic" },
    { icon: "add-user", title: "رشـــــد", name: "growth" },
    { icon: "two-user", title: "حرفـــه ای", name: "pro" },
    { icon: "users", title: "سازمانـــی", name: "enterprise" },
  ];

  return (
    <section className="mt-[86px]">
      <div className="container">
        <div className="plans max-w-[300px] mx-auto pt-6 pl-6 pr-[29px] pb-[15px] bg-white rounded-2xl">

          <div className="flex items-center justify-center flex-row-reverse gap-x-4">
            {plans.map((p) => (
              <PlansItem
                key={p.name}
                icon={p.icon}
                title={p.title}
                isActive={currentPlan === p.name}
              />
            ))}
          </div>

          <a
            href="#"
            className="flex items-center justify-start mt-[18px] text-xs/[16.8px] text-[#0F8080] tracking-[-0.12px]"
          >
            ارتقاء پلن پشتیبانـــی
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;
