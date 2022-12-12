import { type NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const { profile } = useRouter().query;

  //const asdjflksadjfklas = trpc.dsfs.dsafsd.useQuery({data: profile})

  return <div>{profile}</div>;
};

export default Profile;
