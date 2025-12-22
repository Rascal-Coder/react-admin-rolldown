import { faker } from "@faker-js/faker";
import { Bell } from "lucide-react";
import { type CSSProperties, useState } from "react";
import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { Avatar, AvatarImage } from "@/components/base/avatar";
import { Badge } from "@/components/base/badge";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/base/sheet";
import { Text } from "@/components/base/typography";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/animated-tabs";
import { AvatarGroup } from "@/components/ui/avatar-group";
import Icon from "@/components/ui/icon/icon";
import type {
  ArtworkInfo,
  FileInfo,
  FileNotification,
  MeetingNotification,
  Notification,
  TaskNotification,
  UploadNotification,
  UserRequestNotification,
} from "./types";

const NOTIFICATION_ACTION_CONFIG = {
  access: { accept: "Accept", decline: "Decline" },
  user_request: { accept: "Accept", decline: "Decline" },
  meeting: { accept: "Accept", decline: "Decline" },
  upgrade: { accept: "Accept", decline: "Decline" },
  invitation: { accept: "Accept", decline: "Decline" },
  edit_request: { accept: "Accept", decline: "Decline" },
} as const;

const getActionButtonText = (
  type: string,
  action: "accept" | "decline"
): string => {
  const config =
    NOTIFICATION_ACTION_CONFIG[type as keyof typeof NOTIFICATION_ACTION_CONFIG];
  return config?.[action] || (action === "accept" ? "Accept" : "Decline");
};

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [count, setCount] = useState(4);

  const style: CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50%, 50%",
  };

  return (
    <>
      <div className="relative">
        <Button
          className="bell-button rounded-full"
          onClick={() => setDrawerOpen(true)}
          size="icon"
          variant="ghost"
        >
          <Bell />
        </Button>
        <Badge
          className="absolute -top-2 -right-2"
          shape="circle"
          variant="destructive"
        >
          {count}
        </Badge>
      </div>
      <Sheet onOpenChange={setDrawerOpen} open={drawerOpen}>
        <SheetContent
          className="flex flex-col p-0 sm:max-w-md [&>button]:hidden"
          side="right"
          style={style}
        >
          <SheetHeader className="flex h-16 shrink-0 flex-row items-center justify-between p-4">
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription />
            <Button
              className="rounded-full text-primary"
              onClick={() => {
                setCount(0);
                setDrawerOpen(false);
              }}
              size="icon"
              variant="ghost"
            >
              <Icon icon="solar:check-read-broken" size={20} />
            </Button>
          </SheetHeader>
          <div className="flex-1 overflow-hidden px-4">
            <NoticeTab />
          </div>
          <SheetFooter className="flex h-16 w-full shrink-0 flex-row items-center justify-between p-4">
            <Button className="mr-2 flex-1" variant="outline">
              Archive all
            </Button>
            <Button className="ml-2 flex-1">Mark all as read</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

// 获取文件图标
const getFileIcon = (type: string) => {
  switch (type) {
    case "ppt":
      return "local:file-ppt";
    case "excel":
      return "local:file-excel";
    case "word":
      return "local:file-word";
    case "svg":
      return "local:file-img";
    case "figma":
      return "local:file-psd";
    default:
      return "local:file";
  }
};

// 获取标签颜色
const getTagColor = (tag: string) => {
  switch (tag) {
    case "Client-Request":
      return "bg-purple-100 text-purple-700";
    case "Figma":
      return "bg-orange-100 text-orange-700";
    case "Redesign":
      return "bg-gray-100 text-gray-700";
    case "Improvement":
      return "bg-green-100 text-green-700";
    case "Bug":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// 组件：通知头像
function NotificationAvatar({ notification }: { notification: Notification }) {
  if (notification.hasAvatar) {
    return (
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-neutral font-medium text-sm">
          CH
        </div>
        <div className="absolute -right-1 bottom-1 h-2 w-2 rounded-full border-2 bg-green-500" />
      </div>
    );
  }

  if (notification.isSuccess) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-neutral">
        <Badge shape="circle" variant="success">
          <Icon icon="solar:check-circle-bold" size={20} />
        </Badge>
      </div>
    );
  }

  return null;
}

// 组件：通知标题
function NotificationHeader({ notification }: { notification: Notification }) {
  if (notification.type === "success") {
    return <Text>{notification.message}</Text>;
  }

  if ("user" in notification) {
    return (
      <Text variant="subTitle2">
        <Text variant="subTitle2">{notification.user}</Text>
        <Text color="secondary" variant="subTitle2">
          {notification.action}{" "}
        </Text>
        {"target" in notification && notification.target && (
          <Text color="primary" variant="subTitle2">
            {notification.target}
          </Text>
        )}
        {"targetType" in notification && notification.targetType && (
          <Text color="secondary" variant="subTitle2">
            {notification.targetType}
          </Text>
        )}
        {"targetDate" in notification && notification.targetDate && (
          <Text color="secondary" variant="subTitle2">
            to {notification.targetDate}
          </Text>
        )}
      </Text>
    );
  }

  return null;
}

// 组件：用户请求
function NotificationUserRequest({
  notification,
}: {
  notification: UserRequestNotification;
}) {
  return (
    <div className="mt-3 rounded-lg bg-bg-neutral p-3">
      <div className="flex items-center justify-between">
        <div>
          <Text variant="subTitle2">{notification.userName}</Text>
          <Text color="secondary" variant="caption">
            {notification.userEmail}
          </Text>
        </div>
        <Button size="sm" variant="outline">
          Go to profile
        </Button>
      </div>
    </div>
  );
}

// 组件：会议通知
function NotificationMeeting({
  notification,
}: {
  notification: MeetingNotification;
}) {
  return (
    <div className="mt-3 rounded-lg bg-bg-neutral p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <Badge variant="warning">
                {notification.meetingDate.split(" ")[0]}
              </Badge>
              <div className="mt-1 font-bold text-lg">
                <Text variant="subTitle2">
                  {notification.meetingDate.split(" ")[1]}
                </Text>
              </div>
            </div>
            <div className="flex flex-col">
              <Text variant="subTitle2">{notification.meetingTitle}</Text>
              <Text color="secondary" variant="caption">
                {notification.meetingTime}
              </Text>
            </div>
          </div>
        </div>
        <AvatarGroup max={{ count: 4 }} size="small">
          {Array.from({ length: notification.attendees }).map((_, i) => (
            <Avatar key={`attendee-${notification.id}-${i}`}>
              <AvatarImage src={faker.image.avatarGitHub()} />
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

// 组件：单个文件
function NotificationFile({
  notification,
}: {
  notification: FileNotification;
}) {
  return (
    <div className="mt-3 flex items-center space-x-3 rounded-lg bg-bg-neutral p-3">
      <Icon icon={getFileIcon(notification.fileType)} size={32} />
      <div className="flex-1">
        <Text variant="subTitle2">{notification.fileName}</Text>
        <Text color="secondary" variant="caption">
          {notification.fileSize}
          {notification.editedTime && ` • Edited ${notification.editedTime}`}
        </Text>
      </div>
      <Button size="sm" variant="outline">
        <Icon icon="solar:download-linear" size={16} />
      </Button>
    </div>
  );
}

// 组件：多个文件
function NotificationFiles({
  notification,
}: {
  notification: UploadNotification;
}) {
  return (
    <div className="mt-3 space-y-2">
      {notification.files.map((file: FileInfo) => (
        <div
          className="flex items-center space-x-3 rounded-lg bg-bg-neutral p-3"
          key={file.name}
        >
          <Icon icon={getFileIcon(file.type)} size={32} />
          <div className="flex-1">
            <Text variant="subTitle2">{file.name}</Text>
            <Text color="secondary" variant="caption">
              {file.size}
            </Text>
          </div>
          <Button size="sm" variant="outline">
            <Icon icon="solar:download-linear" size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}

// 组件：任务
function NotificationTask({
  notification,
}: {
  notification: TaskNotification;
}) {
  return (
    <div className="mt-3 rounded-lg bg-bg-neutral p-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Text variant="subTitle2">{notification.taskTitle}</Text>
          <Text color="secondary" variant="caption">
            Due Date: {notification.dueDate}
          </Text>
          <div className="mt-2 flex items-center space-x-2">
            {notification.tags?.map((tag: string) => (
              <span
                className={`rounded px-2 py-1 text-xs ${getTagColor(tag)}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex -space-x-2">
          {Array.from({ length: notification.assignees }).map((_, i) => (
            <div
              className="h-6 w-6 rounded-full border-2 bg-bg-neutral"
              key={`assignee-${notification.id}-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 组件：操作按钮
function NotificationActions({ notification }: { notification: Notification }) {
  return (
    <div className="mt-3 flex space-x-2">
      <Button size="sm">
        {getActionButtonText(notification.type, "accept")}
      </Button>
      <Button size="sm" variant="outline">
        {getActionButtonText(notification.type, "decline")}
      </Button>
    </div>
  );
}

// 主渲染函数
function renderNotification(notification: Notification) {
  return (
    <div
      className="flex items-start space-x-3 border-border border-b py-4 last:border-b-0"
      key={notification.id}
    >
      <NotificationAvatar notification={notification} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <NotificationHeader notification={notification} />
            <div className="mt-1 flex items-center space-x-2">
              <Text color="secondary" variant="subTitle2">
                {notification.time}
              </Text>
              {notification.department && (
                <>
                  <Text color="secondary" variant="caption">
                    •
                  </Text>
                  <Text color="secondary" variant="caption">
                    {notification.department}
                  </Text>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {"message" in notification &&
          notification.message &&
          notification.type !== "success" && (
            <div className="mt-3 rounded-lg bg-bg-neutral p-3">
              <Text variant="caption">{notification.message}</Text>
            </div>
          )}

        {/* User Request */}
        {notification.type === "user_request" && (
          <NotificationUserRequest notification={notification} />
        )}

        {/* Meeting */}
        {notification.type === "meeting" && (
          <NotificationMeeting notification={notification} />
        )}

        {/* File */}
        {"fileName" in notification && notification.fileName && (
          <NotificationFile notification={notification as FileNotification} />
        )}

        {/* Multiple Files */}
        {"files" in notification && notification.files && (
          <NotificationFiles
            notification={notification as UploadNotification}
          />
        )}

        {/* Artworks */}
        {"artworks" in notification && notification.artworks && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {notification.artworks.map((artwork: ArtworkInfo) => (
              <div className="relative" key={artwork.id}>
                <div className="aspect-video rounded-lg bg-linear-to-br from-purple-400 to-pink-400" />
                <div className="mt-2">
                  <Text variant="subTitle2">{artwork.title}</Text>
                  <Text color="secondary" variant="caption">
                    Token ID: {artwork.id}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {"tags" in notification && notification.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {notification.tags.map((tag: string) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Task */}
        {"taskTitle" in notification && notification.taskTitle && (
          <NotificationTask notification={notification as TaskNotification} />
        )}

        {/* Actions */}
        {"hasActions" in notification && notification.hasActions && (
          <NotificationActions notification={notification} />
        )}

        {/* Reply */}
        {"hasReply" in notification && notification.hasReply && (
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <Input placeholder="Reply" />
              <Button size="sm" variant="ghost">
                <Icon icon="solar:gallery-linear" size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NoticeTab() {
  const allNotifications: Notification[] = [
    {
      id: 1,
      type: "mention" as const,
      user: "Joe Lincoln",
      action: "mentioned you in",
      target: "Latest Trends",
      targetType: "topic",
      time: "18 mins ago",
      department: "Web Design 2024",
      message:
        "@Cody For an expert opinion, check out what Mike has to say on this topic!",
      hasReply: true,
      hasAvatar: true,
    },
    {
      id: 2,
      type: "tags" as const,
      user: "Leslie Alexander",
      action: "added new tags to",
      target: "Web Redesign 2024",
      time: "53 mins ago",
      department: "ACME",
      tags: ["Client-Request", "Figma", "Redesign"],
      hasAvatar: true,
    },
    {
      id: 3,
      type: "access" as const,
      user: "Guy Hawkins",
      action: "requested access to",
      target: "AirSpace",
      targetType: "project",
      time: "14 hours ago",
      department: "Dev Team",
      hasActions: true,
      hasAvatar: true,
    },
    {
      id: 4,
      type: "file",
      user: "Jane Perez",
      action: "invites you to review a file.",
      time: "3 hours ago",
      fileSize: "742kb",
      fileName: "Launch_nov24.pptx",
      fileType: "ppt",
      editedTime: "39 mins ago",
      hasAvatar: true,
    },
    {
      id: 5,
      type: "article",
      user: "Raymond Pawell",
      action: "posted a new article",
      target: "2024 Roadmap",
      time: "1 hour ago",
      department: "Roadmap",
      hasAvatar: true,
    },
    {
      id: 6,
      type: "project" as const,
      user: "Tyler Hero",
      action: "wants to view your design project",
      time: "3 day ago",
      department: "Metronic Launcher mockups",
      fileName: "Launcher-UIkit.fig",
      fileSize: "3.2 MB",
      fileType: "figma",
      editedTime: "2 mins ago",
      hasAvatar: true,
    },
    {
      id: 7,
      type: "artwork" as const,
      user: "Emma Wilson",
      action: "shared NFT artworks with you",
      time: "4 days ago",
      department: "Digital Art Gallery",
      artworks: [
        { id: "0x7f8a9b", title: "Cosmic Dreams #001" },
        { id: "0x3e5c2d", title: "Digital Sunrise #042" },
        { id: "0x9a1f4e", title: "Abstract Vision #128" },
        { id: "0x6b8d3c", title: "Neon Waves #256" },
      ],
      hasAvatar: true,
    },
  ];

  const inboxNotifications: Notification[] = [
    {
      id: 1,
      type: "user_request" as const,
      user: "Samuel Lee",
      action: "requested to add user to",
      target: "TechSynergy",
      time: "22 hours ago",
      department: "Dev Team",
      userEmail: "ronald.richards@gmail.com",
      userName: "Ronald Richards",
      hasActions: true,
      hasAvatar: true,
    },
    {
      id: 2,
      type: "success" as const,
      message: "You have successfully verified your account",
      time: "2 days ago",
      isSuccess: true,
    },
    {
      id: 3,
      type: "file",
      user: "Ava Peterson",
      action: "uploaded attachment",
      time: "3 days ago",
      department: "ACME",
      fileName: "Redesign-2024.xls",
      fileSize: "2.6 MB",
      fileType: "excel",
      hasAvatar: true,
    },
    {
      id: 4,
      type: "task",
      user: "Ethan Parker",
      action: "created a new tasks to",
      target: "Site Sculpt",
      targetType: "project",
      time: "3 days ago",
      department: "Web Designer",
      taskTitle: "Location history is erased after Logging In",
      dueDate: "15 May, 2024",
      tags: ["Improvement", "Bug"],
      assignees: 2,
      hasAvatar: true,
    },
    {
      id: 5,
      type: "upgrade" as const,
      user: "Benjamin Harris",
      action: "requested to upgrade plan",
      time: "4 days ago",
      department: "Marketing",
      hasActions: true,
      hasAvatar: true,
    },
    {
      id: 6,
      type: "mention" as const,
      user: "Isaac Morgan",
      action: "mentioned you in",
      target: "Data Transmission",
      targetType: "topic",
      time: "6 days ago",
      department: "Dev Team",
      hasAvatar: true,
    },
  ];

  const teamNotifications: Notification[] = [
    {
      id: 1,
      type: "meeting",
      user: "Nova Hawthorne",
      action: "sent you an meeting invitation",
      time: "2 days ago",
      department: "Dev Team",
      meetingTitle: "Preparation For Release",
      meetingTime: "9:00 PM - 10:00 PM",
      meetingDate: "Apr 12",
      attendees: 7,
      hasActions: true,
      hasAvatar: true,
    },
    {
      id: 2,
      type: "article" as const,
      user: "Adrian Vale",
      action: "posted a new article",
      target: "Marketing",
      targetDate: "13 May",
      time: "2 days ago",
      department: "Marketing",
      hasAvatar: true,
    },
    {
      id: 3,
      type: "upload" as const,
      user: "Skylar Frost",
      action: "uploaded 2 attachments",
      time: "3 days ago",
      department: "Web Design",
      files: [
        { name: "Landing-page.docx", size: "1.9 MB", type: "word" },
        { name: "New-icon.svg", size: "2.3 MB", type: "svg" },
      ],
      hasAvatar: true,
    },
    {
      id: 4,
      type: "comment" as const,
      user: "Selene Silverleaf",
      action: "commented on",
      target: "SiteSculpt",
      time: "4 days ago",
      department: "Manager",
      message:
        "@Cody This design is simply stunning! From layout to color, it's a work of art!",
      hasReply: true,
      hasAvatar: true,
    },
    {
      id: 5,
      type: "invitation" as const,
      user: "Thalia Fox",
      action: "has invited you to join",
      target: "Design Research",
      time: "4 days ago",
      department: "Dev Team",
      hasActions: true,
      hasAvatar: true,
    },
  ];

  return (
    <Tabs className="flex h-full w-full flex-col" defaultValue="all">
      <TabsList className="w-full">
        <TabsTrigger className="flex items-center gap-1.5" value="all">
          <span>All</span>
          <Badge variant="default">{allNotifications.length}</Badge>
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-1.5" value="inbox">
          <span>Inbox</span>
          <Badge variant="info">{inboxNotifications.length}</Badge>
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-1.5" value="team">
          <span>Team</span>
          <Badge variant="success">{teamNotifications.length}</Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent className="flex-1 overflow-y-auto" value="all">
        <div className="space-y-0">
          {allNotifications.map(renderNotification)}
        </div>
      </TabsContent>

      <TabsContent className="flex-1 overflow-y-auto" value="inbox">
        <div className="space-y-0">
          {inboxNotifications.map(renderNotification)}
        </div>
      </TabsContent>

      <TabsContent className="flex-1 overflow-y-auto" value="team">
        <div className="space-y-0">
          {teamNotifications.map(renderNotification)}
        </div>
      </TabsContent>
    </Tabs>
  );
}
