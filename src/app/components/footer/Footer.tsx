const Footer = () => {
  return (
    <footer className="mt-12 border-t bg-white px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} <span className="font-semibold text-black">MovieBook</span>. All rights reserved.
        </p>

        <ul className="flex gap-4 text-sm text-gray-600">
          <li className="cursor-pointer hover:text-black">About</li>
          <li className="cursor-pointer hover:text-black">Contact</li>
          <li className="cursor-pointer hover:text-black">Privacy Policy</li>
          <li className="cursor-pointer hover:text-black">Terms</li>
        </ul>

        <div className="flex gap-3">
          <span className="cursor-pointer text-xl hover:scale-110 transition">🐦</span>
          <span className="cursor-pointer text-xl hover:scale-110 transition">📘</span>
          <span className="cursor-pointer text-xl hover:scale-110 transition">📸</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
