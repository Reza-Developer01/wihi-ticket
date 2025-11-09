import UserPlansItem from "./UserPlansItem";

const UserPlans = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <section>
      <div className="container">
        <div className="plans max-w-[300px] mx-auto bg-white rounded-2xl">
          <div className="flex items-center justify-center flex-row-reverse gap-x-4">
            <UserPlansItem
              icon="user"
              title="پایـــــه"
              isActive={selectedPlan === 1}
              onClick={() => setSelectedPlan(1)}
            />
            <UserPlansItem
              icon="add-user"
              title="رشـــــد"
              isActive={selectedPlan === 2}
              onClick={() => setSelectedPlan(2)}
            />
            <UserPlansItem
              icon="two-user"
              title="حرفـــه ای"
              isActive={selectedPlan === 3}
              onClick={() => setSelectedPlan(3)}
            />
            <UserPlansItem
              icon="users"
              title="سازمانـــی"
              isActive={selectedPlan === 4}
              onClick={() => setSelectedPlan(4)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPlans;
