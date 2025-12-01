const BottomSection = ({ children, pb, height }) => {
  return (
    <main
      className="main w-full p-6 bg-white rounded-t-3xl mt-[30px] px-0"
      style={{ paddingBottom: pb, minHeight: `calc(100vh - ${height}px)` }}
    >
      {children}
    </main>
  );
};

export default BottomSection;
