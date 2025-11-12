const AgentBottomPage = ({ children, pb, mt, h }) => {
  return (
    <main className={`${h} ${mt} pt-6 ${pb} bg-white rounded-t-2xl`}>
      {children}
    </main>
  );
};

export default AgentBottomPage;
