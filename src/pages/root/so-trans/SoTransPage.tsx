import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import NewSoTrans from "@/components/so-trans/NewSoTrans";
import SoTransFilter from "@/components/so-trans/SoTransFilter";
import { SoTransListItem } from "@/components/so-trans/SoTransListItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import { useGetCustomerQuery } from "@/store/api/customers";
import { useGetLocationQuery } from "@/store/api/location";
import { useGetSoTransQuery } from "@/store/api/so-trans";
import { useGetUsersQuery } from "@/store/api/user";
import {
  selectSoTransFilterSlice,
  setSoTransFilterSlice,
} from "@/store/slices";
import type { SoTrans, SoTransFilterState } from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function SoTransPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const soTransFilterState = useSelector(selectSoTransFilterSlice);

  const { data: locationsData } = useGetLocationQuery(
    { status: "ACTIVE", type: "SALES_FLOOR" },
    {
      skip: !soTransFilterState,
    }
  );
  const { data: usersData } = useGetUsersQuery(
    { status: "ACTIVE" },
    {
      skip: !soTransFilterState,
    }
  );
  const { data: customersData } = useGetCustomerQuery(
    { status: "ACTIVE" },
    {
      skip: !soTransFilterState,
    }
  );
  const { data: soTransData, isFetching: isFetchingSoTrans } =
    useGetSoTransQuery(soTransFilterState, {
      skip: !soTransFilterState,
    });

  const handleOnFilterChange = useCallback(
    (partial: SoTransFilterState) => {
      dispatch(setSoTransFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnNewItemCreated = useCallback(
    async (data: SoTrans) => {
      navigate(`/admin/so/${data._id}/edit`);
    },
    [navigate]
  );

  const handleOnItemTap = useCallback(
    async (data: SoTrans) => {
      navigate(`/admin/so/${data._id}/edit`);
    },
    [navigate]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Ordenes de venta" />

      <SoTransFilter
        locations={locationsData?.data ?? []}
        users={usersData?.data ?? []}
        customers={customersData?.data ?? []}
        onFilterChange={handleOnFilterChange}
      />

      {/* new soTran */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewSoTrans
              locations={locationsData?.data ?? []}
              users={usersData?.data ?? []}
              customers={customersData?.data ?? []}
              onSoTransCreated={handleOnNewItemCreated}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingSoTrans && <ListItemSkeleton />}
        {!isFetchingSoTrans &&
          soTransData &&
          soTransData.data.length > 0 &&
          soTransData.data.map((item) => (
            <SoTransListItem
              key={`po-tran-item-${item._id}`}
              soTrans={item}
              onTap={handleOnItemTap}
            />
          ))}
        {!isFetchingSoTrans && soTransData && soTransData.data.length === 0 && (
          <div> No data </div>
        )}
      </div>

      <Paginator
        totalItems={soTransData?.totalItems ?? 0}
        currentPage={soTransFilterState.page ?? 1}
        itemsPerPage={soTransFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
