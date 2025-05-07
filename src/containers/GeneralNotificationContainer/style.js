import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  big_box: {
    display: "flex",
    justifyContent: "center",
  },
  big_grid: {
    width: "100%",
    "@media (min-width: 768px)": {
      width: "60vw",
    },
  },
  heading: {
    width: "100%",
    borderRadius: "5px",
    // background:
    //   "linear-gradient(90deg, #5c5c3d 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)",
    backgroundColor: '#f5f5ef',
    padding: "15px 20px",
  },
  view_btn:{
    padding: '0 10px',
    height: '25px'
  },
  view_btn_grid:{
    display: 'flex',
    alignItems: 'center'
  },
  card :{
    backgroundColor: 'var(--mantine-color-body)',
  },
  rating :{
  },
  title :{
    fontSize: '16px',
    lineHeight:'18px',
    fontWeight:'700',
    color:'#b32400'
  },
  action :{
    backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5))',
    '&:hover' :{
      backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
    }
  },
  footer:{
    marginTop: 'var(--mantine-spacing-md)',
  }
}));
