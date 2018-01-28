package com.kabasakalis.springify.repository.search;

import com.kabasakalis.springify.domain.Playlist;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Playlist entity.
 */
public interface PlaylistSearchRepository extends ElasticsearchRepository<Playlist, Long> {
}
