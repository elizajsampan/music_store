package reverbapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import reverbapp.dao.SongsDao;
import reverbapp.mappers.SongsMapper;
import reverbapp.models.Songs;

@Service
public class SongsService implements SongsMapper {

	@Autowired
	private SongsDao songDao;

	@Override
	public Songs saveSong(Songs song) {
		song.setDeleted(false);
		return songDao.saveSong(song);
	}

	@Override
	public Songs updateSong(String songId, Songs song) {
		song.setDeleted(false);
		return songDao.updateSong(songId, song);
	}

	@Override
	public String removeSong(String songId) {
		return songDao.removeSong(songId);
	}

	@Override
	public String deleteSong(String songId) {
		return songDao.deleteSong(songId);
	}

	@Override
	public List<Songs> selectAllSongs() {
		return songDao.selectAllSongs();
	}

	@Override
	public Songs selectSongBySongId(String songId) {
		return songDao.selectSongBySongId(songId);
	}

	@Override
	public List<Songs> selectSongsByTitle(String title) {
		return songDao.selectSongsByTitle(title);
	}

	@Override
	public List<Songs> selectSongsByArtist(String artist) {
		return songDao.selectSongsByArtist(artist);
	}

	@Override
	public List<Songs> selectSongsByGenre(String genre) {
		return songDao.selectSongsByGenre(genre);
	}

	@Override
	public List<Songs> selectSongsByTitleOrArtist(String input) {
		return songDao.selectSongsByTitleOrArtist(input);
	}

}
