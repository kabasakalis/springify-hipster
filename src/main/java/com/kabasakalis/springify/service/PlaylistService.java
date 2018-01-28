package com.kabasakalis.springify.service;

import com.kabasakalis.springify.domain.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Playlist.
 */
public interface PlaylistService {

    /**
     * Save a playlist.
     *
     * @param playlist the entity to save
     * @return the persisted entity
     */
    Playlist save(Playlist playlist);

    /**
     * Get all the playlists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Playlist> findAll(Pageable pageable);

    /**
     * Get the "id" playlist.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Playlist findOne(Long id);

    /**
     * Delete the "id" playlist.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the playlist corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Playlist> search(String query, Pageable pageable);
}
