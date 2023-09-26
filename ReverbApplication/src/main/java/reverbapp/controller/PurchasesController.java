package reverbapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import reverbapp.models.Purchases;
import reverbapp.models.Users;
import reverbapp.services.PurchasesService;
import reverbapp.services.UsersService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PurchasesController {

	@Autowired
	private UsersService userService;

	@Autowired
	private PurchasesService purchaseService;

	@PostMapping(value = "/purchaseItems", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Purchases> addSong(@RequestBody Purchases purchaseItem) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		purchaseItem.setUserId(currentUser.getUserId());
		purchaseItem.setFirstName(currentUser.getFirstName());
		purchaseItem.setLastName(currentUser.getLastName());
		return new ResponseEntity<Purchases>(purchaseService.insertPurchaseItem(purchaseItem), HttpStatus.OK);
	}

	@DeleteMapping(value = "/purchaseItem/{purchaseId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removePurchaseItem(@PathVariable("purchaseId") String purchaseId) {
		purchaseService.removePurchaseItem(purchaseId);
		return new ResponseEntity<String>(purchaseId, HttpStatus.OK);
	}

	@DeleteMapping(value = "/purchaseItems", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removePurchaseItems(String userId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		purchaseService.removePurchaseItems(currentUser.getUserId());
		return new ResponseEntity<String>(userId, HttpStatus.OK);
	}

	@GetMapping(value = "/purchaseItems", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Purchases>> getPurchaseItems() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		List<Purchases> purchaseItems = purchaseService.getPurchaseItemsByUserId(currentUser.getUserId());
		if (purchaseItems.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Purchases>>(purchaseItems, HttpStatus.OK);
	}

	@GetMapping(value = "/purchaseItem/{purchaseId}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Purchases> getPurchaseItemByPurchasesId(@PathVariable("purchaseId") String purchaseId) {
		Purchases purchaseItem = purchaseService.getPurchaseItemByPurchaseId(purchaseId);
		if (purchaseItem == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Purchases>(purchaseItem, HttpStatus.OK);
	}
	
	@GetMapping(value = "/purchaseItems/search/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Purchases>> getSongsByTitleOrArtist(@PathVariable("input") String input) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		List<Purchases> purchases = purchaseService.getPurchasesByTitleOrArtist(currentUser.getUserId(), input);
		if (purchases.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Purchases>>(purchases, HttpStatus.OK);
	}


}
