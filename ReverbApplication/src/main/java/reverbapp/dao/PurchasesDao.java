package reverbapp.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import reverbapp.mappers.PurchasesMapper;
import reverbapp.models.Purchases;
import reverbapp.models.Songs;

@Repository
public class PurchasesDao implements PurchasesMapper {

	@Autowired
	private SqlSessionFactory sessFactory;

	@Override
	public Purchases insertPurchaseItem(Purchases purchaseItem) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			Map<String, Object> newPurchaseItem = new HashMap<>();
			newPurchaseItem.put("purchaseId", purchaseItem.getPurchaseId());
			newPurchaseItem.put("userId", purchaseItem.getUserId());
			newPurchaseItem.put("firstName", purchaseItem.getFirstName());
			newPurchaseItem.put("lastName", purchaseItem.getLastName());
			newPurchaseItem.put("accNum", purchaseItem.getAccNum());
			newPurchaseItem.put("datePurchased", purchaseItem.getDatePurchased());
			newPurchaseItem.put("cardType", purchaseItem.getCardType());
			newPurchaseItem.put("songId", purchaseItem.getSongId());
			newPurchaseItem.put("title", purchaseItem.getTitle());
			newPurchaseItem.put("artist", purchaseItem.getArtist());
			newPurchaseItem.put("genre", purchaseItem.getGenre());
			newPurchaseItem.put("price", purchaseItem.getPrice());
			newPurchaseItem.put("imageUrl", purchaseItem.getImageUrl());
			newPurchaseItem.put("mp3Url", purchaseItem.getMp3Url());
			sess.insert("insertPurchaseItem", purchaseItem);
			sess.commit();
			return purchaseItem;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public String removePurchaseItem(String purchaseId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.delete("removePurchaseItem", purchaseId);
			sess.commit();
			return purchaseId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public String removePurchaseItems(String userId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();

			sess.delete("removePurchaseItems", userId);
			sess.commit();
			return userId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return userId;
	}

	@Override
	public List<Purchases> getPurchaseItems() {
		SqlSession sess = null;
		List<Purchases> purchaseItems = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			purchaseItems = sess.selectList("getPurchaseItems");
			return purchaseItems;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}


	@Override
	public List<Purchases> getPurchaseItemsByUserId(String userId) {
		SqlSession sess = null;
		List<Purchases> purchaseItems = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			purchaseItems = sess.selectList("getPurchaseItemsByUserId", userId);
			return purchaseItems;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Purchases getPurchaseItemById(Integer id) {
		SqlSession sess = null;
		Purchases purchaseItem = new Purchases();
		try {
			sess = sessFactory.openSession();
			purchaseItem = sess.selectOne("getPurchaseItemById", id);
			return purchaseItem;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Purchases getPurchaseItemByPurchaseId(String purchaseId) {
		SqlSession sess = null;
		Purchases purchaseItem = new Purchases();
		try {
			sess = sessFactory.openSession();
			purchaseItem = sess.selectOne("getPurchaseItemByPurchaseId", purchaseId);
			return purchaseItem;
		} catch (Exception e) {
			purchaseItem = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Boolean exists(String songId) {
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
	public Boolean existsByUserId(String userId) {
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

	@Override
	public List<Purchases> getPurchasesByTitleOrArtist(String userId, String input) {
		SqlSession sess = null;
		List<Purchases> purchases = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			purchases = sess.selectList("getPurchasesByTitleOrArtist", input);
		} catch (Exception e) {
			purchases = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return purchases;
	}

}
