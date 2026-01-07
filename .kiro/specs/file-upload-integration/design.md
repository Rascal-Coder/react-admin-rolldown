# Design Document

## Overview

实现一个简单的文件上传功能，使用原生 fetch API 将文件直接上传到后端服务。组件集成到现有的 AvatarUploader 中，替换 Ant Design Upload 的默认上传行为。

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AvatarUploader                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  ImgCrop    │→ │  Validation │→ │  customRequest  │  │
│  │  (裁剪)     │  │  (验证)     │  │  (fetch上传)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │  Backend Service        │
              │  POST /file/upload      │
              │  http://localhost:7001  │
              └─────────────────────────┘
```

## Components and Interfaces

### uploadFile 函数

使用 fetch API 上传文件的核心函数：

```typescript
interface FileResponse {
  id: string;
  fileName: string;
  filePath: string;
}

async function uploadFile(file: File): Promise<FileResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:7001/file/upload', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('上传失败');
  }
  
  return response.json();
}
```

### customRequest 函数

Ant Design Upload 的自定义上传处理：

```typescript
const customRequest: UploadProps['customRequest'] = async (options) => {
  const { file, onSuccess, onError } = options;
  
  try {
    const result = await uploadFile(file as File);
    onSuccess?.(result);
  } catch (error) {
    onError?.(error as Error);
  }
};
```

## Data Models

### 后端响应结构

```typescript
interface FileEntity {
  id: string;
  fileName: string;    // 文件名，如 "1234567890_avatar.png"
  filePath: string;    // 文件路径，如 "/file/bucket-name/1234567890_avatar.png"
  pkName?: string;     // 外键名称
  pkValue?: string;    // 外键值
  createDate?: string; // 创建时间
}
```

## Correctness Properties

*正确性属性是系统在所有有效执行中应该保持的特征或行为。*

### Property 1: 文件类型验证

*For any* 文件，如果其 MIME 类型是 image/jpeg 或 image/png，验证应该通过；否则应该失败并返回 Upload.LIST_IGNORE。

**Validates: Requirements 2.1**

### Property 2: 文件大小验证

*For any* 文件，如果其大小小于 2MB (2 * 1024 * 1024 bytes)，验证应该通过；否则应该失败并返回 Upload.LIST_IGNORE。

**Validates: Requirements 2.2**

### Property 3: FormData 构建正确性

*For any* 有效文件，uploadFile 函数应该创建包含该文件的 FormData，并使用 POST 方法发送到正确的 URL。

**Validates: Requirements 1.1, 1.2**

### Property 4: 响应解析正确性

*For any* 成功的后端响应，uploadFile 函数应该正确解析 JSON 并返回包含 filePath 的对象。

**Validates: Requirements 1.3**

## Error Handling

| 错误场景 | 处理方式 |
|---------|---------|
| 文件类型不正确 | 显示 "文件类型错误" toast，返回 Upload.LIST_IGNORE |
| 文件大小超过 2MB | 显示 "文件大小不能超过2M" toast，返回 Upload.LIST_IGNORE |
| 网络请求失败 | 调用 onError 回调，Upload 组件显示错误状态 |
| 后端返回错误 | 抛出错误，触发 onError 回调 |

## Testing Strategy

### 单元测试

- 测试 beforeUpload 函数的文件类型验证
- 测试 beforeUpload 函数的文件大小验证
- 测试 uploadFile 函数的 FormData 构建
- 测试错误处理逻辑

### 属性测试

使用 fast-check 进行属性测试：

- Property 1: 文件类型验证属性
- Property 2: 文件大小验证属性

测试配置：每个属性测试至少运行 100 次迭代。
