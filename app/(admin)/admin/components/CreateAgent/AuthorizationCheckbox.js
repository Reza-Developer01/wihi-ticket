import AuthorizationCheckboxItem from "./AuthorizationCheckboxItem";

const AuthorizationCheckbox = ({ onChangePermission }) => {
  const permissions = [
    { key: "send_otp", title: "ارسال کد یکبار مصرف" },
    { key: "view_all_tickets", title: "مشاهده همه تیکت ها" },
    { key: "view_all_calls", title: "مشاهده همه درخواست تماس" },
    { key: "view_reports", title: "مشاهده گزارشات" },
    { key: "view_waiting", title: "مشاهده منتظر پاسخ ها" },
    { key: "close_ticket", title: "امکان بستن تیکت" },
    { key: "close_call", title: "امکان بستن درخواست تماس" },
    { key: "change_ticket_status", title: "امکان تغییر وضعیت تیکت" },
    { key: "change_call_status", title: "امکان تغییر وضعیت تماس ها" },
    { key: "assign_ticket_agent", title: "امکان هدایت تیکت به کارشناس" },
    { key: "assign_call_agent", title: "امکان هدایت درخواست تماس به کارشناس" },
    { key: "assign_ticket_admin", title: "امکان هدایت تیکت به مدیر سیستم" },
    {
      key: "assign_call_admin",
      title: "امکان هدایت درخواست تماس به مدیر سیستم",
    },
  ];

  return (
    <ul className="flex flex-col gap-y-3.5">
      {permissions.map((item) => (
        <AuthorizationCheckboxItem
          key={item.key}
          title={item.title}
          permKey={item.key}
          onChangePermission={onChangePermission}
        />
      ))}
    </ul>
  );
};

export default AuthorizationCheckbox;
