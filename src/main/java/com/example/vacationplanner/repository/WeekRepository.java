package com.example.vacationplanner.repository;

import com.example.vacationplanner.model.Team;
import com.example.vacationplanner.model.Week;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeekRepository extends JpaRepository<Week, Integer> {}
