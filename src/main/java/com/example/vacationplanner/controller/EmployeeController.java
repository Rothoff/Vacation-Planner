package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepo;

   @GetMapping("/all")
    public Iterable<Employee> findAll(){
        return employeeRepo.findAll();
    }

    @GetMapping("/all/{teamId}")
    public String findByTeamIdTeam (@PathVariable("teamId") int teamId){
       return employeeRepo.findAll().get(teamId).getTeam().getTeam_name();
    }



}
