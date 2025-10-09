import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import { LocationListItem } from "@/components/locations/LocationListItem";
import LocationsFilter from "@/components/locations/LocationsFilter";
import NewLocation from "@/components/locations/NewLocation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import { useGetEntityQuery } from "@/store/api/entity";
import {
  useGetLocationQuery,
  useUpdateLocationMutation,
} from "@/store/api/location";
import {
  selectLocationsFilterSlice,
  setLocationsFilterSlice,
} from "@/store/slices";
import type {
  ActionData,
  LocationArgs,
  LocationsFilterState,
} from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Locations() {
  const dispatch = useDispatch();
  const locationsFilterState = useSelector(selectLocationsFilterSlice);

  const { data: entitiesData } = useGetEntityQuery(
    { status: "ACTIVE" },
    {
      skip: !locationsFilterState,
    }
  );
  const { data: locationsData, isFetching: isFetchingLocations } =
    useGetLocationQuery(locationsFilterState, {
      skip: !locationsFilterState,
    });
  const [updateLocation] = useUpdateLocationMutation();

  const handleOnFilterChange = useCallback(
    (partial: LocationsFilterState) => {
      dispatch(setLocationsFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnItemAction = useCallback(
    async (data: ActionData<LocationArgs>) => {
      switch (data.action) {
        case "DELETE":
          console.log(data);
          break;

        default: // EDIT
          await updateLocation(data);
          break;
      }
    },
    [updateLocation]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Entidades" />

      <LocationsFilter
        entities={entitiesData?.data}
        onFilterChange={handleOnFilterChange}
      />

      {/* new entity */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-full shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewLocation entities={entitiesData?.data} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingLocations && <ListItemSkeleton />}
        {!isFetchingLocations &&
          locationsData &&
          locationsData.data.length > 0 &&
          locationsData.data.map((item) => (
            <LocationListItem
              key={`entity-item-${item._id}`}
              location={item}
              onAction={handleOnItemAction}
            />
          ))}
        {!isFetchingLocations &&
          locationsData &&
          locationsData.data.length === 0 && <div> No data </div>}
      </div>

      <Paginator
        totalItems={locationsData?.totalItems ?? 0}
        currentPage={locationsFilterState.page ?? 1}
        itemsPerPage={locationsFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
