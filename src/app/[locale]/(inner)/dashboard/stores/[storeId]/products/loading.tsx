import { DataTableLoading } from "~/islands/modules/data-table/data-table-loading";

export default function ProductsLoading() {
  return (
    <DataTableLoading
      columnCount={6}
      isNewRowCreatable={true}
      isRowsDeletable={true}
    />
  );
}
