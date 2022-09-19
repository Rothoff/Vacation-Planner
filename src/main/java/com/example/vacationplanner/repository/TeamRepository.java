package com.example.vacationplanner.repository;

import com.example.vacationplanner.Model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Integer> {}
