package com.example.vacationplanner.controller;

import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.model.Vacation;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/vacation")
public class VacationController {

    @Autowired
    private VacationRepository vacationRepository;

    @GetMapping("/all")
    public Iterable<Vacation> findAll(){
        return vacationRepository.findAll();
    }

    @GetMapping("/2")
    public List<String> findAllv(){
        List <String> listos = new ArrayList<>();
        for (int i = 0; i<217; i++){
            if(vacationRepository.findAll().get(i).getText().equalsIgnoreCase("x")){
                listos.add(vacationRepository.findAll().get(i).getEmployee().getFirst_name());
            }
        }
        return listos;
    }
}
