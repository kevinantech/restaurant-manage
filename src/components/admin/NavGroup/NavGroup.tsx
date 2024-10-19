"use client";
import { Color } from "@/common/constants/styles/color.style";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { marginBottom } from "../NavLink/NavLink";

export interface NavGroupProps {
  children: React.ReactNode;
  label: string;
  startIcon: React.ReactNode;
}

const getRandom = (): string => Math.random().toString(32).substring(2, 9);

const NavGroup: React.FC<NavGroupProps> = ({ children, label, startIcon }) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const links = useMemo(() => {
    const formattedData = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && typeof child.props.href === "string")
        return child.props.href;
    });
    const filteredData = formattedData?.filter((href) => !!href) as Array<string>;
    return filteredData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const active = links?.some((href) => href === path);
  const [key] = useState<string>([label, getRandom()].join("-"));
  const containerId = `${key}-container`;
  const contentId = `${key}-content`;
  const arrowIconId = `${key}-arrow`;

  const handleClick = () => {
    const container = document.getElementById(containerId);
    const contentOffsetHeight = document.getElementById(contentId)?.offsetHeight;
    const arrowIcon = document.getElementById(arrowIconId);
    if (container && contentOffsetHeight && arrowIcon) {
      const newContainerHeigth = contentOffsetHeight + links.length * marginBottom;
      container.style.height = !isOpen ? `${newContainerHeigth}px` : "0px";
      arrowIcon.style.transform = !isOpen ? "rotate(90deg)" : "";
    }

    setIsOpen((state) => !state);
  };

  return (
    <>
      <Button
        startIcon={startIcon}
        endIcon={
          <KeyboardArrowRightRoundedIcon
            id={arrowIconId}
            sx={{
              color: "#FFFFFF",
              transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
          />
        }
        sx={{
          height: 44,
          width: "100%",
          marginBottom: `${marginBottom}px`,
          padding: "0 12px 0 16px",
          borderRadius: 2,
          justifyContent: "start",
          fontFamily: "inherit",
          fontSize: 14,
          textTransform: "none",
          color: active ? Color["admin-active"] : "inherit",
          "&.MuiButtonBase-root.MuiButton-root": {
            backgroundColor: active ? "rgba(55, 63, 80, 0.6)" : "transparent",
          },
          "& .MuiButton-icon": {
            marginLeft: 0,
          },
          "& .MuiButton-endIcon": {
            flex: 1,
            display: "flex",
            flexDirection: "row-reverse",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => handleClick()}
      >
        {label}
      </Button>
      <div
        id={containerId}
        className="h-0 overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div id={contentId} className="overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default NavGroup;
