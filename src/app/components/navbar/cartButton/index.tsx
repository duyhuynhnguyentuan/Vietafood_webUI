
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { open } from '../../State/Slice/CheckOutSlice';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#F8bc7c',
    // backgroundColor: '#e2bea9,
    // color: '#44b700',
  },
}));

export function CustomizedBadges(){
  const dispatch = useDispatch()
  return (
    <IconButton aria-label="cart" onClick={()=> dispatch(open())}>
      <StyledBadge badgeContent={1} color="primary">
        <ShoppingCartIcon style={{ color: '#fff' }} />
      </StyledBadge>
    </IconButton>
  );
}
