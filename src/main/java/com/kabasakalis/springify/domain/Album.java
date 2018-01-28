package com.kabasakalis.springify.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "album")
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "jhi_year")
    private String year;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "album_playlist",
               joinColumns = @JoinColumn(name="albums_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="playlists_id", referencedColumnName="id"))
    private Set<Playlist> playlists = new HashSet<>();

    @ManyToOne
    private Artist artist;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Album title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public Album year(String year) {
        this.year = year;
        return this;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public Album playlists(Set<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public Album addPlaylist(Playlist playlist) {
        this.playlists.add(playlist);
        playlist.getAlbums().add(this);
        return this;
    }

    public Album removePlaylist(Playlist playlist) {
        this.playlists.remove(playlist);
        playlist.getAlbums().remove(this);
        return this;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }

    public Artist getArtist() {
        return artist;
    }

    public Album artist(Artist artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Album album = (Album) o;
        if (album.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), album.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", year='" + getYear() + "'" +
            "}";
    }
}
