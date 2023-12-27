import BackButton from '../buttons/back-button';
import Header from './header';
import Menu from './menu';

export default function BackHeader() {
  return (
    <>
      <Header
        leftArea={<BackButton />}
        centerArea={
          <h1 className="text-xl font-bold text-blue-primary">TypeTime</h1>
        }
        rightArea={<Menu />}
      />
    </>
  );
}
