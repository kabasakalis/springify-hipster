package com.kabasakalis.springify.service.impl;

import com.kabasakalis.springify.service.ArtistService;
import com.kabasakalis.springify.domain.Artist;
import com.kabasakalis.springify.repository.ArtistRepository;
import com.kabasakalis.springify.repository.search.ArtistSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Artist.
 */
@Service
@Transactional
public class ArtistServiceImpl implements ArtistService {

    private final Logger log = LoggerFactory.getLogger(ArtistServiceImpl.class);

    private final ArtistRepository artistRepository;

    private final ArtistSearchRepository artistSearchRepository;

    public ArtistServiceImpl(ArtistRepository artistRepository, ArtistSearchRepository artistSearchRepository) {
        this.artistRepository = artistRepository;
        this.artistSearchRepository = artistSearchRepository;
    }

    /**
     * Save a artist.
     *
     * @param artist the entity to save
     * @return the persisted entity
     */
    @Override
    public Artist save(Artist artist) {
        log.debug("Request to save Artist : {}", artist);
        Artist result = artistRepository.save(artist);
        artistSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the artists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Artist> findAll(Pageable pageable) {
        log.debug("Request to get all Artists");
        return artistRepository.findAll(pageable);
    }

    /**
     * Get one artist by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Artist findOne(Long id) {
        log.debug("Request to get Artist : {}", id);
        return artistRepository.findOne(id);
    }

    /**
     * Delete the artist by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Artist : {}", id);
        artistRepository.delete(id);
        artistSearchRepository.delete(id);
    }

    /**
     * Search for the artist corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Artist> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Artists for query {}", query);
        Page<Artist> result = artistSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
