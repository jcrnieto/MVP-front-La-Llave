import logo from '../image/logo.jpg';

const Header = () => {
  return (
    <header className="w-full h-60 md:h-[30rem] bg-orange-500 shadow overflow-hidden">
      <img
        src={logo}
        alt="Logo"
        className="w-full h-full object-cover"
      />
    </header>
  );
}

export default Header;