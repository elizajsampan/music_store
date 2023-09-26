package reverbapp.models;

import java.time.LocalDate;

public class Purchases {

	private Integer id;
	private String purchaseId;
	private String songId;
	private String userId;
	private String firstName;
	private String lastName;
	private String title;
	private String artist;
	private String genre;
	private Float price;
	private String imageUrl;
	private String mp3Url;
	private LocalDate datePurchased;
	private String accNum;
	private String cardType;

	public Purchases() {
	}

	public Purchases(Integer id, String purchaseId, String songId, String userId, String firstName, String lastName,
			String title, String artist, String genre, Float price, String imageUrl, String mp3Url,
			LocalDate datePurchased, String accNum, String cardType) {
		super();
		this.id = id;
		this.purchaseId = purchaseId;
		this.songId = songId;
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.title = title;
		this.artist = artist;
		this.genre = genre;
		this.price = price;
		this.imageUrl = imageUrl;
		this.mp3Url = mp3Url;
		this.datePurchased = datePurchased;
		this.accNum = accNum;
		this.cardType = cardType;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getSongId() {
		return songId;
	}

	public void setSongId(String songId) {
		this.songId = songId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public LocalDate getDatePurchased() {
		return datePurchased;
	}

	public void setDatePurchased(LocalDate datePurchased) {
		this.datePurchased = datePurchased;
	}

	public String getAccNum() {
		return accNum;
	}

	public void setAccNum(String accNum) {
		this.accNum = accNum;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

}
