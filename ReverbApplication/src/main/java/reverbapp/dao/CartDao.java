package reverbapp.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import reverbapp.mappers.CartMapper;
import reverbapp.models.Cart;

@Repository
public class CartDao implements CartMapper{

	@Autowired
	private SqlSessionFactory sessFactory;
	
	@Override
	public Cart addToCart(Cart cartItem) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.insert("addToCart", cartItem);
			sess.commit();
			return cartItem;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public String removeCartItem(String cartId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.delete("removeCartItem", cartId);
			sess.commit();
			return cartId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public String removeCartItems(String userId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.delete("removeCartItems", userId);
			sess.commit();
			return userId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public List<Cart> getCartItems() {
		SqlSession sess = null;
		List<Cart> cartItems = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			cartItems = sess.selectList("getCartItems");
		} catch (Exception e) {
			cartItems = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return cartItems;
	}

	@Override
	public Cart getCartItemById(Integer id) {
		SqlSession sess = null;
		Cart cartItem = new Cart();
		try {
			sess = sessFactory.openSession();
			cartItem = sess.selectOne("getCartItemById", id);
		} catch (Exception e) {
			cartItem = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return cartItem;
	}

	@Override
	public Cart getCartItemByCartId(String cartId) {
		SqlSession sess = null;
		Cart cartItem = new Cart();
		try {
			sess = sessFactory.openSession();
			cartItem = sess.selectOne("getCartItemByCartId", cartId);
		} catch (Exception e) {
			cartItem = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return cartItem;
	}

	@Override
	public List<Cart> getCartItemsByUserId(String userId) {
		SqlSession sess = null;
		List<Cart> cartItems = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			cartItems = sess.selectList("getCartItemsByUserId", userId);
		} catch (Exception e) {
			cartItems = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return cartItems;
	}

	@Override
	public boolean exists(String songId, String userId) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("exists", songId);
			return exists;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return exists;
	}

	@Override
	public boolean existsByUserId(String userId) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("exists", userId);
			return exists;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return exists;
	}

}
