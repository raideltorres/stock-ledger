import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import EntitiesFilter from "@/components/entities/EntitiesFilter";
import { EntityListItem } from "@/components/entities/EntityListItem";
import NewEntity from "@/components/entities/NewEntity";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import { useGetEntityQuery, useUpdateEntityMutation } from "@/store/api/entity";
import {
  selectEntitiesFilterSlice,
  setEntitiesFilterSlice,
} from "@/store/slices";
import type { ActionData, EntitiesFilterState, Entity } from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Entities() {
  const dispatch = useDispatch();
  const entitiesFilterState = useSelector(selectEntitiesFilterSlice);

  const { data: entitiesData, isFetching: isFetchingEntities } =
    useGetEntityQuery(entitiesFilterState, {
      skip: !entitiesFilterState,
    });
  const [updateEntity] = useUpdateEntityMutation();

  const handleOnFilterChange = useCallback(
    (partial: EntitiesFilterState) => {
      dispatch(setEntitiesFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnItemAction = useCallback(
    async (data: ActionData<Entity>) => {
      switch (data.action) {
        case "DELETE":
          console.log(data);
          break;

        default: // EDIT
          await updateEntity(data);
          break;
      }
    },
    [updateEntity]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Entidades" />

      <EntitiesFilter onFilterChange={handleOnFilterChange} />

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
            <NewEntity />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingEntities && <ListItemSkeleton />}
        {!isFetchingEntities &&
          entitiesData &&
          entitiesData.data.length > 0 &&
          entitiesData.data.map((item) => (
            <EntityListItem
              key={`entity-item-${item._id}`}
              entity={item}
              onAction={handleOnItemAction}
            />
          ))}
        {!isFetchingEntities &&
          entitiesData &&
          entitiesData.data.length === 0 && <div> No data </div>}
      </div>

      <Paginator
        totalItems={entitiesData?.totalItems ?? 0}
        currentPage={entitiesFilterState.page ?? 1}
        itemsPerPage={entitiesFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
