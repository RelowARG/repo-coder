import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const CartItem = ({ id, name, price, quantity, onRemove, img }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onRemove(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar src={img} alt={name} variant="rounded" />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              Cantidad: {quantity}
            </Typography>
            <br />
            <Typography component="span" variant="body2" color="text.secondary">
              Subtotal: ${price * quantity}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default CartItem;
