import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import NewPoTrans from "@/components/po-trans/NewPoTrans";
import PoTransFilter from "@/components/po-trans/PoTransFilter";
import { PoTransListItem } from "@/components/po-trans/PoTransListItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import { useGetLocationQuery } from "@/store/api/location";
import { useGetPoTransQuery } from "@/store/api/po-trans";
import { useGetProviderQuery } from "@/store/api/providers";
import { useGetUsersQuery } from "@/store/api/user";
import {
  selectPoTransFilterSlice,
  setPoTransFilterSlice,
} from "@/store/slices";
import type { PoTrans, PoTransFilterState } from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PoTransPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const poTransFilterState = useSelector(selectPoTransFilterSlice);

  const { data: locationsData } = useGetLocationQuery(
    { status: "ACTIVE" },
    {
      skip: !poTransFilterState,
    }
  );
  const { data: usersData } = useGetUsersQuery(
    { status: "ACTIVE" },
    {
      skip: !poTransFilterState,
    }
  );
  const { data: providersData } = useGetProviderQuery(
    { status: "ACTIVE" },
    {
      skip: !poTransFilterState,
    }
  );
  const { data: poTransData, isFetching: isFetchingPoTrans } =
    useGetPoTransQuery(poTransFilterState, {
      skip: !poTransFilterState,
    });

  const handleOnFilterChange = useCallback(
    (partial: PoTransFilterState) => {
      dispatch(setPoTransFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnNewItemCreated = useCallback(
    async (data: PoTrans) => {
      navigate(`/admin/po/${data._id}/edit`);
    },
    [navigate]
  );

  const handleOnItemTap = useCallback(
    async (data: PoTrans) => {
      navigate(`/admin/po/${data._id}/edit`);
    },
    [navigate]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Ordenes de compra" />

      <PoTransFilter
        locations={locationsData?.data ?? []}
        users={usersData?.data ?? []}
        providers={providersData?.data ?? []}
        onFilterChange={handleOnFilterChange}
      />

      {/* new poTran */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewPoTrans
              locations={locationsData?.data ?? []}
              users={usersData?.data ?? []}
              providers={providersData?.data ?? []}
              onPoTransCreated={handleOnNewItemCreated}
            />
          </PopoverContent>
        </Popover>
      </div>

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

      <Paginator
        totalItems={poTransData?.totalItems ?? 0}
        currentPage={poTransFilterState.page ?? 1}
        itemsPerPage={poTransFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
