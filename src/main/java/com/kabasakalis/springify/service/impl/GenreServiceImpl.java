package com.kabasakalis.springify.service.impl;

import com.kabasakalis.springify.service.GenreService;
import com.kabasakalis.springify.domain.Genre;
import com.kabasakalis.springify.repository.GenreRepository;
import com.kabasakalis.springify.repository.search.GenreSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Genre.
 */
@Service
@Transactional
public class GenreServiceImpl implements GenreService {

    private final Logger log = LoggerFactory.getLogger(GenreServiceImpl.class);

    private final GenreRepository genreRepository;

    private final GenreSearchRepository genreSearchRepository;

    public GenreServiceImpl(GenreRepository genreRepository, GenreSearchRepository genreSearchRepository) {
        this.genreRepository = genreRepository;
        this.genreSearchRepository = genreSearchRepository;
    }

    /**
     * Save a genre.
     *
     * @param genre the entity to save
     * @return the persisted entity
     */
    @Override
    public Genre save(Genre genre) {
        log.debug("Request to save Genre : {}", genre);
        Genre result = genreRepository.save(genre);
        genreSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the genres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Genre> findAll(Pageable pageable) {
        log.debug("Request to get all Genres");
        return genreRepository.findAll(pageable);
    }

    /**
     * Get one genre by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Genre findOne(Long id) {
        log.debug("Request to get Genre : {}", id);
        return genreRepository.findOne(id);
    }

    /**
     * Delete the genre by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Genre : {}", id);
        genreRepository.delete(id);
        genreSearchRepository.delete(id);
    }

    /**
     * Search for the genre corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Genre> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Genres for query {}", query);
        Page<Genre> result = genreSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
