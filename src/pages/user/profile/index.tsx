import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Save, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import authService from "@/api/services/auth-service";
import fileService, { getAvatarUrl } from "@/api/services/file-service";
import userService from "@/api/services/user-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/avatar";
import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";
import { Input } from "@/components/base/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import { Separator } from "@/components/base/separator";
import { Text } from "@/components/base/typography";
import { useUserActions, useUserInfo } from "@/store/user-store";
import { UserSex } from "@/types/user";

// 手机号正则
const phoneRegex = /^1[3-9]\d{9}$/;

// 表单校验 schema
const profileFormSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "用户名至少需要2个字符" })
    .max(30, { message: "用户名最多30个字符" }),
  nickName: z
    .string()
    .min(2, { message: "昵称至少需要2个字符" })
    .max(30, { message: "昵称最多30个字符" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  phoneNumber: z
    .string()
    .regex(phoneRegex, { message: "请输入有效的手机号码" })
    .or(z.literal("")),
  sex: z.nativeEnum(UserSex).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function UserProfile() {
  const userInfo = useUserInfo();
  const { setUserInfo } = useUserActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    getAvatarUrl(userInfo)
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      userName: userInfo.userName || "",
      nickName: userInfo.nickName || "",
      email: userInfo.email || "",
      phoneNumber: userInfo.phoneNumber || "",
      sex: userInfo.sex,
    },
  });

  // 获取当前用户信息
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        // 更新 store
        setUserInfo(currentUser);
        // 更新表单默认值
        form.reset({
          userName: currentUser.userName || "",
          nickName: currentUser.nickName || "",
          email: currentUser.email || "",
          phoneNumber: currentUser.phoneNumber || "",
          sex: currentUser.sex,
        });
        // 更新头像预览
        setAvatarPreview(getAvatarUrl(currentUser));
      } catch (error) {
        console.error("获取用户信息失败:", error);
        toast.error("获取用户信息失败");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCurrentUser();
  }, [form, setUserInfo]);

  // 处理头像点击
  const handleAvatarClick = () => {
    if (isLoading || isUploadingAvatar) {
      return;
    }
    fileInputRef.current?.click();
  };

  // 处理头像文件选择
  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // // 验证文件类型
    // if (!file.type.startsWith("image/")) {
    //   toast.error("请选择图片文件");
    //   return;
    // }

    // // 验证文件大小 (最大 10MB)
    // if (file.size > 10 * 1024 * 1024) {
    //   toast.error("图片大小不能超过 10MB");
    //   return;
    // }

    // 设置预览
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 保存文件待上传
    setAvatarFile(file);

    // 立即上传头像
    setIsUploadingAvatar(true);
    try {
      const result = await fileService.uploadAvatar(file);

      // if (!userInfo.id) {
      //   toast.error("用户信息不完整，请重新登录");
      //   return;
      // }

      // 更新用户头像
      await userService.updateUserInfo({
        id: userInfo.id || "",
        userName: userInfo.userName,
        nickName: userInfo.nickName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        sex: userInfo.sex,
        avatar: result.id,
      });

      // 重新获取最新的用户信息（包含完整的 avatarEntity）
      const latestUserInfo = await authService.getCurrentUser();
      setUserInfo(latestUserInfo);

      // 更新表单数据
      form.reset({
        userName: latestUserInfo.userName || "",
        nickName: latestUserInfo.nickName || "",
        email: latestUserInfo.email || "",
        phoneNumber: latestUserInfo.phoneNumber || "",
        sex: latestUserInfo.sex,
      });

      // 更新头像预览（使用最新获取的数据）
      setAvatarPreview(getAvatarUrl(latestUserInfo));

      setAvatarFile(null);
      toast.success("头像更新成功");
    } catch (error) {
      console.error("头像上传失败:", error);
      toast.error("头像上传失败，请稍后重试");
      // 恢复原头像预览
      setAvatarPreview(getAvatarUrl(userInfo));
      setAvatarFile(null);
    } finally {
      setIsUploadingAvatar(false);
    }

    // 清空 input 以便重复选择同一文件
    event.target.value = "";
  };

  // 提交表单
  const onSubmit = async (data: ProfileFormValues) => {
    if (!userInfo.id) {
      toast.error("用户信息不完整，请重新登录");
      return;
    }

    setIsLoading(true);
    try {
      // 调用更新用户信息 API
      await userService.updateUserInfo({
        id: userInfo.id,
        ...data,
      });

      // 重新获取最新的用户信息（确保数据完整）
      const latestUserInfo = await authService.getCurrentUser();
      setUserInfo(latestUserInfo);

      // 更新表单数据
      form.reset({
        userName: latestUserInfo.userName || "",
        nickName: latestUserInfo.nickName || "",
        email: latestUserInfo.email || "",
        phoneNumber: latestUserInfo.phoneNumber || "",
        sex: latestUserInfo.sex,
      });

      // 更新头像预览
      setAvatarPreview(getAvatarUrl(latestUserInfo));

      toast.success("用户信息更新成功");
    } catch (error) {
      console.error("更新用户信息失败:", error);
      toast.error("更新用户信息失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 获取用户名首字母作为头像 fallback
  const getAvatarFallback = () => {
    const name =
      form.watch("nickName") ||
      form.watch("userName") ||
      userInfo.nickName ||
      userInfo.userName ||
      "U";
    return name.charAt(0).toUpperCase();
  };

  // 加载中状态
  if (isFetching) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-1">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
        </div>
        <Separator />
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="size-24 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-3 w-40 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="space-y-2" key={i}>
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                <div className="h-9 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-48 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 页面标题 */}
      <div className="space-y-1">
        <h2 className="font-semibold text-2xl tracking-tight">个人资料</h2>
        <Text color="secondary" variant="body2">
          管理您的账户信息和偏好设置
        </Text>
      </div>

      <Separator />

      {/* 头像卡片 */}
      <Card className="border-0 bg-linear-to-br from-primary/5 via-transparent to-transparent shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="size-5" />
            头像设置
          </CardTitle>
          <CardDescription>点击头像上传新的个人照片</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="group relative">
              <Avatar
                className="size-24 cursor-pointer ring-4 ring-background transition-all duration-300 group-hover:ring-primary/20"
                onClick={handleAvatarClick}
              >
                <AvatarImage
                  alt={userInfo.nickName || userInfo.userName}
                  className="object-cover"
                  src={avatarPreview}
                />
                <AvatarFallback className="bg-primary/10 font-semibold text-2xl text-primary">
                  {getAvatarFallback()}
                </AvatarFallback>
              </Avatar>
              {/* 上传中遮罩 */}
              {isUploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <Loader2 className="size-6 animate-spin text-white" />
                </div>
              )}
              {/* hover 遮罩 */}
              {!isUploadingAvatar && (
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={handleAvatarClick}
                >
                  <Camera className="size-6 text-white" />
                </div>
              )}
              <input
                accept="image/*"
                className="hidden"
                disabled={isUploadingAvatar}
                onChange={handleAvatarChange}
                ref={fileInputRef}
                type="file"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Text color="default" variant="subTitle1">
                上传新头像
              </Text>
              <Text color="secondary" variant="caption">
                支持 JPG、PNG、GIF 格式，最大 10MB
              </Text>
              {avatarFile && (
                <Text className="text-primary" variant="caption">
                  已选择: {avatarFile.name}
                </Text>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 基本信息表单 */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">基本信息</CardTitle>
          <CardDescription>更新您的个人资料信息</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              {/* 用户名 */}
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名" {...field} />
                    </FormControl>
                    <FormDescription>用于登录系统的账号名称</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 昵称 */}
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>昵称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入昵称" {...field} />
                    </FormControl>
                    <FormDescription>
                      这是您的显示名称，将在系统中展示
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 邮箱 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱地址</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入邮箱地址"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      用于接收系统通知和找回密码
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 手机号 */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手机号</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入手机号" type="tel" {...field} />
                    </FormControl>
                    <FormDescription>用于接收短信通知</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 性别 */}
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>性别</FormLabel>
                    <Select
                      defaultValue={
                        field.value !== undefined ? String(field.value) : ""
                      }
                      onValueChange={(value) =>
                        field.onChange(value ? Number(value) : undefined)
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择性别" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={String(UserSex.Male)}>
                          <span className="flex items-center gap-2">
                            <span className="text-blue-500">♂</span>男
                          </span>
                        </SelectItem>
                        <SelectItem value={String(UserSex.Female)}>
                          <span className="flex items-center gap-2">
                            <span className="text-pink-500">♀</span>女
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>选择您的性别</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 提交按钮 */}
              <div className="flex justify-end gap-3">
                <Button
                  disabled={isLoading}
                  onClick={() => form.reset()}
                  type="button"
                  variant="outline"
                >
                  重置
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      保存修改
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
