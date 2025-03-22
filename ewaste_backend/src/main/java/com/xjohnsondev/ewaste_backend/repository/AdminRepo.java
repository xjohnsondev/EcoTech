package com.xjohnsondev.ewaste_backend.repository;

import com.xjohnsondev.ewaste_backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
    List<Admin> findAllByOrderByIdAsc();

}