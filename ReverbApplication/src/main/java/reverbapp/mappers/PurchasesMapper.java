package reverbapp.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import reverbapp.models.Purchases;
import reverbapp.models.Songs;

@Mapper
public interface PurchasesMapper {

	@Insert("insert into purchases(purchase_id, song_id, user_id, title, artist, genre, price, imageUrl,"
			+ " mp3Url, date_purchased, acc_num, card_type) values (#{purchaseId}, #{songId}, #{userId}, "
			+ "#{title}, #{artist}, #{genre}, #{price}, #{imageUrl}, #{mp3Url}, #{datePurchased}, #{accNum}, #{cardType})")
	public Purchases insertPurchaseItem(Purchases purchaseItem);

	@Delete("delete from purchases where purchase_id = #{purchaseId}")
	public String removePurchaseItem(String purchaseId);

	@Delete("delete from purchases where user_id = #{userId}")
	public String removePurchaseItems(String userId);

	@Select("select * from purchases p left outer join users u on p.user_id = u.user_id")
	@Results(value = { @Result(property = "id", column = "id"),
			@Result(property = "purchaseId", column = "purchase_id"), 
			@Result(property = "songId", column = "song_id"),
			@Result(property = "userId", column = "user_id"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "title", column = "title"),
			@Result(property = "artist", column = "artist"), 
			@Result(property = "genre", column = "genre"),
			@Result(property = "price", column = "price"), 
			@Result(property = "imageUrl", column = "imageUrl"),
			@Result(property = "mp3Url", column = "mp3Url"),
			@Result(property = "datePurchased", column = "date_purchased"),
			@Result(property = "accNum", column = "acc_num"),
			@Result(property = "cardType", column = "card_type") })
	public List<Purchases> getPurchaseItems();

	@Select("select * from purchases p left outer join users u on p.user_id = u.user_id where p.user_id = #{userId}")
	@Results(value = { @Result(property = "id", column = "id"),
			@Result(property = "purchaseId", column = "purchase_id"), 
			@Result(property = "songId", column = "song_id"),
			@Result(property = "userId", column = "user_id"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "title", column = "title"),
			@Result(property = "artist", column = "artist"), 
			@Result(property = "genre", column = "genre"),
			@Result(property = "price", column = "price"), 
			@Result(property = "imageUrl", column = "imageUrl"),
			@Result(property = "mp3Url", column = "mp3Url"),
			@Result(property = "datePurchased", column = "date_purchased"),
			@Result(property = "accNum", column = "acc_num"),
			@Result(property = "cardType", column = "card_type") })
	public List<Purchases> getPurchaseItemsByUserId(String userId);

	@Select("select * from purchases p left outer join users u on p.user_id = u.user_id where p.id = #{id}")
	@Results(value = { @Result(property = "id", column = "id"),
			@Result(property = "purchaseId", column = "purchase_id"), 
			@Result(property = "songId", column = "song_id"),
			@Result(property = "userId", column = "user_id"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "title", column = "title"),
			@Result(property = "artist", column = "artist"), 
			@Result(property = "genre", column = "genre"),
			@Result(property = "price", column = "price"), 
			@Result(property = "imageUrl", column = "imageUrl"),
			@Result(property = "mp3Url", column = "mp3Url"),
			@Result(property = "datePurchased", column = "date_purchased"),
			@Result(property = "accNum", column = "acc_num"),
			@Result(property = "cardType", column = "card_type") })
	public Purchases getPurchaseItemById(Integer id);

	@Select("select * from purchases p left outer join users u on p.user_id = u.user_id where p.purchase_id = #{purchaseId}")
	@Results(value = { @Result(property = "id", column = "id"),
			@Result(property = "purchaseId", column = "purchase_id"), 
			@Result(property = "songId", column = "song_id"),
			@Result(property = "userId", column = "user_id"),
			@Result(property = "firstName", column = "first_name"), 
			@Result(property = "lastName", column = "last_name"), 
			@Result(property = "title", column = "title"),
			@Result(property = "artist", column = "artist"), 
			@Result(property = "genre", column = "genre"),
			@Result(property = "price", column = "price"), 
			@Result(property = "imageUrl", column = "imageUrl"),
			@Result(property = "mp3Url", column = "mp3Url"),
			@Result(property = "datePurchased", column = "date_purchased"),
			@Result(property = "accNum", column = "acc_num"),
			@Result(property = "cardType", column = "card_type") })
	public Purchases getPurchaseItemByPurchaseId(String purchaseId);
	
	@Select("select case when count(song_id)>0 then 1 else 0 end result from purchases where song_id=#{songId}")
	public Boolean exists(String songId);

	@Select("select case when count(user_id)>0 then 1 else 0 end result from purchases where user_id=#{userId}")
	public Boolean existsByUserId(String userId);
	
	@Select("select * from from purchases p left outer join users u on p.user_id = u.user_id where p.title ilike '%' || #{input} || '%' or p.artist ilike '%' || #{input} || '%' and user_id=#{userId}")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url"),
			@Result(property = "userId", column = "user_id")})
	public List<Purchases> getPurchasesByTitleOrArtist(String userId, String input);
}
