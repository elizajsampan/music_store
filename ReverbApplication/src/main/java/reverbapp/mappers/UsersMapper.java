package reverbapp.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import reverbapp.models.Users;

@Mapper
public interface UsersMapper {

	@Insert("insert into users (user_id, username, password, first_name, last_name, email, phone, address, role) values (#{userId}, #{username}, #{password}, #{firstName}, #{lastName}, #{email}, #{phone}, #{address}, #{role})")
	public Users saveUser(Users user);

	@Update("update users set user_id= #{userId}, username = #{username}, "
			+ "password = #{password}, first_name = #{firstName}, last_name = #{lastName}, "
			+ "email = #{email}, phone = #{phone}, address = #{address}, role = #{role} where id = #{id}")
	public Users updateUser(Integer id, Users user);
	
	@Update("update users set password = #{password} where id = #{id}")
	public Integer updatePassword(Integer id, Users user);

	@Delete("delete from users where id = #{id}")
	public Integer deleteUser(Integer id);

	@Select("select * from users")
	@Results(value = { @Result(property = "id", column = "id"), 
			@Result(property = "userId", column = "user_id"),
			@Result(property = "username", column = "username"), 
			@Result(property = "password", column = "password"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "email", column = "email"),
			@Result(property = "phone", column = "phone"), 
			@Result(property = "address", column = "address"),
			@Result(property = "role", column = "role") })
	public List<Users> selectAllUsers();

	@Select("select * from users where id = #{id}")
	@Results(value = { @Result(property = "id", column = "id"), 
			@Result(property = "userId", column = "user_id"),
			@Result(property = "username", column = "username"), 
			@Result(property = "password", column = "password"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "email", column = "email"),
			@Result(property = "phone", column = "phone"), 
			@Result(property = "address", column = "address"),
			@Result(property = "role", column = "role") })
	public Users selectUserById(Integer id);
	
	@Select("select * from users where user_id = #{userId}")
	@Results(value = { @Result(property = "id", column = "id"), 
			@Result(property = "userId", column = "user_id"),
			@Result(property = "username", column = "username"), 
			@Result(property = "password", column = "password"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "email", column = "email"),
			@Result(property = "phone", column = "phone"), 
			@Result(property = "address", column = "address"),
			@Result(property = "role", column = "role") })
	public Users selectUserByUserId(String userId);

	@Select("select * from users where username = #{username}")
	@Results(value = { @Result(property = "id", column = "id"), 
			@Result(property = "userId", column = "user_id"),
			@Result(property = "username", column = "username"), 
			@Result(property = "password", column = "password"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "email", column = "email"),
			@Result(property = "phone", column = "phone"), 
			@Result(property = "address", column = "address"),
			@Result(property = "role", column = "role") })
	public Users selectUserByUsername(String username);

	@Select("select * from users where username = #{username} and password = #{password}")
	@Results(value = { @Result(property = "id", column = "id"), 
			@Result(property = "userId", column = "user_id"),
			@Result(property = "username", column = "username"), 
			@Result(property = "password", column = "password"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "email", column = "email"),
			@Result(property = "phone", column = "phone"), 
			@Result(property = "address", column = "address"),
			@Result(property = "role", column = "role") })
	public Users selectUserByUsernamePassword(String username, String password);

	@Select("select case when count(username)>0 then 1 else 0 end result from users where username=#{username}")
	public Boolean existsByUsername(String username);

	@Select("select case when count(email)>0 then 1 else 0 end result from users where email=#{email}")
	public Boolean existsByEmail(String email);

	@Select("select case when count(phone)>0 then 1 else 0 end result from users where phone=#{phone}")
	public Boolean existsByPhone(String phone);

	@Select("select case when count(credit_card_num)>0 then 1 else 0 end result from users where credit_card_num=#{creditCardNum}")
	public Boolean existsByCreditCardNum(String creditCardNum);

}
