package reverbapp.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import reverbapp.models.Songs;

@Mapper
public interface SongsMapper {

	@Insert("insert into songs (song_id, title, artist, genre, price, imageUrl, mp3Url, deleted) values (#{songId}, #{title}, #{artist}, #{genre}, #{price}, #{imageUrl}, #{mp3Url}, #{deleted})")
	public Songs saveSong(Songs song);

	@Update("update songs set title = #{title}, artist = #{artist}, genre=#{genre}, price=#{price}, imageUrl=#{imageUrl}, mp3Url=#{mp3Url} where song_id = #{songId}")
	public Songs updateSong(String songId, Songs song);

	@Update("update songs set deleted = true where song_id = #{songId}")
	public String removeSong(String songId);

	@Delete("delete from songs where song_id = #{songId}")
	public String deleteSong(String songId);

	@Select("select * from songs where deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Songs> selectAllSongs();

	@Select("select * from songs where song_id = #{songId} and deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public Songs selectSongBySongId(String songId);

	@Select("select * from songs where title = #{title} and deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Songs> selectSongsByTitle(String title);

	@Select("select * from songs where artist = #{artist} and deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Songs> selectSongsByArtist(String artist);

	@Select("select * from songs where genre = #{genre} and deleted = false")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Songs> selectSongsByGenre(String genre);

	@Select("select * from songs where deleted = false and title ilike '%' || #{input} || '%' or artist ilike '%' || #{input} || '%'")
	@Results(value = { @Result(property = "id", column = "id"), @Result(property = "songId", column = "song_id"),
			@Result(property = "title", column = "title"), @Result(property = "artist", column = "artist"),
			@Result(property = "genre", column = "genre"), @Result(property = "price", column = "price"),
			@Result(property = "imageUrl", column = "imageUrl"), @Result(property = "mp3Url", column = "mp3Url") })
	public List<Songs> selectSongsByTitleOrArtist(String input);

}
