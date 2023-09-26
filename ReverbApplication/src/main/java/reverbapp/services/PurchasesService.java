package reverbapp.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reverbapp.dao.PurchasesDao;
import reverbapp.mappers.PurchasesMapper;
import reverbapp.models.Purchases;
import reverbapp.models.Songs;

@Service
public class PurchasesService implements PurchasesMapper {

	@Autowired
	private PurchasesDao purchaseDao;

	@Override
	public Purchases insertPurchaseItem(Purchases purchaseItem) {
		purchaseItem.setDatePurchased(LocalDate.now());
		return purchaseDao.insertPurchaseItem(purchaseItem);
	}

	@Override
	public String removePurchaseItem(String purchaseId) {
		return purchaseDao.removePurchaseItem(purchaseId);
	}

	@Override
	public String removePurchaseItems(String userId) {
		return purchaseDao.removePurchaseItems(userId);
	}

	@Override
	public List<Purchases> getPurchaseItems() {
		return purchaseDao.getPurchaseItems();
	}

	@Override
	public List<Purchases> getPurchaseItemsByUserId(String userId) {
		return purchaseDao.getPurchaseItemsByUserId(userId);
	}

	@Override
	public Purchases getPurchaseItemById(Integer id) {
		return purchaseDao.getPurchaseItemById(id);
	}

	@Override
	public Purchases getPurchaseItemByPurchaseId(String purchaseId) {
		return purchaseDao.getPurchaseItemByPurchaseId(purchaseId);
	}

	@Override
	public Boolean exists(String songId) {
		return purchaseDao.exists(songId);
	}

	@Override
	public Boolean existsByUserId(String userId) {
		return purchaseDao.existsByUserId(userId);
	}

	@Override
	public List<Purchases> getPurchasesByTitleOrArtist(String userId, String input) {
		return purchaseDao.getPurchasesByTitleOrArtist(userId, input);
	}

}
