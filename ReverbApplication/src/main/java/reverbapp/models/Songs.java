package reverbapp.models;

public class Songs {

	private Integer id;
	private String songId;
	private String title;
	private String artist;
	private String genre;
	private Float price;
	private String imageUrl;
	private String mp3Url;
	private Boolean deleted;

	public Songs() {

	}

	public Songs(Integer id, String songId, String title, String artist, String genre, Float price, String imageUrl,
			String mp3Url, boolean deleted) {
		this.songId = songId;
		this.title = title;
		this.artist = artist;
		this.genre = genre;
		this.price = price;
		this.imageUrl = imageUrl;
		this.mp3Url = mp3Url;
		this.deleted = deleted;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSongId() {
		return songId;
	}

	public void setSongId(String songId) {
		this.songId = songId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getMp3Url() {
		return mp3Url;
	}

	public void setMp3Url(String mp3Url) {
		this.mp3Url = mp3Url;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}
