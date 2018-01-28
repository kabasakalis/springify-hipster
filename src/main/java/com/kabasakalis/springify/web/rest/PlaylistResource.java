package com.kabasakalis.springify.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kabasakalis.springify.domain.Playlist;
import com.kabasakalis.springify.service.PlaylistService;
import com.kabasakalis.springify.web.rest.errors.BadRequestAlertException;
import com.kabasakalis.springify.web.rest.util.HeaderUtil;
import com.kabasakalis.springify.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Playlist.
 */
@RestController
@RequestMapping("/api")
public class PlaylistResource {

    private final Logger log = LoggerFactory.getLogger(PlaylistResource.class);

    private static final String ENTITY_NAME = "playlist";

    private final PlaylistService playlistService;

    public PlaylistResource(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    /**
     * POST  /playlists : Create a new playlist.
     *
     * @param playlist the playlist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new playlist, or with status 400 (Bad Request) if the playlist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/playlists")
    @Timed
    public ResponseEntity<Playlist> createPlaylist(@Valid @RequestBody Playlist playlist) throws URISyntaxException {
        log.debug("REST request to save Playlist : {}", playlist);
        if (playlist.getId() != null) {
            throw new BadRequestAlertException("A new playlist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Playlist result = playlistService.save(playlist);
        return ResponseEntity.created(new URI("/api/playlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /playlists : Updates an existing playlist.
     *
     * @param playlist the playlist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated playlist,
     * or with status 400 (Bad Request) if the playlist is not valid,
     * or with status 500 (Internal Server Error) if the playlist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/playlists")
    @Timed
    public ResponseEntity<Playlist> updatePlaylist(@Valid @RequestBody Playlist playlist) throws URISyntaxException {
        log.debug("REST request to update Playlist : {}", playlist);
        if (playlist.getId() == null) {
            return createPlaylist(playlist);
        }
        Playlist result = playlistService.save(playlist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, playlist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /playlists : get all the playlists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of playlists in body
     */
    @GetMapping("/playlists")
    @Timed
    public ResponseEntity<List<Playlist>> getAllPlaylists(Pageable pageable) {
        log.debug("REST request to get a page of Playlists");
        Page<Playlist> page = playlistService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/playlists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /playlists/:id : get the "id" playlist.
     *
     * @param id the id of the playlist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the playlist, or with status 404 (Not Found)
     */
    @GetMapping("/playlists/{id}")
    @Timed
    public ResponseEntity<Playlist> getPlaylist(@PathVariable Long id) {
        log.debug("REST request to get Playlist : {}", id);
        Playlist playlist = playlistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(playlist));
    }

    /**
     * DELETE  /playlists/:id : delete the "id" playlist.
     *
     * @param id the id of the playlist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/playlists/{id}")
    @Timed
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        log.debug("REST request to delete Playlist : {}", id);
        playlistService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/playlists?query=:query : search for the playlist corresponding
     * to the query.
     *
     * @param query the query of the playlist search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/playlists")
    @Timed
    public ResponseEntity<List<Playlist>> searchPlaylists(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Playlists for query {}", query);
        Page<Playlist> page = playlistService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/playlists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
