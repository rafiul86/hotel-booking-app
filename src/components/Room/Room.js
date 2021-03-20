import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import WcIcon from '@material-ui/icons/Wc';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Room({room}){
  const classes = useStyles();
  const history = useHistory()
    const handleBook = (type) => {
        history.push(`/book/${type}`);
    }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />

      <CardMedia
        className={classes.media}
        image={room.imgUrl}
        title="Paella dish"
      />
      <img src={`/images/${room.type}.png`} alt=""/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
       
    
        <Button onClick={() => handleBook(room.type)} variant="contained" color="primary">
            Book
        </Button>
      </CardActions>
    </Card>
  );
}
