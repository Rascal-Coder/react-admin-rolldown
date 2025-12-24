import { Github, HelpCircle, Lock, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import { useRouterNavigation } from "@/hooks/use-router";
import { useUserActions } from "@/store/user-store";
import type { UserProps } from "@/types/user";

export function ProfileDropdown({ user }: UserProps) {
  const { clearUserInfoAndToken } = useUserActions();
  const { replace, push } = useRouterNavigation();
  const logout = () => {
    try {
      clearUserInfoAndToken();
      push("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      replace("/auth/login");
    }
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full" variant="ghost">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback className="rounded-lg">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage alt={user.name} src={user.avatar} />
              <AvatarFallback className="rounded-lg">SN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Lock />
            锁定屏幕
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            个人中心
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Github />
            Github
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle />
            问题和帮助
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
