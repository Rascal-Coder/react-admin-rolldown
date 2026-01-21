import authService from "@/api/services/auth-service";
import { Badge } from "@/components/base/badge";
import { Button } from "@/components/base/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import Icon from "@/components/ui/icon/icon";
import NumberTicker from "@/components/ui/number-ticker";
import { AreaGraph } from "./modules/area-graph";
import { BarGraph } from "./modules/bar-graph";
import { PieGraph } from "./modules/pie-graph";
import { RecentSales } from "./modules/recent-sales";

export default function Workbench() {
  return (
    <div className="flex flex-1 flex-col space-y-2">
      <Button onClick={() => authService.getCurrentUser()}>
        Get Current User
      </Button>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-2xl tracking-tight">
          Hi, Welcome back 👋
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
              <NumberTicker prefix="$" value={1250} />
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Icon icon="mdi:trending-up" />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month
              <Icon icon="mdi:trending-up" size={20} />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
              <NumberTicker value={1234} />
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Icon icon="mdi:trending-down" />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period
              <Icon icon="mdi:trending-down" size={20} />
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
              <NumberTicker value={45_678} />
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Icon icon="mdi:trending-up" />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention
              <Icon icon="mdi:trending-up" size={20} />
            </div>
            <div className="text-muted-foreground">
              Engagement exceed targets
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">
              <NumberTicker decimalPlaces={2} suffix="%" value={4.5} />
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Icon icon="mdi:trending-up" />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance increase{" "}
              <Icon icon="mdi:trending-up" size={20} />
            </div>
            <div className="text-muted-foreground">
              Meets growth projections
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 md:col-span-3">
          <RecentSales />
        </div>
        <div className="col-span-4">
          <BarGraph />
        </div>
        <div className="col-span-4">
          <AreaGraph />
        </div>

        <div className="col-span-4 md:col-span-3">
          <PieGraph />
        </div>
      </div>
    </div>
  );
}
