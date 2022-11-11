package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.model.Week;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.WeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WeekController {
    @Autowired
    private WeekRepository weekRepo;

    @GetMapping("/weeks")
    public List<Week> listAll(Model model) {
        List<Week> listweeks = weekRepo.findAll();
        model.addAttribute("listEmployees", listweeks);
        return listweeks;
    }
}
