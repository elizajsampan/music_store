package reverbapp.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import reverbapp.models.Cart;

@Mapper
public interface CartMapper {

	@Insert("insert into cart(cart_id, user_id, song_id) values (#{cartId}, #{userId}, #{songId})")
	public Cart addToCart(Cart cartItem);
	
	@Delete("delete from cart where cart_id = #{cartId}")
	public String removeCartItem(String cartId);
	
	@Delete("delete from cart where user_id = #{userId}")
	public String removeCartItems(String userId);

	@Select("select * from cart c left outer join songs s on c.song_id = s.song_id left outer join users u on c.user_id = u.user_id")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "cartId", column = "cart_id"),
			@Result(property = "songId", column = "song_id"), @Result(property = "userId", column = "user_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Cart> getCartItems();

	@Select("select * from cart c left outer join songs s on c.song_id = s.song_id left outer join users u on c.user_id = u.user_id where c.id = #{id} and s.deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "cartId", column = "cart_id"),
			@Result(property = "songId", column = "song_id"), @Result(property = "userId", column = "user_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public Cart getCartItemById(Integer id);
	
	@Select("select * from cart c left outer join songs s on c.song_id = s.song_id left outer join users u on c.user_id = u.user_id where c.cart_id = #{cartId} and s.deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "cartId", column = "cart_id"),
			@Result(property = "songId", column = "song_id"), @Result(property = "userId", column = "user_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public Cart getCartItemByCartId(String cartId);
	
	@Select("select * from cart c left outer join songs s on c.song_id = s.song_id left outer join users u on c.user_id = u.user_id where c.user_id = #{userId} and s.deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "cartId", column = "cart_id"),
			@Result(property = "songId", column = "song_id"), @Result(property = "userId", column = "user_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Cart> getCartItemsByUserId(String userId);
	
	@Select("select case when count(song_id)>0 then 1 else 0 end result from cart where song_id=#{songId} and user_id=#{userId}")
	public boolean exists(String songId, String userId);
	
	@Select("select case when count(user_id)>0 then 1 else 0 end result from cart where user_id=#{userId}")
	public boolean existsByUserId(String userId);

}
