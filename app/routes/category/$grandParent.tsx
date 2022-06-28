import { Outlet } from "@remix-run/react";

const Category = () => {
  return (
    <div>
      <h1>$grandParent:</h1>
      <Outlet />
    </div>
  );
};

export default Category;
