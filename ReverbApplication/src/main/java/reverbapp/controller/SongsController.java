package reverbapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import reverbapp.models.Songs;
import reverbapp.models.Users;
import reverbapp.services.SongsService;
import reverbapp.services.UsersService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SongsController {

	@Autowired
	private SongsService songService;

	@Autowired
	private UsersService userService;
	
	private static final String ADMIN = "admin";
	
	@PostMapping(value = "/songs/new", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Songs> saveSong(@RequestBody Songs song) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		if (currentUser.getRole().equals(ADMIN )) {
			return new ResponseEntity<Songs>(songService.saveSong(song), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping(value = "/songs/{songId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Songs> editSong(@PathVariable("songId") String songId, @RequestBody Songs song) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		if (currentUser.getRole().equals(ADMIN )) {
			return new ResponseEntity<Songs>(songService.updateSong(songId, song), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping(value = "/songs/remove/{songId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> removeSong(@PathVariable("songId") String songId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		if (currentUser.getRole().equals(ADMIN )) {
			songService.removeSong(songId);
			return new ResponseEntity<String>(songId, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping(value = "/songs/delete/{songId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteSong(@PathVariable("songId") String songId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = userService.selectUserByUsername(authentication.getName());
		if (currentUser.getRole().equals(ADMIN )) {
			songService.deleteSong(songId);
			return new ResponseEntity<String>(songId, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping(value = "/songs", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Songs>> list() {
		List<Songs> songs = songService.selectAllSongs();
		if (songs.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Songs>>(songs, HttpStatus.OK);
	}

	@GetMapping(value = "/songs/{songId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Songs> getSong(@PathVariable("songId") String songId) {
		Songs song = songService.selectSongBySongId(songId);
		if (song == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Songs>(song, HttpStatus.OK);
	}

	@GetMapping(value = "/songs/title/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Songs>> getSongsByTitle(@PathVariable("title") String title) {
		List<Songs> song = songService.selectSongsByTitle(title);
		if (song.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Songs>>(song, HttpStatus.OK);
	}

	@GetMapping(value = "/songs/genre/{genre}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Songs>> getSongsByGenre(@PathVariable("genre") String genre) {
		List<Songs> songs = songService.selectSongsByGenre(genre);
		if (songs.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Songs>>(songs, HttpStatus.OK);
	}

	@GetMapping(value = "/songs/artist/{artist}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Songs>> getSongsByArtist(@PathVariable("artist") String artist) {
		List<Songs> songs = songService.selectSongsByArtist(artist);
		if (songs.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Songs>>(songs, HttpStatus.OK);
	}

	@GetMapping(value = "/songs/search/{input}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Songs>> getSongsByTitleOrArtist(@PathVariable("input") String input) {
		List<Songs> songs = songService.selectSongsByTitleOrArtist(input);
		if (songs.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Songs>>(songs, HttpStatus.OK);
	}

}
