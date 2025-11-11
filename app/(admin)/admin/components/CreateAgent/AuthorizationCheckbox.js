import AuthorizationCheckboxItem from "./AuthorizationCheckboxItem";

const AuthorizationCheckbox = () => {
  return (
    <ul className="flex flex-col gap-y-3.5">
      <AuthorizationCheckboxItem title="ارسال کد یکبار مصـــرف" />
      <AuthorizationCheckboxItem title="مشاهــده همه تیکت ها" />
      <AuthorizationCheckboxItem title="مشاهــده همه درخواست تماس" />
      <AuthorizationCheckboxItem title="مشاهــده گزارشات" />
      <AuthorizationCheckboxItem title="مشاهــده منتظر پاسخ ها" />
      <AuthorizationCheckboxItem title="امکان بستــن تیکت" />
      <AuthorizationCheckboxItem title="امکان بستــن درخواست تماس" />
      <AuthorizationCheckboxItem title="امکان تغییر وضعیت تیکت" />
      <AuthorizationCheckboxItem title="امکان تغییر وضعیت تماس ها" />
      <AuthorizationCheckboxItem title="امکان هدایت تیکت به کارشناس" />
      <AuthorizationCheckboxItem title="امکان هدایت درخواست تماس به کارشناس" />
      <AuthorizationCheckboxItem title="امکان هدایت تیکت به مدیر سیسیتم" />
      <AuthorizationCheckboxItem title="امکان هدایت درخواست تماس به مدیر سیسیتم" />
    </ul>
  );
};

export default AuthorizationCheckbox;
