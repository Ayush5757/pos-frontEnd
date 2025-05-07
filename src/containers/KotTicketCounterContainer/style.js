import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  OuterBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox:{
    width: '100%',
    padding:'3px'
  },
  ticketGrid:{
  },
  heading_table:{
    display: 'flex'
  },
  paper:{
    border:'1px solid #f0f0f5'
  },
  paperRoom:{
    backgroundColor: '#dd99ff',
  },
  paperTable:{
    backgroundColor: '#8cd9b3',
  },
  paperTable2:{
    backgroundColor: 'orangered',
  },
  btnGrid:{
    display:'flex',
    justifyContent:'flex-end'
  },
  note_box:{
    width: '100%',
    height: '100%',
    backgroundColor: '#d6d6f5',
    borderRadius:'5px'
  },
  noDataFound:{
    color:'gray'
  },
  pending:{
    color:'red'
  },
  logOutBox:{
    display:'flex',
    justifyContent:'space-between'
  }
}));
