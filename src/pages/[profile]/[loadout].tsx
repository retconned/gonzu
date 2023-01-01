import { type NextPage } from "next";
import { useRouter } from "next/router";
import LoadoutModal from "../../components/LoadoutModal";
import { trpc } from "../../utils/trpc";

const Loadout: NextPage = () => {
  const router = useRouter();
  const loadoutId = router.query.loadout;

  const getLoadout = trpc.loadout.getLoadoutById.useQuery(loadoutId as string);

  (getLoadout.data?.attachments as Array<any>)?.forEach((loadedAttach) => {
    getLoadout.data?.Weapon.Attachments.forEach((avalAttachment) => {
      if (avalAttachment.id == loadedAttach.id) {
        loadedAttach["name"] = loadedAttach["type"];
        loadedAttach.name = avalAttachment.name;
        return loadedAttach;
      }
    });
  });

  console.log(getLoadout.data?.attachments);
  return (
    <div className="bg-black text-white">
      <p>hello</p>
      <p>loadout id :{loadoutId}</p>
      <LoadoutModal
        imageSrc="/m4.png"
        loadoutName={getLoadout.data?.loadoutName as string}
        lastUpdated={getLoadout.data?.updatedAt}
        attachments={getLoadout.data?.attachments as Array<any>}
      />
    </div>
  );
};

export default Loadout;
