interface UserAvatarProps {
  src: string;
}

export function UserAvatar({ src }: UserAvatarProps) {
  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full w-8 h-8">
      <img src={src} alt="User avatar" />
    </div>
  );
}
