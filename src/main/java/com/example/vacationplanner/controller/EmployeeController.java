package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepo;

    @Autowired
    private TeamRepository teamRepo;


    @GetMapping("/all")
    public Iterable<Employee> findAll() {
        return employeeRepo.findAll();
    }

    @GetMapping("/all/{teamId}")
    public String findByTeamIdTeam(@PathVariable("teamId") int teamId) {
        return employeeRepo.findAll().get(teamId).getTeam().getTeam_name();
    }

    @GetMapping("/empsteam")
    public List empsPerTeam() {
        ArrayList list = new ArrayList<>();
        int count = 0;
        for (int team = 0; team < 13; team++) {
            for (Employee employee : employeeRepo.findAll()) {
                if (employee.getTeam().getId() == team+1){
                    count++;
                }
            }
            System.out.println(teamRepo.findAll().get(team).getTeam_name());
            System.out.println(count);
            list.add(count);
            count=0;
        }
        return list;

    }
}
