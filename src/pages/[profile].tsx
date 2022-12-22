import { type NextPage } from "next";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
// import { useEffect, useState } from "react";
// import { trpc } from "../utils/trpc";

const Profile: NextPage = () => {
  const profile = "str3";

  const { data: profileData } = trpc.profile.getUnqiueProfile.useQuery(profile);
  // console.log(profileData);

  const getLoadoutId = profileData?.loadouts?.toString();

  console.log(getLoadoutId);

  const { data: loadoutData } = trpc.loadout.getLoadoutById.useQuery(
    getLoadoutId as string,
  );

  const attachmentIds: any = [];

  const attachments: any = loadoutData?.attachments;

  const attachmentArray = attachments.map((attachment: any) => {
    attachmentIds.push(attachment.id);
  });

  const getAttachments = trpc.weapons.getAttachments.useQuery(attachmentIds, {
    enabled: false,
  });

  useEffect(() => {
    if (attachmentIds.length >= 1) {
      getAttachments.refetch();
    }
  }, [attachmentIds]);

  // const { data: attachData } = trpc.weapons.getAttachmentById.useQuery({
  //   id: loadout?.attachments[0].id,
  // });

  const attachmentNames = getAttachments.data?.map((attachment: any) => {
    console.log(attachment.name);
  });

  const loadoutName = loadoutData?.loadoutName;
  const weaponName = loadoutData?.weaponBody;

  // /////////////////////////////////////////////////////

  // const { profile } = useRouter().query;

  // const { data: profiles } = trpc.profile.getAllProfiles.useQuery();

  // // this needs to be fixed cause it first says undefined fro profile
  // const { data: profileData } = trpc.profile.getUnqiueProfile.useQuery(profile);
  // console.log(profileData);

  // const { data: loadout } = trpc.loadout.getLoadoutById.useQuery(
  //   /// possibly null error
  //   profileData.data?.loadouts[0],
  // );

  // const attachmentIds: any = [];

  // const grabAttachments = loadout?.attachments.map((attachment: any) => {
  //   attachmentIds.push(attachment.id);
  // });

  // const getAttachments = trpc.weapons.getAttachments.useQuery(attachmentIds, {
  //   enabled: false,
  // });

  // useEffect(() => {
  //   if (attachmentIds.length >= 1) {
  //     getAttachments.refetch();
  //   }
  // }, [attachmentIds]);

  // const { data: attachData } = trpc.weapons.getAttachmentById.useQuery({
  //   id: loadout?.attachments[0].id,
  // });

  // const attachmentNames = getAttachments.data?.map((attachment: any) => {
  //   console.log(attachment.name);
  //   return (
  //     <ul key={attachment.id} className="flex flex-row">
  //       <li>
  //         {attachment.slot} : {attachment.name}
  //       </li>
  //     </ul>
  //   );
  // });
  return (
    <div></div>
    // <div>
    //   <div>user :{profile}</div>
    //   <div>loadout name :{loadout?.loadoutName}</div>
    //   <div>weapon :{loadout?.weaponBody}</div>
    //   <div>atatchments :{attachmentNames}</div>
    // </div>
  );
};

export default Profile;
