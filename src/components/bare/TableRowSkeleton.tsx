import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export default function TableRowSkeleton() {
  return (
    <>
      <TableRow>
        <TableCell colspan={5}>
          <Skeleton height={16} radius={10} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colspan={5}>
          <Skeleton height={16} radius={10} />
        </TableCell>
      </TableRow>
    </>
  );
}
