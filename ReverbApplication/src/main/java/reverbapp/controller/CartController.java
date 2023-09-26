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

import reverbapp.models.Cart;
import reverbapp.models.Users;
import reverbapp.services.CartService;
import reverbapp.services.UsersService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CartController {

	@Autowired
	private UsersService userService;

	@Autowired
	private CartService cartService;

	@PostMapping(value = "/addToCart", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Cart> addToCart(@RequestBody Cart cartItem) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		cartItem.setUserId(currentUser.getUserId());
		return new ResponseEntity<Cart>(cartService.addToCart(cartItem), HttpStatus.OK);
	}

	@DeleteMapping(value = "/cartItem/{cartId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeCartItem(@PathVariable("cartId") String cartId) {
		cartService.removeCartItem(cartId);
		return new ResponseEntity<String>(cartId, HttpStatus.OK);
	}

	@DeleteMapping(value = "/cartItems", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeCartItems(String userId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		cartService.removeCartItems(currentUser.getUserId());
		return new ResponseEntity<String>(currentUser.getUserId(), HttpStatus.OK);
	}

	@GetMapping(value = "/cartItems", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Cart>> getCartItems() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		List<Cart> cartItems = cartService.getCartItemsByUserId(currentUser.getUserId());
		if (cartItems.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Cart>>(cartItems, HttpStatus.OK);
	}

	@GetMapping(value = "/cartItem/{cartId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Cart> getCartItemByCartId(@PathVariable("cartId") String cartId) {
		Cart cartItem = cartService.getCartItemByCartId(cartId);
		if (cartItem == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Cart>(cartItem, HttpStatus.OK);
	}
}
