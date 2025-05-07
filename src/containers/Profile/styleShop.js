import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    userLogoGrid:{
        display:'flex',
        justifyContent:'end',
        alignItems:'center'
    },
    userNameGrid:{
        display:'flex',
        alignItems:'center',
        justifyContent:'start',
    },
    userBox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    userName:{
        fontWeight:'600',
        fontSize:'21px',
    },
    badge:{
        margin:'10px 0 10px 0',
        a:{
            width:'100%',
            padding:'20px 10px'
        }
    },
    RowBox:{
        display:'flex',
        padding:'10px'
    },
    listBox:{
        display:'flex',
        alignItems:'center',
    },
    editBtnBox:{
        display:'flex',
        // justifyContent:'flex-end'
    }
}));
