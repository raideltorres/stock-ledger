import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import PoTransFilter from "@/components/po-trans/PoTransFilter";
import { PoTransListItem } from "@/components/po-trans/PoTransListItem";
import NewPurchaseOrder from "@/components/purchases/NewPurchaseOrder";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetLocationQuery } from "@/store/api/location";
import { useGetPoTransQuery } from "@/store/api/po-trans";
import { useGetProviderQuery } from "@/store/api/providers";
import {
  selectPoTransFilterSlice,
  selectUserSlice,
  setPoTransFilterSlice,
} from "@/store/slices";
import type { PoTrans, PoTransFilterState } from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Purchases() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(selectUserSlice);
  const poTransFilterState = useSelector(selectPoTransFilterSlice);

  const { data: locationsData } = useGetLocationQuery(
    { status: "ACTIVE" },
    {
      skip: !userState,
    }
  );
  const { data: providersData } = useGetProviderQuery(
    { status: "ACTIVE" },
    {
      skip: !userState,
    }
  );
  const { data: poTransData, isFetching: isFetchingPoTrans } =
    useGetPoTransQuery(poTransFilterState, {
      skip: !userState.user,
    });

  const handleOnFilterChange = useCallback(
    (partial: PoTransFilterState) => {
      dispatch(setPoTransFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnNewPurchase = useCallback(
    async (data: PoTrans) => {
      navigate(`/purchase/${data._id}/edit`);
    },
    [navigate]
  );

  const handleOnItemTap = useCallback(
    async (data: PoTrans) => {
      navigate(`/purchase/${data._id}/edit`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(setPoTransFilterSlice({ user: userState.user._id }));
  }, [dispatch, userState.user._id]);

  return (
    <div className="w-full flex flex-col py-1 px-3 gap-3">
      <PageHeader text="Compras" />

      {/* new purchase */}
      <div className="w-full flex flex-row items-center justify-end -mt-10">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewPurchaseOrder
              locations={locationsData?.data ?? []}
              user={userState.user}
              providers={providersData?.data ?? []}
              onPoTransCreated={handleOnNewPurchase}
            />
          </PopoverContent>
        </Popover>
      </div>

      <PoTransFilter
        locations={locationsData?.data ?? []}
        providers={providersData?.data ?? []}
        onFilterChange={handleOnFilterChange}
      />

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingPoTrans && <ListItemSkeleton />}
        {!isFetchingPoTrans &&
          poTransData &&
          poTransData.data.length > 0 &&
          poTransData.data.map((item) => (
            <PoTransListItem
              key={`po-tran-item-${item._id}`}
              poTrans={item}
              onTap={handleOnItemTap}
            />
          ))}
        {!isFetchingPoTrans && poTransData && poTransData.data.length === 0 && (
          <div> No data </div>
        )}
      </div>
    </div>
  );
}
