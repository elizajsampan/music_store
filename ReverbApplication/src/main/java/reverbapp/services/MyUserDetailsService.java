package reverbapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import reverbapp.models.UserPrincipal;
import reverbapp.models.Users;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UsersService service;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = service.selectUserByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException("User not found");
		return new UserPrincipal(user);
	}
}
