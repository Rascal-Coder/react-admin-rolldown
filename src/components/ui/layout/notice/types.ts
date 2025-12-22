type FileType = "ppt" | "excel" | "word" | "svg" | "figma";

interface FileInfo {
  name: string;
  size: string;
  type: FileType;
}

interface ArtworkInfo {
  id: string;
  title: string;
}

interface BaseNotification {
  id: number;
  type: string;
  time: string;
  department?: string;
  hasAvatar?: boolean;
  isSuccess?: boolean;
}

interface UserNotification extends BaseNotification {
  user: string;
  action: string;
  target?: string;
  targetType?: string;
  targetDate?: string;
}

interface MentionNotification extends UserNotification {
  type: "mention";
  message?: string;
  hasReply?: boolean;
}

interface TagsNotification extends UserNotification {
  type: "tags";
  tags: string[];
}

interface AccessNotification extends UserNotification {
  type: "access";
  hasActions: boolean;
}

interface FileNotification extends UserNotification {
  type: "file" | "project";
  fileName: string;
  fileSize: string;
  fileType: FileType;
  editedTime?: string;
}

interface ArticleNotification extends UserNotification {
  type: "article";
}

interface SuccessNotification extends BaseNotification {
  type: "success";
  message: string;
}

interface UserRequestNotification extends UserNotification {
  type: "user_request";
  userName: string;
  userEmail: string;
  hasActions: boolean;
}

interface TaskNotification extends UserNotification {
  type: "task";
  taskTitle: string;
  dueDate: string;
  tags: string[];
  assignees: number;
}

interface UpgradeNotification extends UserNotification {
  type: "upgrade";
  hasActions: boolean;
}

interface MeetingNotification extends UserNotification {
  type: "meeting";
  meetingTitle: string;
  meetingTime: string;
  meetingDate: string;
  attendees: number;
  hasActions: boolean;
}

interface UploadNotification extends UserNotification {
  type: "upload";
  files: FileInfo[];
}

interface CommentNotification extends UserNotification {
  type: "comment";
  message: string;
  hasReply: boolean;
}

interface InvitationNotification extends UserNotification {
  type: "invitation";
  hasActions: boolean;
}

interface ArtworkNotification extends UserNotification {
  type: "artwork";
  artworks: ArtworkInfo[];
}

type Notification =
  | MentionNotification
  | TagsNotification
  | AccessNotification
  | FileNotification
  | ArticleNotification
  | SuccessNotification
  | UserRequestNotification
  | TaskNotification
  | UpgradeNotification
  | MeetingNotification
  | UploadNotification
  | CommentNotification
  | InvitationNotification
  | ArtworkNotification;

export type {
  Notification,
  UserNotification,
  MentionNotification,
  TagsNotification,
  AccessNotification,
  FileNotification,
  ArticleNotification,
  SuccessNotification,
  UserRequestNotification,
  TaskNotification,
  UpgradeNotification,
  MeetingNotification,
  UploadNotification,
  CommentNotification,
  InvitationNotification,
  ArtworkNotification,
  FileInfo,
  ArtworkInfo,
  BaseNotification,
  FileType,
};
