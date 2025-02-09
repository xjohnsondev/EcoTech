package com.xjohnsondev.ewaste_backend.repository;

import com.xjohnsondev.ewaste_backend.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CenterRepo extends JpaRepository<Center, Long> {
    List<Center> findAllByOrderByIdAsc();
    List<Center> findByStatus(String status);
    List<Center> findByStatusOrderByIdAsc(String status);
}
