import { Select, createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  select:{
    svg:{
      display:'none'
    },
    label:{
      marginBottom:"7px"
    },
    input:{
      border: `1px solid ${theme.colors.light_gray}`,
      borderTop:'none',
      borderLeft:'none',
      borderRight:'none',
      borderRadius:'0',
    }
  }
}));

const SelectInputView = ({
  id,
  name,
  label,
  placeholder,
  searchable = false,
  onChange,
  value,
  data,
  ...rest
}) => {
  const { classes } = useStyles(); 
  return (
    <Select
      id = {id}
      name = {name}
      label = {label}
      placeholder = {placeholder}
      searchable = {searchable}
      hoverOnSearchChange={true}
      onChange = {onChange}
      searchValue = {value}
      nothingFound = "No options"
      data = {data}
      className={classes.select}
      {...rest}
    />
  );
};
export default SelectInputView;
