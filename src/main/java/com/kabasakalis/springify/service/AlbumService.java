package com.kabasakalis.springify.service;

import com.kabasakalis.springify.domain.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Album.
 */
public interface AlbumService {

    /**
     * Save a album.
     *
     * @param album the entity to save
     * @return the persisted entity
     */
    Album save(Album album);

    /**
     * Get all the albums.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Album> findAll(Pageable pageable);

    /**
     * Get the "id" album.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Album findOne(Long id);

    /**
     * Delete the "id" album.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the album corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Album> search(String query, Pageable pageable);
}
