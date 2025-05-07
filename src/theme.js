export const Customecolors={
  gray: '#414e5a',
  light_gray: '#a1a8af',
  most_light_gray: '#e3e6e8',
  light_green: '#00cc00',
  light_red: '#ff0000',
  light_black: '#666666',
  light_blue: '#1274c0'
}
export const createTheme = {
  fontFamily: "museo-sans, sans-serif",
  fontSizes: {
    xs: '0.6rem',
    sm: '0.75rem',
    md: '0.9rem',
    lg: '1rem',
    xl: '1.2rem',
  },
  colors:{ 
    ...Customecolors,
    fontWeight:{
      bold:700,
    }
   },
  
};
