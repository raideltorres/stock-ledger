import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import { ProviderListItem } from "@/components/providers/ProviderListItem";
import ProvidersFilter from "@/components/providers/ProvidersFilter";
import NewProvider from "@/components/providers/NewProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import {
  useGetProviderQuery,
  useUpdateProviderMutation,
} from "@/store/api/providers";
import {
  selectProvidersFilterSlice,
  setProvidersFilterSlice,
} from "@/store/slices";
import type {
  ActionData,
  ProviderArgs,
  ProvidersFilterState,
} from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Providers() {
  const dispatch = useDispatch();
  const providersFilterState = useSelector(selectProvidersFilterSlice);

  const { data: providersData, isFetching: isFetchingProviders } =
    useGetProviderQuery(providersFilterState, {
      skip: !providersFilterState,
    });
  const [updateProvider] = useUpdateProviderMutation();

  const handleOnFilterChange = useCallback(
    (partial: ProvidersFilterState) => {
      dispatch(setProvidersFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnItemAction = useCallback(
    async (data: ActionData<ProviderArgs>) => {
      switch (data.action) {
        case "DELETE":
          console.log(data);
          break;

        default: // EDIT
          await updateProvider(data);
          break;
      }
    },
    [updateProvider]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Proveedor" />

      <ProvidersFilter onFilterChange={handleOnFilterChange} />

      {/* new provider */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-full shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewProvider />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingProviders && <ListItemSkeleton />}
        {!isFetchingProviders &&
          providersData &&
          providersData.data.length > 0 &&
          providersData.data.map((item) => (
            <ProviderListItem
              key={`provider-item-${item._id}`}
              provider={item}
              onAction={handleOnItemAction}
            />
          ))}
        {!isFetchingProviders &&
          providersData &&
          providersData.data.length === 0 && <div> No data </div>}
      </div>

      <Paginator
        totalItems={providersData?.totalItems ?? 0}
        currentPage={providersFilterState.page ?? 1}
        itemsPerPage={providersFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
