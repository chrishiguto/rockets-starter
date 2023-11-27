"use client";

import { type ReactNode, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppBar } from "@concepta/react-material-ui";
import { useAuth } from "@concepta/react-auth-provider";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

type HandleCloseMenu = () => void;

interface UserData {
  id: string;
  username: string;
  email: string;
}

export default function AppBarContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, doLogout } = useAuth();

  const drawerMenuItems = [
    {
      id: "/users",
      icon: <GroupsOutlinedIcon />,
      text: "Users",
      onClick: () => router.push("/users"),
    },
  ];

  const onLogoutClick = (handleCloseMenu: HandleCloseMenu) => {
    handleCloseMenu();
    doLogout();
    startTransition(() => router.replace("/login"));
  };

  return (
    <AppBar.Root key={pathname}>
      <AppBar.Drawer
        currentId={pathname}
        logo="/logo.svg"
        collapsable
        items={drawerMenuItems}
        expandedWidth={120}
      />
      <AppBar.Main>
        <AppBar.Nav
          text={(user as UserData)?.username || ""}
          avatar="https://source.unsplash.com/random"
          headerMenuOptions={(handleClose) => (
            <MenuItem onClick={() => onLogoutClick(handleClose)}>
              Sign Out
            </MenuItem>
          )}
        />
        <Container>{children}</Container>
      </AppBar.Main>
    </AppBar.Root>
  );
}
