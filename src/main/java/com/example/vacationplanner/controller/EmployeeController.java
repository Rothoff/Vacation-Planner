package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.EmployeeRepositoryCustom;
import com.example.vacationplanner.repository.TeamRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepo;
    @Autowired
    private TeamRepository teamRepository;

    private EmployeeRepositoryCustom employeeRepoCustom;

   @GetMapping("/all")
    public Iterable<Employee> oneemp(){
        return employeeRepo.findAll();
    }

    @GetMapping("/team/{teamId}")
    public List <Employee> findByTeamId (@PathVariable("teamId") String teamId){
       return employeeRepo.findByTeamId(teamId);
    }

    @GetMapping("/team2/{teamId}")
    public String findByTeamIdTeam (@PathVariable("teamId") int teamId){
       return teamRepository.findAll().get(teamId).getTeam_name();
    }

    @GetMapping("/team3/{teamId}")
    public List <String> findByTeamId2 (@PathVariable("teamId") String teamId) throws SQLException {
        return employeeRepo.findByTeamId2(teamId);
    }

}
