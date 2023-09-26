package reverbapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reverbapp.dao.UsersDao;
import reverbapp.mappers.UsersMapper;
import reverbapp.models.Users;

@Service
public class UsersService implements UsersMapper {

	@Autowired
	private UsersDao userDao;

	@Override
	public Users saveUser(Users user) {
		return userDao.saveUser(user);
	}

	@Override
	public Users updateUser(Integer id, Users user) {
		return userDao.updateUser(id, user);
	}
	
	@Override
	public Integer updatePassword(Integer id, Users user) {
		return userDao.updatePassword(id, user);
	}

	@Override
	public Integer deleteUser(Integer id) {
		return userDao.deleteUser(id);
	}

	@Override
	public List<Users> selectAllUsers() {
		return userDao.selectAllUsers();
	}

	@Override
	public Users selectUserById(Integer id) {
		return userDao.selectUserById(id);
	}
	
	@Override
	public Users selectUserByUserId(String userId){
		return userDao.selectUserByUserId(userId);
	}
	@Override
	public Users selectUserByUsername(String username) {
		return userDao.selectUserByUsername(username);
	}

	@Override
	public Users selectUserByUsernamePassword(String username, String password) {
		return userDao.selectUserByUsernamePassword(username, password);
	}

	@Override
	public Boolean existsByUsername(String username) {
		return userDao.existsByUsername(username);
	}

	@Override
	public Boolean existsByEmail(String email) {
		return userDao.existsByEmail(email);
	}

	@Override
	public Boolean existsByPhone(String phone) {
		return userDao.existsByPhone(phone);
	}

	@Override
	public Boolean existsByCreditCardNum(String creditCardNum) {
		return userDao.existsByCreditCardNum(creditCardNum);
	}

}
