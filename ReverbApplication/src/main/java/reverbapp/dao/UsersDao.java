package reverbapp.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import reverbapp.mappers.UsersMapper;
import reverbapp.models.Users;

@Repository
public class UsersDao implements UsersMapper {

	@Autowired
	private SqlSessionFactory sessFactory;

	@Override
	public Users saveUser(Users user) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.insert("saveUser", user);
			sess.commit();
			return user;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Users updateUser(Integer id, Users user) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			Map<String, Object> updatedUser = new HashMap<>();
			updatedUser.put("id", id);
			updatedUser.put("userId", user.getUserId());
			updatedUser.put("username", user.getUsername());
			updatedUser.put("password", user.getPassword());
			updatedUser.put("firstName", user.getFirstName());
			updatedUser.put("lastName", user.getLastName());
			updatedUser.put("email", user.getEmail());
			updatedUser.put("phone", user.getPhone());
			updatedUser.put("address", user.getAddress());
			updatedUser.put("role", user.getRole());
			sess.update("updateUser", updatedUser);
			sess.commit();
			return user;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Integer updatePassword(Integer id, Users user) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			Map<String, Object> updatedUser = new HashMap<>();
			updatedUser.put("id", id);
			updatedUser.put("password", user.getPassword());
			sess.update("updatePassword", updatedUser);
			sess.commit();
			return id;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Integer deleteUser(Integer id) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.delete("deleteUser", id);
			sess.commit();
			return id;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Users> selectAllUsers() {
		SqlSession sess = null;
		List<Users> users = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			users = sess.selectList("selectAllUsers");
		} catch (Exception e) {
			users = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return users;
	}

	@Override
	public Users selectUserById(Integer id) {
		SqlSession sess = null;
		Users user = new Users();
		try {
			sess = sessFactory.openSession();
			user = sess.selectOne("selectUserById", id);
		} catch (Exception e) {
			user = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return user;
	}

	@Override
	public Users selectUserByUserId(String userId) {
		SqlSession sess = null;
		Users user = new Users();
		try {
			sess = sessFactory.openSession();
			user = sess.selectOne("selectUserByUserId", userId);
		} catch (Exception e) {
			user = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return user;
	}

	@Override
	public Users selectUserByUsername(String username) {
		SqlSession sess = null;
		Users user = new Users();
		try {
			sess = sessFactory.openSession();
			user = sess.selectOne("selectUserByUsername", username);
		} catch (Exception e) {
			user = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return user;
	}

	@Override
	public Users selectUserByUsernamePassword(String username, String password) {
		SqlSession sess = null;
		Users user = new Users();
		try {
			sess = sessFactory.openSession();
			user = sess.selectOne("selectUserByUsername", username);
		} catch (Exception e) {
			user = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return user;
	}

	@Override
	public Boolean existsByUsername(String username) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("existsByUsername", username);
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
	public Boolean existsByEmail(String email) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("existsByEmail", email);
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
	public Boolean existsByPhone(String phone) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("existsByPhone", phone);
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
	public Boolean existsByCreditCardNum(String creditCardNum) {
		SqlSession sess = null;
		boolean exists = false;
		try {
			sess = sessFactory.openSession();
			exists = sess.selectOne("existsByCreditCardNum", creditCardNum);

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
