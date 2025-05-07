import { Avatar, Badge, Box, Grid, Modal, Paper, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { TextN1 } from "../../components/Text";
import { useStyles } from "./style";
import UserProfile from "./UserProfile";
import { IconLogout, IconPhotoEdit, IconSquareRoundedArrowDown, IconUserStar } from "@tabler/icons-react";
import ShopProfile from "./ShopProfile";
import { useNavigate } from "react-router-dom";
import FoodCategories from "./FoodCategories";
import Settings from "./Settings";
import { IconChefHat } from "@tabler/icons-react";
import { IconSettingsHeart } from "@tabler/icons-react";
import { shoeNotification } from "../../components/Notify";
import { IconUsersGroup } from "@tabler/icons-react";
import { IconBarcode } from "@tabler/icons-react";
import { IconAlarm } from "@tabler/icons-react";

const Profile = () => {
  const [settings,setSettings] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <Grid gutter={10} style={{padding:'5px'}}>
      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/user-profile-structure-beam');
        }}>
          <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconUserStar size={'1.5rem'} />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              User Profile
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/user-profile-structure-images');
        }}>
          <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconPhotoEdit size={'1.5rem'} />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              User Baner Images
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/user-room-settings');
        }}>
          <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconPhotoEdit size={'1.5rem'} />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Rooms Images
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
           navigate('/shop-product');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconChefHat size={'1.5rem'} />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Food Products
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/shop-food-categories');
        }}>
          <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconChefHat size={'1.5rem'} />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Food Categories
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>


      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          setSettings(true);
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconSettingsHeart size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Settings
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
           navigate('/table-settings');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconSettingsHeart size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Tables Setting
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

      
      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
           navigate('/room-settings');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconSettingsHeart size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Rooms Setting
            </TextN1>
          </Box>
         
        </Paper>
      </Grid.Col>

 
      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/kot-create-user');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconUserStar size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Kot User Create
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/waiter-create-user');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconUserStar size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Waiter User Create
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/staff-panel');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconUsersGroup size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Staff Panel
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      
      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/bar-code-panel');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconBarcode size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Bar Code Scanner
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      
      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          navigate('/reminders');
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconAlarm size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Reminders
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} xs={4}  md={3} mt={15}>
        <Paper shadow="xl"  radius={'sm'} className={classes.itemBox} onClick={()=>{
          localStorage.clear();
          navigate('/login');
          shoeNotification('success','Logout Successfully')
        }}>
           <ThemeIcon size={'lg'} color="blue" radius={'lg'}>
            <IconLogout size={'1.5rem'}  />
          </ThemeIcon>
          <Box className={classes.listBox}>
            <TextN1 style={{fontWeight:'600'}}>
              Log Out
            </TextN1>
          </Box>
        </Paper>
      </Grid.Col>

      <Modal
        opened={settings}
        onClose={()=>{
          setSettings(false);
        }}
        title="Food Categories"
        size={'md'}
        centered
        transitionProps={{ transition: 'rotate-left', duration: 100 }}
      >
        <Settings setSettings={setSettings}/>
      </Modal>
    </Grid>
  );
};

export default Profile;
