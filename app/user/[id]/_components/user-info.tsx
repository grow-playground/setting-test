type UserInfoProps = {
  userInfo: {
    name: string;
  };
};

export default function UserInfo({ userInfo }: UserInfoProps) {
  return <h1 className="text-3xl font-bold">{userInfo.name}</h1>;
}
