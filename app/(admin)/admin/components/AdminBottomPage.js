const AdminBottomPage = ({ children, pb, mt, h }) => {
  return (
    <main
      className={`${h} ${mt} pt-6 ${pb} bg-white rounded-t-2xl`}
      style={{ minHeight: "calc(100vh - 398px)" }}
    >
      {children}
    </main>
  );
};

export default AdminBottomPage;
