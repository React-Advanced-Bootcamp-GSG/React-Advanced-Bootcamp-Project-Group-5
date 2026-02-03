import { Outlet } from "@tanstack/react-router";
import { Header } from "../Header";
import { AppShell, Container, Group, Typography } from "@mantine/core";

export const Layout = () => {
  return (
    <AppShell footer={{ height: 40, offset: true }} padding="md">
      <Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer>
        <Container bg="#fff" py={10}>
          <Group justify="center">
            <Typography fs={"1rem"}>© 2026 GSG-G5</Typography>
          </Group>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
};
