type UserInfoProps = {
  info: {
    name: string;
  };
};

export default function UserInfo({ info }: UserInfoProps) {
  return <h1 className="text-3xl font-bold">{info.name}</h1>;
}
