package com.kabasakalis.springify.repository;

import com.kabasakalis.springify.domain.Artist;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Artist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

}
