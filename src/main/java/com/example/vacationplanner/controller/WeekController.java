package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.model.Week;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.WeekRepository;
import com.google.gson.Gson;
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
    public String listAll(Model model) {
        List<Week> listWeeks = weekRepo.findAll();
        model.addAttribute("listEmployees", listWeeks);
        String json = new Gson().toJson(listWeeks);
        return json;
    }
}
