package reverbapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import reverbapp.models.AuthenticationRequest;
import reverbapp.models.AuthenticationResponse;
import reverbapp.models.Users;
import reverbapp.services.MyUserDetailsService;
import reverbapp.services.UsersService;
import reverbapp.util.JwtUtil;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;

	@Autowired
	public UsersService userService;

	@PostMapping(value = "/register", consumes = { "*/*" })
	public ResponseEntity<Users> registerUser(@RequestBody Users user) {
		if (userService.existsByUsername(user.getUsername()) || userService.existsByEmail(user.getUsername())
				|| userService.existsByPhone(user.getPhone())
				|| user.getUsername() == null
				|| user.getPassword() == null 
				|| user.getFirstName() == null
				|| user.getLastName() == null 
				|| user.getEmail() == null
				|| user.getPhone() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ResponseEntity<Users>(userService.saveUser(user), HttpStatus.CREATED);
	}

	@PostMapping(value = "/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	@GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Users> getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		return new ResponseEntity<Users>(currentUser, HttpStatus.OK);
	}

	@PutMapping(value = "/editprofile", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Users> editProfile(@RequestBody Users user) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		user.setUserId(currentUser.getUserId());
		user.setUsername(currentUser.getUsername());
		user.setPassword(currentUser.getPassword());
		if (user.getFirstName() == null || user.getLastName() == null
				|| user.getEmail() == null || user.getPhone() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Users>(userService.updateUser(currentUser.getId(), user), HttpStatus.OK);
	}

	@PutMapping(value = "/editpassword", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Integer> editPassword(@RequestBody Users user) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userService.updatePassword(currentUser.getId(), user);
		return new ResponseEntity<Integer>(currentUser.getId(), HttpStatus.OK);
	}

}
