import { type NextPage } from "next";
// import { useEffect } from "react";
// import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import CategoryTitle from "../../components/CategoryTitle";
import Footer from "../../components/Footer";
import ProfileBar from "../../components/ProfileBar";
import SmallerLoadout from "../../components/SmallerLoadout";
import { trpc } from "../../utils/trpc";

import { useRouter } from "next/router";

const Profile: NextPage = () => {
  // const getWeapons = trpc.loadout.getLoadoutById.useQuery(
  //   "clbjj1zff0000wyzyp1c4f1s4",

  const router = useRouter();
  const profile = router.query.profile as string;

  console.log(profile);
  // );
  const [profileLoadouts, setProfileLoadouts] = useState<Array<string>>([""]);
  // const [profileLoadoutsData, setProfileLoadoutsData] = useState<any>();

  const getProfile = trpc.profile.getUnqiueProfile.useQuery(profile);

  // useEffect(() => {
  //   if (getProfile.isSuccess) {
  //     setProfileLoadouts(getProfile.data?.loadouts as string[]);
  //   } else {
  //     return;
  //   }
  // }, [getProfile.isSuccess]);
  useEffect(() => {
    if (getProfile.isSuccess) {
      setProfileLoadouts(getProfile.data?.loadouts as string[]);
    } else {
      return;
    }
  }, [getProfile.isSuccess, getProfile.data]);

  const profileData = getProfile.data;

  // useEffect(() => {
  //   if (profileLoadouts != undefined) {
  //     console.log(getProfileLoadouts.data);
  //     // setProfileLoadoutsData(getProfileLoadouts.data);
  //   } else {
  //     // profileLoadouts.refetch();
  //     return;
  //   }
  // }, []);

  // console.log(profileLoadouts);

  const getProfileLoadouts =
    trpc.loadout.getProfileLoadout.useQuery(profileLoadouts);

  const profileLoadoutsData = getProfileLoadouts.data;

  console.log(profileLoadoutsData);
  // const attachmentIds: any = [];

  // const attachments: any = loadoutData?.attachments;

  // const attachmentArray = attachments.map((attachment: any) => {
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

  // // const { data: attachData } = trpc.weapons.getAttachmentById.useQuery({
  // //   id: loadout?.attachments[0].id,
  // // });

  // const attachmentNames = getAttachments.data?.map((attachment: any) => {
  //   console.log(attachment.name);
  // });

  // const loadoutName = loadoutData?.loadoutName;
  // const weaponName = loadoutData?.weaponBody;

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
    <div className="flex h-screen w-screen flex-col justify-between bg-black">
      {profileData ? (
        <ProfileBar
          imageSrc="/symfuhny.jpg"
          username={profileData.username}
          key={profileData.username}
          instagram={profileData.instagram}
          tiktok={profileData.tiktok}
          twitch={profileData.twitch}
          twitter={profileData.twitter}
          youtube={profileData.youtube}
        />
      ) : (
        <p>loading</p>
      )}
      <div className="flex flex-row gap-2">
        {profileLoadoutsData ? (
          profileLoadoutsData.map((loadout) => {
            return (
              <SmallerLoadout
                key={loadout.id}
                loadoutLink={`${profile}/${loadout.id}`}
                imageSrc="/m4.png"
                loadoutName={loadout.loadoutName}
                weaponType={loadout.Weapon.type}
                weaponBody={loadout.weaponBody}
              />
            );
          })
        ) : (
          <p>loading</p>
        )}
      </div>

      <div className="bg-red-500/10">
        <CategoryTitle
          emoji="🔥"
          title={`Other builds by ${profileData?.username}`}
        />

        <div className="flex flex-row gap-2">
          {profileLoadoutsData ? (
            profileLoadoutsData.map((loadout) => {
              return (
                <SmallerLoadout
                  key={loadout.id}
                  loadoutLink={`${profile}/${loadout.id}`}
                  imageSrc="/m4.png"
                  loadoutName={loadout.loadoutName}
                  weaponType={loadout.Weapon.type}
                  weaponBody={loadout.weaponBody}
                />
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
    // <div>
    //   <div>user :{profile}</div>
    //   <div>loadout name :{loadout?.loadoutName}</div>
    //   <div>weapon :{loadout?.weaponBody}</div>
    //   <div>atatchments :{attachmentNames}</div>
    // </div>
  );
};

export default Profile;
