const toggleSidebar = () => {
  console.log("toggling");
  if (typeof window !== "undefined") {
    const sideBar = document.getElementById("sidebar__wrapper")!;
    return sideBar.classList.toggle("active");
  }
};

export default toggleSidebar;
