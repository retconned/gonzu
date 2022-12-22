// useQuery.js
import { useRouter } from "next/router";

// Resolves query or returns null
export default function useQuery() {
  const router = useRouter();
  const ready = router.asPath !== router.route;
  if (!ready) return null;
  return router.query;
}
