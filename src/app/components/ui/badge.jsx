import React from "react"


export function Badge({ children, className = "", variant = "default", ...props }) {
  const baseStyle = "inline-block px-2 py-1 text-xs font-semibold rounded-full"
  const variantStyles = {
    default: "bg-red-100 text-red-800",
    secondary: "bg-gray-100 text-gray-800",
  }

  const badgeStyle = `${baseStyle} ${variantStyles[variant]} ${className}`

  return (
    <span className={badgeStyle} {...props}>
      {children}
    </span>
  )
}

