import DropDown from "../DropDown";

const RequestCreateForm = () => {
  return (
    <form action="#" className="flex flex-col gap-y-[15px]">
      <DropDown placeholder="انتخاب دسته بندی" />

      <DropDown placeholder="انتخاب سرویس" />

      <input
        type="text"
        className="custom-shadow w-full h-12 px-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
        placeholder="عنوان  درخواست را  وارد کنیـد"
      />

      <textarea
        className="custom-shadow w-full h-[220px] p-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px] placeholder:text-[#8C8C8C]"
        placeholder="شرح درخاست را وارد کنید"
      ></textarea>

      <button
        type="button"
        className="custom-shadow flex items-center justify-between w-full h-12 pr-6 pl-[15px] bg-[#EFF0F6] rounded-[10px]"
      >
        <span className="font-semibold text-xs/[16.8px] text-[#8C8C8C] tracking-[-0.12px]">
          آپلود فایل
          <span className="font-normal text-[8px]/[11.2px]">
            ( تا حجم 50 مگابایت )
          </span>
        </span>
        <svg className="w-[25px] h-[25px]">
          <use href="#upload" />
        </svg>
      </button>

      <button
        type="submit"
        className="flex items-center justify-center w-full h-12 leading-6 bg-[#20CFCF] text-white rounded-[10px] tracking-[-0.12px] mt-[9px]"
      >
        ارسال درخواست
      </button>
    </form>
  );
};

export default RequestCreateForm;
