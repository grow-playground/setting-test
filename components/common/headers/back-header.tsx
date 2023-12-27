import BackButton from '../buttons/back-button';
import Header from './header';
import Profile from './profile';

export default function BackHeader() {
  return (
    <>
      <Header
        leftArea={<BackButton />}
        centerArea={
          <h1 className="text-xl font-bold text-blue-primary">TypeTime</h1>
        }
        rightArea={<Profile />}
      />
    </>
  );
}
