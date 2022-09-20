package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepo;


    @GetMapping("/employees")
    public List<Employee> listAll(Model model){
        List<Employee> listEmployees = employeeRepo.findAll();
        model.addAttribute("listEmployees", listEmployees);

        return listEmployees;
    }
}
