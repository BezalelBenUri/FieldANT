// src/components/Header.js

import Link from 'next/link';

const Header = () => {
  return (
    <header className = "bg-gray-900 text-white py-4">
      <nav className = "container mx-auto">
        <ul className = "flex justify-end space-x-4">
          <li className = "hover:text-yellow-300"><Link href = "/">Home</Link></li>
          <li className = "hover:text-yellow-300"><Link href = "/features">Features</Link></li>
          <li className = "hover:text-yellow-300"><Link href = "/pricing">Pricing</Link></li>
          <li className = "hover:text-yellow-300"><Link href = "/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
