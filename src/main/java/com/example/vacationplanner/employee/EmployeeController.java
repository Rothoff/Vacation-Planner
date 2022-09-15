package com.example.vacationplanner.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepo;

    @GetMapping("/employees")
    public String listAll(Model model) {
        List<Employee> listEmployees = employeeRepo.findAll();
        model.addAttribute("listEmployees", listEmployees);
        return "employees";
    }


}
