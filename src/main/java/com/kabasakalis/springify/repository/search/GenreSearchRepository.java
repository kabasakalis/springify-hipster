package com.kabasakalis.springify.repository.search;

import com.kabasakalis.springify.domain.Genre;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Genre entity.
 */
public interface GenreSearchRepository extends ElasticsearchRepository<Genre, Long> {
}
