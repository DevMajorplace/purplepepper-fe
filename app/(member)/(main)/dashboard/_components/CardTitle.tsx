export default function CardTitle({ title, onClick }: CardTitleProps) {
  return (
    <div className="text-xl font-bold" role="presentation" onClick={onClick}>
      {title}
    </div>
  );
}
