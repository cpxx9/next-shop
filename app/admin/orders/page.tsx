import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { formatCurrency, formatDateTime, shortenUuid } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Orders",
};

interface PropTypes {
  searchParams: Promise<{ page: string }>;
}

const AdminOrdersPage = async ({ searchParams }: PropTypes) => {
  await requireAdmin();

  const { page = "1" } = await searchParams;
  const orders = await getAllOrders({ page: Number(page) });

  return (
    <div className="space-y-2 flex-1">
      <h2 className="h2-bold">Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{shortenUuid(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? (
                    <Badge>{formatDateTime(order.paidAt).dateOnly}</Badge>
                  ) : (
                    <Badge variant="destructive">Not Paid</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt ? (
                    <p>{formatDateTime(order.deliveredAt).dateTime}</p>
                  ) : (
                    <Badge variant="destructive">Not Delivered</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 ? (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        ) : (
          <p className="text-muted-foreground">Displaying all results...</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
