import { type NextPage } from "next";
import Head from "next/head";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const { profile } = useRouter().query;

  //const asdjflksadjfklas = trpc.dsfs.dsafsd.useQuery({data: profile})

  return <div>{profile}</div>;
};

export default Profile;
