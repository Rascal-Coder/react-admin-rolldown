import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Skeleton } from "@/components/base/skeleton";
import { sleep } from "@/utils";

const salesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/1.png",
    fallback: "OM",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/2.png",
    fallback: "JL",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/3.png",
    fallback: "IN",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/4.png",
    fallback: "WK",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "https://api.slingacademy.com/public/sample-users/5.png",
    fallback: "SD",
    amount: "+$39.00",
  },
];

export function RecentSales() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    sleep(1000).then(() => {
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <RecentSalesSkeleton />
  ) : (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {salesData.map((sale, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: false
            <div className="flex items-center" key={index}>
              <Avatar className="h-9 w-9">
                <AvatarImage alt="Avatar" src={sale.avatar} />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="font-medium text-sm leading-none">{sale.name}</p>
                <p className="text-muted-foreground text-sm">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentSalesSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[140px]" /> {/* CardTitle */}
        <Skeleton className="h-4 w-[180px]" /> {/* CardDescription */}
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: false
            <div className="flex items-center" key={i}>
              <Skeleton className="h-9 w-9 rounded-full" /> {/* Avatar */}
              <div className="ml-4 space-y-1">
                <Skeleton className="h-4 w-[120px]" /> {/* Name */}
                <Skeleton className="h-4 w-[160px]" /> {/* Email */}
              </div>
              <Skeleton className="ml-auto h-4 w-[80px]" /> {/* Amount */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
