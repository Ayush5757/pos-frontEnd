import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  search:{
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#ffff',
    padding: '20px 0',
},

  crouselCollection:{
    '.mantine-vcl0d1':{
      display:'none'
    },
    '.mantine-Carousel-indicators':{
      display:'none'   
    }
  },
    categoryBox:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        '.mantine-Text-root':{
            paddingTop:'10px',
            lineHeight:'0.9rem',
            textAlign:'center',
            fontSize:theme.fontSizes.sm,
            fontWeight: 600,
            color:theme.colors.gray,
        }
    },
   
    crousel:{
      marginTop:'2rem'
    },
    cardIimageContainer: {
      position: 'relative',
    },
    Card:{
      '.mantine-Card-root':{
        padding:'0 !important'
      }
    },
    cardText :{
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundImage: 'linear-gradient(to bottom, transparent 2%, black 60%)',
      color: '#fff',
      padding: '4px',
    },
    arrow:{
      display:'flex',
      justifyContent:'end',
    },
    headingCards:{
      display:'flex',
      alignItems:'center'
    },
    service:{
      color: theme.colors.gray
    },
    arrowBtn:{
      color: theme.colors.gray  
    },
    searchStyling:{
      label:{
        fontWeight:'bold'
      },
      input:{
        border:`1px solid ${theme.colors.light_black}`
      }
    },
    heading:{
      backgroundColor:'pink',
      padding:'10px',
      borderRadius:'5px',
      color:'#ffffff',
      fontWeight:'bold',
      background: 'linear-gradient(90deg, rgba(46,26,175,1) 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)'
    },
    TablePaper:{
      table:{
        thead:{
          tr:{
            background: 'linear-gradient(90deg, rgba(46,26,175,1) 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
            color:"#ffffff"
          }
        }
      }
    },
    dashboardheading:{
      color:'green'
    },
    dashboardheadingdate:{
      color:'orangered'
    },
    root: {
      padding: 'calc(var(--mantine-spacing-xl) * 1.5)'
    },
    label: {
      fontFamily: 'Greycliff CF, var(--mantine-font-family)'
    },
    salesandexpPaper:{
      border: '1px solid #e0e0eb',
      cursor:'pointer'
    },
    checkBoxGrid:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
    switch:{
      input:{
        border:'1px solid gray'
      }
    }
}));