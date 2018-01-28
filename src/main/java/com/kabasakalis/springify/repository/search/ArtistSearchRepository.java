package com.kabasakalis.springify.repository.search;

import com.kabasakalis.springify.domain.Artist;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Artist entity.
 */
public interface ArtistSearchRepository extends ElasticsearchRepository<Artist, Long> {
}
