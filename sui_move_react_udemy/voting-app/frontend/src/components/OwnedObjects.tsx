import { useCurrentAccount, useCurrentClient } from "@mysten/dapp-kit-react";
import { useQuery } from "@tanstack/react-query";

const ObjectCard = ({ objectId }: { objectId: string }) => (
  <div className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800">
    <p className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">
      Object ID: {objectId}
    </p>
  </div>
);

export const OwnedObjects = () => {
  const account = useCurrentAccount();
  const client = useCurrentClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["ownedObjects", account?.address],
    queryFn: () => client.core.listOwnedObjects({ owner: account!.address }),
    enabled: !!account,
    staleTime: 30_000,
  });

  if (!account) {
    return <div>No wallet connected</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to fetch objects"}
      </div>
    );
  }

  return (
    <div className="flex flex-col my-4 space-y-4">
      {data.objects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No objects owned by connected wallet
        </p>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Objects owned by connected wallet
          </h2>
          <div className="space-y-2">
            {data.objects.map((objectRes) => (
              <ObjectCard
                key={objectRes.objectId}
                objectId={objectRes.objectId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
