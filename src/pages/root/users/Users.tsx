import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/paginator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NewUser from "@/components/users/NewUser";
import { UserListItem } from "@/components/users/UserListItem";
import UsersFilter from "@/components/users/UsersFilter";
import { ROWS_PER_PAGE } from "@/constants";
import { useGetUsersQuery, useUpdateUserMutation } from "@/store/api/user";
import { selectUsersFilterSlice, setUsersFilterSlice } from "@/store/slices";
import type { ActionData, User, UsersFilterState } from "@/utils/types";
import { UserPlus } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Users() {
  const dispatch = useDispatch();
  const usersFilterState = useSelector(selectUsersFilterSlice);

  const { data: usersData, isFetching: isFetchingUsers } = useGetUsersQuery(
    usersFilterState,
    {
      skip: !usersFilterState,
    }
  );
  const [updateUser] = useUpdateUserMutation();

  const handleOnFilterChange = useCallback(
    (partial: UsersFilterState) => {
      dispatch(setUsersFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnItemAction = useCallback(
    async (data: ActionData<User>) => {
      switch (data.action) {
        case "DELETE":
          console.log(data);
          break;

        default: // EDIT
          await updateUser(data);
          break;
      }
    },
    [updateUser]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Usuarios" />

      <UsersFilter onFilterChange={handleOnFilterChange} />

      {/* new user */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <UserPlus
              size={36}
              className="bg-gray-300 p-1 border rounded-full shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewUser />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingUsers && <ListItemSkeleton />}
        {!isFetchingUsers &&
          usersData &&
          usersData.data.length > 0 &&
          usersData.data.map((item) => (
            <UserListItem
              key={`user-item-${item._id}`}
              user={item}
              onAction={handleOnItemAction}
            />
          ))}
        {!isFetchingUsers && usersData && usersData.data.length === 0 && (
          <div> No data </div>
        )}
      </div>

      <Paginator
        totalItems={usersData?.totalItems ?? 0}
        currentPage={usersFilterState.page ?? 1}
        itemsPerPage={usersFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
