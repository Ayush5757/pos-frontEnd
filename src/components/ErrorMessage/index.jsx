import { ErrorMessage } from 'formik'
import React from 'react'
import { useStyles } from './style'

const ErrorMessageView = ({name}) => {
    const { classes } = useStyles();
  return (
    <ErrorMessage component={'div'} className={classes.error} name={name} />
  )
}

export default ErrorMessageView;