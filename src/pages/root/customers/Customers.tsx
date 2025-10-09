import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import { PageHeader } from "@/components/common/PageHeader";
import { Paginator } from "@/components/common/Paginator";
import { CustomerListItem } from "@/components/customers/CustomerListItem";
import CustomersFilter from "@/components/customers/CustomersFilter";
import NewCustomer from "@/components/customers/NewCustomer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROWS_PER_PAGE } from "@/constants";
import {
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} from "@/store/api/customers";
import {
  selectCustomersFilterSlice,
  setCustomersFilterSlice,
} from "@/store/slices";
import type {
  ActionData,
  CustomerArgs,
  CustomersFilterState,
} from "@/utils/types";
import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Customers() {
  const dispatch = useDispatch();
  const customersFilterState = useSelector(selectCustomersFilterSlice);

  const { data: customersData, isFetching: isFetchingCustomers } =
    useGetCustomerQuery(customersFilterState, {
      skip: !customersFilterState,
    });
  const [updateCustomer] = useUpdateCustomerMutation();

  const handleOnFilterChange = useCallback(
    (partial: CustomersFilterState) => {
      dispatch(setCustomersFilterSlice(partial));
    },
    [dispatch]
  );

  const handleOnItemAction = useCallback(
    async (data: ActionData<CustomerArgs>) => {
      switch (data.action) {
        case "DELETE":
          console.log(data);
          break;

        default: // EDIT
          await updateCustomer(data);
          break;
      }
    },
    [updateCustomer]
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-3 p-3">
      <PageHeader text="Clientes" />

      <CustomersFilter onFilterChange={handleOnFilterChange} />

      {/* new customer */}
      <div className="w-full flex flex-row items-center justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <PlusSquare
              size={36}
              className="bg-gray-300 p-1 border rounded-full shadow cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent>
            <NewCustomer />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full flex flex-1 flex-col gap-2">
        {isFetchingCustomers && <ListItemSkeleton />}
        {!isFetchingCustomers &&
          customersData &&
          customersData.data.length > 0 &&
          customersData.data.map((item) => (
            <CustomerListItem
              key={`customer-item-${item._id}`}
              customer={item}
              onAction={handleOnItemAction}
            />
          ))}
        {!isFetchingCustomers &&
          customersData &&
          customersData.data.length === 0 && <div> No data </div>}
      </div>

      <Paginator
        totalItems={customersData?.totalItems ?? 0}
        currentPage={customersFilterState.page ?? 1}
        itemsPerPage={customersFilterState.limit ?? ROWS_PER_PAGE}
        onPageChange={handleOnFilterChange}
        onItemsPerPageChange={handleOnFilterChange}
      />
    </div>
  );
}
