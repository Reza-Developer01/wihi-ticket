import BottomSection from "../components/BottomSection";
import Header from "../components/Header";

export const metadata = {
  title: "ایجاد درخواست جدید",
};

const page = () => {
  return (
    <>
      <Header
        title="درخواست جدید"
        shortDescription="لطفا در فراینــد ثبت درخواست , اطلاعات خواسته شده را با دقت وارد کنیــد"
        showBackButton={true}
      />

      <BottomSection>
        <form action="#" className="flex flex-col gap-y-[15px]">
          {/* select box */}
          <button
            type="button"
            className="custom-shadow flex items-center justify-between w-full h-12 pl-[19px] border border-[#EFF0F6] rounded-[10px]"
          >
            <div></div>
            <span className="pr-[19px] font-medium text-sm/[19.6px] text-[#8C8C8C]">
              انتخاب دسته بندی
            </span>
            <svg className="w-5 h-5 text-[#A8A8A8]">
              <use href="#arrow-down-2" />
            </svg>
          </button>

          <input
            type="text"
            className="custom-shadow w-full h-12 px-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px]
            placeholder:text-[#8C8C8C]"
            placeholder="عنوان  درخواست را  وارد کنیـد"
          />

          <textarea
            className="custom-shadow w-full h-[220px] p-6 text-xs/[16.8px] font-medium border border-[#EFF0F6] rounded-[10px] outline-none tracking-[-0.12px]
            placeholder:text-[#8C8C8C]"
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
      </BottomSection>
    </>
  );
};

export default page;
