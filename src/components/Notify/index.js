import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export const shoeNotification = (status,message,title)=>{
    const statusOpt = {
        'error':'#ff4d4d',
        'success':'#3399ff'
    }
    notifications.show({
        title: title ?? '',
        message: message ?? '',
        styles: (theme) => ({
          root: {
            backgroundColor: statusOpt[status],
            borderColor: theme.colors.blue[6],

            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: statusOpt[status]},
          },
        }),
      })
    }

    
export const showNotificationWithoutClose = (status,message,title)=>{
  const statusOpt = {
      'error':'#ff4d4d',
      'success':'#3399ff',
      'reminder':'#ff9900'
  }
  notifications.show({
      title: title ?? '',
      message: message ?? '',
      autoClose: false,
      styles: (theme) => ({
        root: {
          backgroundColor: statusOpt[status],
          borderColor: theme.colors.blue[6],

          '&::before': { backgroundColor: theme.white },
        },
        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: statusOpt[status]},
        },
      }),
    })
  }
