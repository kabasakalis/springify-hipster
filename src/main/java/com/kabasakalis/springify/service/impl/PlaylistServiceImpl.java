package com.kabasakalis.springify.service.impl;

import com.kabasakalis.springify.service.PlaylistService;
import com.kabasakalis.springify.domain.Playlist;
import com.kabasakalis.springify.repository.PlaylistRepository;
import com.kabasakalis.springify.repository.search.PlaylistSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Playlist.
 */
@Service
@Transactional
public class PlaylistServiceImpl implements PlaylistService {

    private final Logger log = LoggerFactory.getLogger(PlaylistServiceImpl.class);

    private final PlaylistRepository playlistRepository;

    private final PlaylistSearchRepository playlistSearchRepository;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, PlaylistSearchRepository playlistSearchRepository) {
        this.playlistRepository = playlistRepository;
        this.playlistSearchRepository = playlistSearchRepository;
    }

    /**
     * Save a playlist.
     *
     * @param playlist the entity to save
     * @return the persisted entity
     */
    @Override
    public Playlist save(Playlist playlist) {
        log.debug("Request to save Playlist : {}", playlist);
        Playlist result = playlistRepository.save(playlist);
        playlistSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the playlists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Playlist> findAll(Pageable pageable) {
        log.debug("Request to get all Playlists");
        return playlistRepository.findAll(pageable);
    }

    /**
     * Get one playlist by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Playlist findOne(Long id) {
        log.debug("Request to get Playlist : {}", id);
        return playlistRepository.findOne(id);
    }

    /**
     * Delete the playlist by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Playlist : {}", id);
        playlistRepository.delete(id);
        playlistSearchRepository.delete(id);
    }

    /**
     * Search for the playlist corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Playlist> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Playlists for query {}", query);
        Page<Playlist> result = playlistSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
