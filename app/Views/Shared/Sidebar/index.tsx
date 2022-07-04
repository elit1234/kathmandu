import { LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import toggleSidebar from "~/funcs/toggleSidebar";
// import toggleSidebar from "../funcs/toggleSidebar";

const Sidebar = ({ menuOptions }: { menuOptions: MenuOption[] }) => {
  const [staticOptions] = useState<MenuOption[]>(menuOptions);
  const [options, setOptions] = useState<MenuOption[]>();
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<number>(-1);
  const [activeLabel, setActiveLabel] = useState("");
  const RightArrow = ({ alt }: { alt?: boolean }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="sidebar__optionArrow"
        fill={alt ? "black" : "green"}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
      </svg>
    );
  };

  const initialize = () => {
    const allEls = document.querySelectorAll(".sidebar__option")!;

    allEls &&
      allEls.forEach((el) => {
        el.classList.remove("clicked");
        el.classList.remove("hidden");
      });
    setActive(-1);
    setPage(1);
  };

  const initializeSecond = () => {
    const pagesItems = staticOptions.filter(
      (opt, key) => opt.page === 2 && opt.parent === active
    );
    const page = staticOptions.filter((opt) => opt.id === active);
    console.log(page[0].label);
    setActiveLabel(page[0].label);
    setOptions(pagesItems);
    setPage(2);
  };
  const clickedFirstOpt = (key: number, id: number, label: string) => {
    if (active !== id) {
      const allEls = document.querySelectorAll(".sidebar__option");
      const clickedEl = allEls[key];

      clickedEl.classList.add("clicked");
      const otherOptions = document.querySelectorAll(
        ".sidebar__option:not(.clicked)"
      );
      otherOptions.forEach((otherOpt) => {
        console.log(otherOpt);
        otherOpt.classList.toggle("hidden");
      });
      setPage(2);
      setActive(id);
      setActiveLabel(label);

      const pagesItems = staticOptions.filter(
        (opt, key) => opt.page === 2 && opt.parent === id
      );
      setOptions(pagesItems);
    }
  };

  const clickedSecondOpt = (key: number, id: number, label: string) => {
    const allEls = document.querySelectorAll(".item");
    const clickedEl = allEls[key];
    clickedEl.classList.add("clicked");
    setPage(3);
    const pagesItems = staticOptions.filter(
      (opt, key) => opt.page === 3 && opt.parent === id
    );
    setOptions(pagesItems);
    setActiveLabel(label);
  };

  const getParent = (opt: MenuOption) => {
    const parent = staticOptions.filter((option) => option.id === opt.parent);
    return parent[0];
  };
  const clickedItem = (opt: MenuOption, key: number) => {
    const parent = getParent(opt)!;
    const grandParent = getParent(parent)!;
    const url = `/category/${grandParent.extName}/${parent.extName}/${opt.extName}`;
    // router.push(url);
    window.location.href = url;
  };

  useEffect(() => {
    if (active && active !== -1 && typeof window !== "undefined") {
    }
  }, [active]);

  return (
    <div className="sidebar__wrapper" id="sidebar__wrapper">
      <div className="sidebar__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="44px"
          height="44px"
          onClick={() => {
            toggleSidebar();
            if (page > 1) initialize();
          }}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
        </svg>
      </div>
      <div className="sidebar__inputWrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
        </svg>
        <input
          className="sidebar__input"
          placeholder="What are you looking for?"
        />
        <RightArrow alt={true} />
      </div>
      <div className="sidebar__options">
        {page < 2 &&
          staticOptions &&
          staticOptions.map((opt, key) => {
            if (opt.extName === "Admin")
              return (
                <a className="sidebar__option" key={key} href="/admin">
                  {opt.extName}
                </a>
              );
            if (opt.page === 1)
              return (
                <div
                  className="sidebar__option"
                  key={key}
                  onClick={() => {
                    clickedFirstOpt(key, opt.id, opt.label);
                  }}
                >
                  <RightArrow />
                  {opt.label}
                </div>
              );
            else return null;
          })}
        {page > 1 && (
          <div className="sidebar__options">
            <div
              className="sidebar__option"
              onClick={() => {
                if (page === 2) initialize();
                else {
                  initializeSecond();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
              {activeLabel}
            </div>
            {options &&
              options.map((opt, key) => {
                return (
                  <div
                    className="sidebar__option item"
                    key={key}
                    onClick={() => {
                      if (page === 2) clickedSecondOpt(key, opt.id, opt.label);
                      else clickedItem(opt, key);
                    }}
                  >
                    {opt.label}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
