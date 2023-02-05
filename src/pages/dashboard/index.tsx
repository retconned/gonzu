import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="bg-neutral-900">
      <NavBar />
      <div className="h-screen">
        <SideNavigation />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

const SideNavigation = () => {
  return (
    <div className="flex h-full w-60 flex-col items-center gap-4 bg-neutral-800/50 px-8 py-2 text-white">
      <p className="mt-3 text-neutral-200">Navigation</p>
      <div className="h-0.5 w-full rounded-full bg-lime-500" />
      <Link href={"/dashboard/builder"}>
        <button className="w-40 rounded-md bg-neutral-800 px-4 py-2 text-center duration-150 hover:bg-neutral-700">
          Builder
        </button>
      </Link>
      <Link href={"/dashboard/editor"}>
        <button className="w-40 rounded-md bg-neutral-800 px-4 py-2 text-center duration-150 hover:bg-neutral-700">
          Editor
        </button>
      </Link>
    </div>
  );
};
