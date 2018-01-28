package com.kabasakalis.springify.service;

import com.kabasakalis.springify.domain.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Artist.
 */
public interface ArtistService {

    /**
     * Save a artist.
     *
     * @param artist the entity to save
     * @return the persisted entity
     */
    Artist save(Artist artist);

    /**
     * Get all the artists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Artist> findAll(Pageable pageable);

    /**
     * Get the "id" artist.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Artist findOne(Long id);

    /**
     * Delete the "id" artist.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the artist corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Artist> search(String query, Pageable pageable);
}
