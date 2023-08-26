package com.brickedsoft.flourishApi.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brickedsoft.flourishApi.models.ApplicationUser;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer>{
   Optional<ApplicationUser> findByUsername(String username);
}
