import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  borderInputBottom: {
    input: {
      backgroundColor: 'red !important'
    }
  },
  userLogoGrid: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  },
  userNameGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
  userBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  userName: {
    fontWeight: '600',
    fontSize: '21px',
  },
  badge: {
    margin: '10px 0 10px 0',
    a: {
      width: '100%',
      padding: '20px 10px'
    }
  },
  itemBox: {
    display: 'flex',
    padding: '10px',
    border: `1px solid ${theme.colors.most_light_gray}`,
    cursor: 'pointer',
    color: theme.colors.light_gray,
    "&:hover": {
      backgroundColor: "#adad85",
      color: "#ffffff",
    },
  },
  listBox: {
    display: 'flex',
    alignItems: 'center',
    marginLeft:'10px'
  },
  editBtnBox: {
    display: 'flex',
    // justifyContent:'flex-end'
  }
}));
