import { Upload } from "antd";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import ImgCrop from "antd-img-crop";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";
import Icon from "@/components/ui/icon/icon";

interface FileResponse {
  id: string;
  fileName: string;
  filePath: string;
}

async function uploadFile(file: File): Promise<FileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:7001/file/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("上传失败");
  }

  return response.json();
}

const customRequest: UploadProps["customRequest"] = async (options) => {
  const { file, onSuccess, onError } = options;

  // console.log("file", file);

  try {
    const result = await uploadFile(file as File);
    onSuccess?.(result);
  } catch (error) {
    onError?.(error as Error);
  }
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("文件类型错误");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("文件大小不能超过2M");
  }

  if (!(isJpgOrPng && isLt2M)) {
    return Upload.LIST_IGNORE;
  }

  return true;
};

interface PropsType {
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
}

interface FormValues {
  avatar: UploadFile[];
}

export default function Analysis() {
  const form = useForm<FormValues>({
    defaultValues: {
      avatar: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>头像</FormLabel>
              <FormControl>
                <AvatarUploader onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function AvatarUploader({ value, onChange }: PropsType) {
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (onChange) {
      onChange(info.fileList);
    }
  };
  const onPreview = (file: UploadFile) => {
    const src = file.url || file?.response?.filePath;
    console.log("src", src);
    const realUrl = src.split("/file/")[1];
    if (realUrl) {
      window.open(`http://localhost:9001/${realUrl}`);
    }
  };
  return (
    <ImgCrop rotationSlider showGrid showReset>
      <Upload
        beforeUpload={beforeUpload}
        className="avatar-uploader"
        customRequest={customRequest}
        fileList={value}
        listType="picture-card"
        name="avatar"
        onChange={handleChange}
        onPreview={onPreview}
      >
        {(value?.length || 0) < 1 && <Icon icon="local:kun" />}
      </Upload>
    </ImgCrop>
  );
}
