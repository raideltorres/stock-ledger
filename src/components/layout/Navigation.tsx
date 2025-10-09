import { useSelector } from "react-redux";
import { NavUser } from "../common/NavUser";
import { selectUserSlice } from "@/store/slices";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navigation() {
  const userState = useSelector(selectUserSlice);

  return (
    <div className="w-full flex flex-row items-center justify-between py-2 px-3 bg-gray-200">
      <div>
        {userState.user.role === "USER" && (
          <div className="flex flex-row gap-2">
            <Link to={"/sales"}>
              <Button>Ventas</Button>
            </Link>

            <Link to={"/purchases"}>
              <Button>Compras</Button>
            </Link>
          </div>
        )}
      </div>

      <NavUser user={userState.user} />
    </div>
  );
}
