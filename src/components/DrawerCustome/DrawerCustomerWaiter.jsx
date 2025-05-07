import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Group,
  Button,
  ScrollArea,
  Box,
  ActionIcon,
  Paper,
} from "@mantine/core";
import { useStyles } from "./style";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";
import { IconAlignBoxLeftTopFilled } from "@tabler/icons-react";
import { IconAdjustments } from "@tabler/icons-react";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/api/categories";
import { TextN1 } from "../Text";
import { IconList } from "@tabler/icons-react";
import { getCategoriesWaiter } from "../../services/api/waiter";
const DrawerCustomerWaiter = ({opened,open,close,CategoryHandelClick,...rest}) => {
  const { classes } = useStyles();
    const {
      error,
      data,
      refetch,
    } = useQuery({
      queryKey: ["getCategoriesWaiter", localStorage.getItem('shop_user_id')],
      queryFn: () => getCategoriesWaiter(),
    });
  return (
    <>
      <Drawer
        size="xs"
        opened={opened}
        onClose={close}
        title="Categories"
        scrollAreaComponent={ScrollArea.Autosize}
        className={classes.drawer}
        {...rest}
      >
        {data?.data?.target?.length!==0?
        data?.data?.target?.map((value) => (
          <Paper className={classes.Categories} shadow="xl" onClick={()=>{
            CategoryHandelClick(value._id)
          }}>
          <span>{value.categorie_name}</span>
          <IconArrowBadgeRightFilled />
          </Paper>
          
          ))
        :
        <Paper shadow="xl">
          <TextN1 className={classes.NoRecord}>No Record</TextN1>
        </Paper>
        }
      </Drawer>

      <ActionIcon  variant="gradient"
      aria-label="Gradient action icon"
      gradient={{ from: 'rgba(8, 4, 4, 1)', to: 'indigo', deg: 273 }} size="2.2rem" pr={2} onClick={open}>
        <IconList size="2rem" />
      </ActionIcon>
    </>
  );
};
export default DrawerCustomerWaiter;
