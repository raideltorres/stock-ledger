import { useSelector } from "react-redux";
import { NavUser } from "../common/NavUser";
import { selectUserSlice } from "@/store/slices";

export function Navigation() {
  const userState = useSelector(selectUserSlice);

  return (
    <div className="w-full flex flex-row items-center justify-end py-2 px-3   bg-gray-200">
      <NavUser user={userState.user} />
    </div>
  );
}
