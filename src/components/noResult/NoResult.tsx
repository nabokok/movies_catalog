interface NoResult {
  text: string,
}

function NoResult({ text }: NoResult) {
  return (
    <p className="text-xl text-muted-foreground">{text}</p>
  )
}

export default NoResult;
