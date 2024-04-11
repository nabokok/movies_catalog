interface Props {
  children: React.ReactNode;
  size?: string;
}

function Icon({ children, size }: Props) {
  return (
    <svg width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>

  )
}

export default Icon;
