import { DataTableLoading } from "~/components/Modules/DataTable/DataTableLoading";

export default function ProductsLoading() {
  return (
    <DataTableLoading
      columnCount={6}
      isNewRowCreatable={true}
      isRowsDeletable={true}
    />
  );
}
