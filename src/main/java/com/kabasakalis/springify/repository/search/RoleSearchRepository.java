package com.kabasakalis.springify.repository.search;

import com.kabasakalis.springify.domain.Role;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Role entity.
 */
public interface RoleSearchRepository extends ElasticsearchRepository<Role, Long> {
}
