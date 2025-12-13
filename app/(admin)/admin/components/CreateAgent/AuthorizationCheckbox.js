import AuthorizationCheckboxItem from "./AuthorizationCheckboxItem";

const AuthorizationCheckbox = ({ onChangePermission, permissions }) => {
  const allPermissions = [
    { key: "view_all_tickets", title: "مشاهده همه تیکت ها" },
    { key: "view_all_calls", title: "مشاهده همه درخواست تماس" },
    { key: "view_reports", title: "مشاهده گزارشات" },
    { key: "view_waiting", title: "مشاهده منتظر پاسخ ها" },
    { key: "close_ticket", title: "امکان بستن تیکت" },
    { key: "close_call", title: "امکان بستن درخواست تماس" },
    { key: "change_ticket_status", title: "امکان تغییر وضعیت تیکت" },
    { key: "change_call_status", title: "امکان تغییر وضعیت تماس ها" },
    { key: "can_assign_tickets", title: "امکان هدایت تیکت به کارشناس" },
    {
      key: "can_assign_callrequests",
      title: "امکان هدایت درخواست تماس به کارشناس",
    },
    // {
    //   key: "can_assign_callrequests",
    //   title: "دسترسی به درخواست های تماس",
    // },
  ];

  return (
    <ul className="flex flex-col gap-y-3.5">
      {allPermissions.map((item) => (
        <AuthorizationCheckboxItem
          key={item.key}
          title={item.title}
          permKey={item.key}
          onChangePermission={onChangePermission}
          checked={permissions.includes(item.key)}
        />
      ))}
    </ul>
  );
};

export default AuthorizationCheckbox;
