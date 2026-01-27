#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前脚本所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API 目录路径（相对于项目根目录）
const projectRoot = path.join(__dirname, "..");
const apiDir = path.join(projectRoot, "src", "api/api");

// 排除的文件列表
const excludeFiles = ["typings.d.ts"];

// 同时匹配 request("/x") 和 request<any>("/x")，保留泛型
const requestCallRegex = /\brequest(?:(<[^>]+>))?\s*\(/g;

/**
 * 更新单个 API 文件
 * @param {string} filePath - 文件路径
 * @returns {{ updated: boolean, changeCount: number }}
 */
function updateApiFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    let updatedContent = content;
    let changeCount = 0;

    // 将 request(...) / request<T>(...) 替换为 requestClient.request(...)
    updatedContent = updatedContent.replace(
      requestCallRegex,
      (_match, genericPart = "") => {
        // 统计替换次数
        changeCount++;
        // 保留泛型信息
        return `requestClient.request${genericPart || ""}(`;
      },
    );

    // 删除文件顶部的 // @ts-ignore 和 /* eslint-disable */
    // 只在文件开头连续出现时处理，避免误删中间注释
    updatedContent = updatedContent.replace(
      /^\/\/\s*@ts-ignore\s*\r?\n\/\*\s*eslint-disable\s*\*\/\s*\r?\n?/,
      "",
    );

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, "utf8");
      return { updated: true, changeCount };
    }
    return { updated: false, changeCount: 0 };
  } catch (error) {
    console.error(`❌ 处理文件失败: ${path.basename(filePath)}`, error.message);
    return { updated: false, changeCount: 0 };
  }
}

/**
 * 获取所有需要处理的 TypeScript 文件
 * @returns {string[]}
 */
function getApiFiles() {
  try {
    const files = fs.readdirSync(apiDir);

    return files
      .filter((file) => {
        // 只处理 .ts 文件，排除指定的排除文件
        return (
          file.endsWith(".ts") &&
        //   !file.endsWith(".d.ts") &&
          !excludeFiles.includes(file)
        );
      })
      .map((file) => path.join(apiDir, file));
  } catch (error) {
    console.error(`❌ 读取 API 目录失败: ${error.message}`);
    return [];
  }
}

/**
 * 主函数
 */
function main() {
  console.log("🚀 开始批量替换 request(...) 为 requestClient.request(...)...");
  console.log(`📂 API 目录: ${apiDir}\n`);

  // 检查 API 目录是否存在
  if (!fs.existsSync(apiDir)) {
    console.error(`❌ API 目录不存在: ${apiDir}`);
    process.exit(1);
  }

  const apiFiles = getApiFiles();

  if (apiFiles.length === 0) {
    console.log("⚠️  未找到需要处理的 TypeScript 文件");
    return;
  }

  console.log(`📝 找到 ${apiFiles.length} 个文件需要处理:\n`);

  let updatedCount = 0;
  let totalReplaces = 0;

  apiFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);
    console.log(`📄 正在处理: ${fileName}`);

    const result = updateApiFile(filePath);

    if (result.updated) {
      updatedCount++;
      totalReplaces += result.changeCount;
      console.log(`✅ 已更新: ${fileName}（${result.changeCount} 处替换）`);
    } else if (result.changeCount === 0) {
      console.log(`⏭️  无 request(...) 需要替换: ${fileName}`);
    } else {
      console.log(`⏭️  无需更新: ${fileName}`);
    }

    console.log("");
  });

  console.log("═".repeat(50));
  console.log("✨ 批量替换完成！");
  console.log("📊 统计信息:");
  console.log(`   - 处理文件数: ${apiFiles.length}`);
  console.log(`   - 更新文件数: ${updatedCount}`);
  console.log(`   - 替换次数:   ${totalReplaces}`);

  if (updatedCount > 0) {
    console.log(
      "\n🎉 所有 request(...) 调用已统一替换为 requestClient.request(...)"
    );
  } else {
    console.log("\n✅ 所有文件均已是最新状态，无需更新");
  }
}

// 运行主函数
main();

// 导出函数供其他模块使用
export { updateApiFile, getApiFiles };
