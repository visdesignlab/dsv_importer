import React, {FC} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import gray from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      background: gray[50],
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(3),
      color: gray[900],
    },
  }),
);

interface OwnProps {}

type Props = OwnProps;

const HeaderBar: FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h3"
            className={classes.title}
            color="inherit"
            aria-label="menu">
            Upload your data
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
