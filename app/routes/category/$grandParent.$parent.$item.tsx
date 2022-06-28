import { Outlet } from "@remix-run/react";

export default function () {
  return (
    <div>
      <p>$grandParent.$parent.$item</p>
      <Outlet />
    </div>
  );
}
