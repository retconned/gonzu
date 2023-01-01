import { type NextPage } from "next";
import { useRouter } from "next/router";
import LoadoutModal from "../../components/LoadoutModal";
import { trpc } from "../../utils/trpc";

const Loadout: NextPage = () => {
  // const router = useRouter();

  // const getWeapons = trpc.loadout.getLoadoutById.useQuery(
  //   "clbjj1zff0000wyzyp1c4f1s4",

  const router = useRouter();
  const profile = router.query.profile as string;
  const loadoutId = router.query.loadout;
  // console.log(loadoutId);

  const getLoadout = trpc.loadout.getLoadoutById.useQuery(loadoutId as string);

  const loaded = (getLoadout.data?.attachments as Array<any>)?.forEach(
    (loadedAttach) => {
      getLoadout.data?.Weapon.Attachments.forEach((avalAttachment) => {
        if (avalAttachment.id == loadedAttach.id) {
          loadedAttach["name"] = loadedAttach["type"];
          loadedAttach.name = avalAttachment.name;
          // console.log(loadedAttach.name);
          // console.log(avalAttachment.name);
          // console.log(loadedAttach);

          return loadedAttach;
        }
      });
    },
  );

  // console.log(getLoadout.data?.attachments);
  //* i need to make name show instead of ids for showcase but first showcase maybe id numbers only

  // console.log(loaded);
  // const allAttachments = getLoadout.data?.Weapon.Attachments.forEach(
  //   (avalAttachment) => {},
  // );

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
