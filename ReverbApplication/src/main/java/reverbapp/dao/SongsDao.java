package reverbapp.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import reverbapp.mappers.SongsMapper;
import reverbapp.models.Songs;

@Repository
public class SongsDao implements SongsMapper {

	@Autowired
	private SqlSessionFactory sessFactory;
	
	@Override
	public Songs saveSong(Songs song) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.insert("saveSong", song);
			sess.commit();
			return song;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public Songs updateSong(String songId, Songs song) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			Map<String, Object> updatedSong = new HashMap<>();
			updatedSong.put("songId", songId);
			updatedSong.put("title", song.getTitle());
			updatedSong.put("artist", song.getArtist());
			updatedSong.put("genre", song.getGenre());
			updatedSong.put("price", song.getPrice());
			updatedSong.put("imageUrl", song.getImageUrl());
			updatedSong.put("mp3Url", song.getMp3Url());
			updatedSong.put("deleted", song.isDeleted());
			sess.update("updateSong", updatedSong);
			sess.commit();
			return song;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;

	}

	@Override
	public String removeSong(String songId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			Map<String, Object> removedSong = new HashMap<>();
			removedSong.put("songId", songId);
			sess.update("removeSong", removedSong);
			sess.commit();
			return songId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public String deleteSong(String songId) {
		SqlSession sess = null;
		try {
			sess = sessFactory.openSession();
			sess.delete("deleteSong", songId);
			sess.commit();
			return songId;
		} catch (Exception e) {
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return null;
	}

	@Override
	public List<Songs> selectAllSongs() {
		SqlSession sess = null;
		List<Songs> songs = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			songs = sess.selectList("selectAllSongs");
		} catch (Exception e) {
			songs = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return songs;
	}

	@Override
	public Songs selectSongBySongId(String songId) {
		SqlSession sess = null;
		Songs song = new Songs();
		try {
			sess = sessFactory.openSession();
			song = sess.selectOne("selectSongBySongId", songId);

		} catch (Exception e) {
			song = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return song;
	}

	@Override
	public List<Songs> selectSongsByTitle(String title) {
		SqlSession sess = null;
		List<Songs> songs = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			songs = sess.selectList("selectSongsByTitle", title);
		} catch (Exception e) {
			songs = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return songs;
	}

	@Override
	public List<Songs> selectSongsByArtist(String artist) {
		SqlSession sess = null;
		List<Songs> songs = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			songs = sess.selectList("selectSongsByArtist", artist);
		} catch (Exception e) {
			songs = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return songs;
	}

	@Override
	public List<Songs> selectSongsByGenre(String genre) {
		SqlSession sess = null;
		List<Songs> songs = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			songs = sess.selectList("selectSongsByGenre", genre);
		} catch (Exception e) {
			songs = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return songs;
	}

	@Override
	public List<Songs> selectSongsByTitleOrArtist(String input) {
		SqlSession sess = null;
		List<Songs> songs = new ArrayList<>();
		try {
			sess = sessFactory.openSession();
			songs = sess.selectList("selectSongsByTitleOrArtist", input);
		} catch (Exception e) {
			songs = null;
			sess.rollback();
			e.printStackTrace();
		} finally {
			sess.close();
		}
		return songs;
	}

}
