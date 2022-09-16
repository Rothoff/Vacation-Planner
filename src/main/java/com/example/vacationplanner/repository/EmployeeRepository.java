package com.example.vacationplanner.repository;

import com.example.vacationplanner.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
