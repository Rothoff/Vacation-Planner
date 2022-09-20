package com.example.vacationplanner.repository;

import com.example.vacationplanner.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> { }
