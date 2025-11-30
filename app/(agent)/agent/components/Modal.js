const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-[#2F2F3B33] backdrop-blur-[10px] z-10">
      <div className="w-[calc(100%-48px)] mx-auto p-6 bg-white rounded-[10px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
