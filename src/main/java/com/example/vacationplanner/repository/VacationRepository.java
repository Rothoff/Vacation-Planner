package com.example.vacationplanner.repository;

import com.example.vacationplanner.model.Vacation;
import com.example.vacationplanner.model.Week;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRepository extends JpaRepository<Vacation, Integer> {}