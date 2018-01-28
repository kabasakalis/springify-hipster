package com.kabasakalis.springify.repository.search;

import com.kabasakalis.springify.domain.Album;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Album entity.
 */
public interface AlbumSearchRepository extends ElasticsearchRepository<Album, Long> {
}
