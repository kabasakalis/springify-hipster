package com.kabasakalis.springify.service.impl;

import com.kabasakalis.springify.service.AlbumService;
import com.kabasakalis.springify.domain.Album;
import com.kabasakalis.springify.repository.AlbumRepository;
import com.kabasakalis.springify.repository.search.AlbumSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Album.
 */
@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {

    private final Logger log = LoggerFactory.getLogger(AlbumServiceImpl.class);

    private final AlbumRepository albumRepository;

    private final AlbumSearchRepository albumSearchRepository;

    public AlbumServiceImpl(AlbumRepository albumRepository, AlbumSearchRepository albumSearchRepository) {
        this.albumRepository = albumRepository;
        this.albumSearchRepository = albumSearchRepository;
    }

    /**
     * Save a album.
     *
     * @param album the entity to save
     * @return the persisted entity
     */
    @Override
    public Album save(Album album) {
        log.debug("Request to save Album : {}", album);
        Album result = albumRepository.save(album);
        albumSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the albums.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Album> findAll(Pageable pageable) {
        log.debug("Request to get all Albums");
        return albumRepository.findAll(pageable);
    }

    /**
     * Get one album by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Album findOne(Long id) {
        log.debug("Request to get Album : {}", id);
        return albumRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the album by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Album : {}", id);
        albumRepository.delete(id);
        albumSearchRepository.delete(id);
    }

    /**
     * Search for the album corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Album> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Albums for query {}", query);
        Page<Album> result = albumSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
