package com.example.vacationplanner.repository;

import com.example.vacationplanner.model.Employee;

import java.sql.SQLException;
import java.util.List;

public interface EmployeeRepositoryCustom {

    List<Employee> findByTeamId(String teamId);
    List<String> findByTeamId2(String teamId) throws SQLException;
}
