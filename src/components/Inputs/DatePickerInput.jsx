import React, { useState } from 'react'
import { DatePickerInput } from '@mantine/dates';
import { createStyles, rem } from "@mantine/core";
import { IconCalendar } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  Date:{
    '.mantine-DatePickerInput-input':{
      border: `1px solid ${theme.colors.light_gray}`,
      borderTop:'none',
      borderRight:'none',
      borderLeft:'none',
      borderRadius:'0',
    },
    '.mantine-DatePickerInput-placeholder':{
      color:'gray'
    }
  }
}))
const DatePicker = ({id,name,value,onChange,label,placeholder,...rest}) => {
  const { classes } = useStyles();
  return (
    <DatePickerInput
    id={id}
    name={name}
    onChange={(e)=>{
      onChange(e)
    }}
    value={value}
    clearable
    // defaultValue={new Date()}
    label={label}
    placeholder={placeholder}
    mx="auto"
    maw={400}
    className={classes.Date}
    icon={<IconCalendar size="1.1rem" stroke={1.5} />}
  />
  )
}

export default DatePicker