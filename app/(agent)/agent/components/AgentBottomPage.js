const AgentBottomPage = ({ children, pb, mt, h, height }) => {
  return (
    <main
      className={`${h} ${mt} pt-6 ${pb} bg-white rounded-t-2xl`}
      style={{ minHeight: `calc(100vh - ${height}px)` }}
    >
      {children}
    </main>
  );
};

export default AgentBottomPage;
