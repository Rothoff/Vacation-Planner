package com.example.vacationplanner.repository;

import com.example.vacationplanner.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
