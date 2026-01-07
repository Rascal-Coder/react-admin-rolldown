# Requirements Document

## Introduction

使用原生 fetch API 实现简单的文件上传功能，将头像图片直接上传到后端服务 localhost:7001。

## Glossary

- **Upload_Component**: 处理文件上传的 React 组件
- **Backend_Service**: Midway.js 后端服务，端点为 http://localhost:7001/file/upload

## Requirements

### Requirement 1: Fetch 文件上传

**User Story:** 作为开发者，我想使用 fetch API 上传文件，以便简单直接地与后端通信。

#### Acceptance Criteria

1. WHEN 用户选择文件后，THE Upload_Component SHALL 使用 fetch API 和 FormData 发送 POST 请求到 http://localhost:7001/file/upload
2. WHEN 构建请求时，THE Upload_Component SHALL 将文件添加到 FormData 中
3. WHEN 后端返回成功响应，THE Upload_Component SHALL 解析 JSON 并获取 filePath 用于预览
4. IF fetch 请求失败，THEN THE Upload_Component SHALL 显示错误提示

### Requirement 2: 文件验证

**User Story:** 作为用户，我想只上传有效的图片文件，确保头像正确显示。

#### Acceptance Criteria

1. WHEN 用户选择文件时，THE Upload_Component SHALL 验证文件类型为 JPEG 或 PNG
2. WHEN 用户选择文件时，THE Upload_Component SHALL 验证文件大小小于 2MB
3. IF 验证失败，THEN THE Upload_Component SHALL 显示相应错误信息并阻止上传
