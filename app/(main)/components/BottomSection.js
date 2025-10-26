const BottomSection = ({ children, pb }) => {
  return (
    <main
      className="main w-full p-6 bg-white rounded-t-3xl mt-[30px]"
      style={{ paddingBottom: pb }}
    >
      {children}
    </main>
  );
};

export default BottomSection;
