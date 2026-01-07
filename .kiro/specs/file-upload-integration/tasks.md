# Implementation Plan: File Upload Integration

## Overview

使用 fetch API 实现文件上传功能，替换 Ant Design Upload 的默认上传行为。

## Tasks

- [x] 1. 实现 fetch 上传功能
  - [x] 1.1 添加 uploadFile 函数，使用 fetch + FormData 发送请求
    - 创建 FormData 并添加文件
    - POST 请求到 http://localhost:7001/file/upload
    - 解析 JSON 响应返回 FileResponse
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 添加 customRequest 函数，集成到 Upload 组件
    - 调用 uploadFile 函数
    - 处理 onSuccess 和 onError 回调
    - _Requirements: 1.1, 1.4_

  - [x] 1.3 更新 AvatarUploader 组件使用 customRequest
    - 移除 action 属性
    - 添加 customRequest 属性
    - _Requirements: 1.1_

- [ ] 2. Checkpoint - 确保上传功能正常工作
  - 确保所有代码编译通过，如有问题请询问用户

## Notes

- 直接使用 fetch API，不使用 axios 或 api-client
- 保留现有的 beforeUpload 验证逻辑
- 后端地址: http://localhost:7001/file/upload
