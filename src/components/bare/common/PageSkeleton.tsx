import { Skeleton } from "~/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div class="w-full h-full flex gap-6 flex-col p-6 mt-12">
      <Skeleton height={16} radius={6} width={220} />
      <Skeleton height={16} radius={6} width={220} />

      <Skeleton height={16} radius={6} />
      <Skeleton height={16} radius={6} />
      <Skeleton height={16} radius={6} />
      <Skeleton height={16} radius={6} />
      <Skeleton height={16} radius={6} />
      <Skeleton height={16} radius={6} />
    </div>
  );
}
