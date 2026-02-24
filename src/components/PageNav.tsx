import { Link } from "react-router-dom";

const PageNav = () => {
  const pages = [
    { name: "Page 1", path: "/" },
    { name: "Page 2", path: "/about" },
    { name: "Page 3", path: "/register" },
    { name: "Page 4", path: "/rules" },
    { name: "Page 5", path: "/jury" },
  ];

  return (
    <div className="bg-[#5FA8D3] text-[#F2F6F9] py-3">
      <div className="container mx-auto px-4">
        <div className="flex justify-end gap-6">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="font-body font-bold text-sm hover:text-accent transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageNav;
