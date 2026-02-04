const PROPOSAL_COUNT = 7;
const ProposalItem = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:border-blue-500 transition-colors">
      <div className="text-xl font-semibold mb-2">Title: Hello There</div>
      <div className="text-gray-700 dark:text-gray-300">
        Desc: What is your vote?
      </div>
    </div>
  );
};

const ProposalView = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">New Proposals</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: PROPOSAL_COUNT }).map((_, i) => {
          return <ProposalItem key={i} />;
        })}
      </div>
    </div>
  );
};

export default ProposalView;
