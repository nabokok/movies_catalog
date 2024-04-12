interface Props {
  children: React.ReactNode,
  size?: string,
  color?: string,
}

function Icon({ children, size, color }: Props) {
  return (
    <svg width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill={color || "none"} stroke={color || "#292929"} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  )
}

export default Icon;
