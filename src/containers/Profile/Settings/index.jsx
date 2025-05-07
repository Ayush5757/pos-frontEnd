import React, { useEffect, useState } from "react";
import { Box, Grid, Paper} from "@mantine/core";
import { PrimaryButton } from "../../../components/Buttons";
import { TextN1 } from "../../../components/Text";
import { shoeNotification } from "../../../components/Notify";
const Settings = ({setSettings}) => {
  const [ currentData, setCurrentData ] = useState();
  useEffect(()=>{
    setCurrentData(localStorage.getItem('showI'))
  },[])
  return (
    <Box>
    <Grid pt={'10px'}>
      <Paper shadow="xl" w={'100%'} p={'10px'} style={{border:`1px solid #e3e6e8`}}>
       <Grid.Col span={12}>
        <TextN1 fw={700} color={'#006666'}> Show Product Image's in Inventorie</TextN1>
       </Grid.Col>
      <Grid.Col span={12}>
        <PrimaryButton disabled={currentData==='1'?true:false} onClick={()=>{
          localStorage.setItem('showI',1)
          setSettings(false);
          shoeNotification('success', 'Setting Changed')
        }}>Yes</PrimaryButton>
         <PrimaryButton ml={10} disabled={currentData==='0'?true:false} onClick={()=>{
          localStorage.setItem('showI',0)
          setSettings(false);
          shoeNotification("success", "Setting Changed");
      }}>No</PrimaryButton>
      </Grid.Col>
      </Paper>
    </Grid>
    <Grid mt={20}>
    </Grid>
    </Box>
  );
};

export default Settings;
