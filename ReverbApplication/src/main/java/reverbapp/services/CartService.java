package reverbapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reverbapp.dao.CartDao;
import reverbapp.mappers.CartMapper;
import reverbapp.models.Cart;

@Service
public class CartService implements CartMapper{

	@Autowired
	private CartDao cartDao;

	@Override
	public Cart addToCart(Cart cartItem) {
		return cartDao.addToCart(cartItem);
	}

	@Override
	public String removeCartItem(String cartId) {
		return cartDao.removeCartItem(cartId);
	}

	@Override
	public String removeCartItems(String userId) {
		return cartDao.removeCartItems(userId);
	}

	@Override
	public List<Cart> getCartItems() {
		return cartDao.getCartItems();
	}

	@Override
	public Cart getCartItemById(Integer id) {
		return cartDao.getCartItemById(id);
	}
	
	@Override
	public Cart getCartItemByCartId(String cartId) {
		return cartDao.getCartItemByCartId(cartId);
	}

	@Override
	public List<Cart> getCartItemsByUserId(String userId) {
		return cartDao.getCartItemsByUserId(userId);
	}

	@Override
	public boolean exists(String songId, String userId) {
		return cartDao.exists(songId, userId);
	}

	@Override
	public boolean existsByUserId(String userId) {
		return cartDao.existsByUserId(userId);
	}

}
