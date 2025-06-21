"use client";

// Simple motion utilities without requiring framer-motion
export const motion = {
  h1: ({ children, initial, animate, transition, className, ...props }: any) => (
    <h1 className={className} {...props}>{children}</h1>
  ),
  p: ({ children, initial, animate, transition, className, ...props }: any) => (
    <p className={className} {...props}>{children}</p>
  ),
  div: ({ children, initial, animate, transition, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  )
};