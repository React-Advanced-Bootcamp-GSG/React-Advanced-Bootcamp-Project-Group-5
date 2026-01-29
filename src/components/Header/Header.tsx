import {
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  useMantineTheme,
  Image,
  AppShell,
  ScrollArea,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import classes from "./Header.module.css";
import logo from "../../assets/logo.svg";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Container>
      <AppShell.Header className={classes.header} pos={"sticky"}>
        <Group justify="space-between" h="100%">
          <Image
            src={logo}
            alt="Omni logo"
            className={classes.logo}
            w={"2rem"}
            style={{
              color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/" className={classes.link}>
              Products
            </Link>
            <Link to="/product/add" className={classes.link}>
              Add Product
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <Button variant="outline">Log in</Button>
            <Button variant="gradient">Sign up</Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
            color="white"
          />
        </Group>
      </AppShell.Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/" className={classes.link}>
            Products
          </Link>
          <Link to="/product/add" className={classes.link}>
            Add Product
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="outline">Log in</Button>
            <Button variant="gradient" color={theme.colors.blue[6]}>
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Container>
  );
}
