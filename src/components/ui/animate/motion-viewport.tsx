import { type MotionProps, m } from "motion/react";

import { varContainer } from "./variants/container";

interface Props extends MotionProps {
  className?: string;
}

/**
 * MotionViewport 组件 - 用于创建基于视口滚动的动画效果
 *
 * 主要特性：
 * - 当元素进入视口时触发动画
 * - 支持自定义动画变体
 * - 可配置视口触发条件
 *
 * 视口配置说明：
 * - once: 动画是否只触发一次
 * - amount: 元素进入视口的比例阈值（0-1之间）
 *
 * 动画状态：
 * - initial: 初始状态
 * - animate: 进入视口后的动画状态
 *
 * @see https://www.framer.com/motion/scroll-animations/#scroll-triggered-animations
 */
export default function MotionViewport({
  children,
  className,
  ...other
}: Props) {
  return (
    <m.div
      className={className}
      initial="initial"
      variants={varContainer()}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="animate"
      {...other}
    >
      {children}
    </m.div>
  );
}
