package com.example.vacationplanner.controller;

import ch.qos.logback.core.joran.conditional.IfAction;
import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.model.Team;
import com.example.vacationplanner.model.Vacation;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.VacationRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import org.jooq.tools.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.jooq.impl.DSL.count;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/vacation")
@EnableAutoConfiguration(exclude = {org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration.class})
public class VacationController {

    @Autowired
    private VacationRepository vacationRepository;

    @GetMapping("/all")
    public Iterable<Vacation> findAll() {
        return vacationRepository.findAll();
    }

    @GetMapping("/2")
    public String findAllv() {
        List<Integer>[] arr = new ArrayList[21];
        int teamMOnVacation = 0;
        for (int week = 0; week < 21; week++) {
            List<Integer> intlist = new ArrayList<>();
            for (int team = 0; team< 13; team++) {
                for (Vacation v : vacationRepository.findAll()) {
                    if (v.getWeek().getId() == week + 1 && v.getEmployee().getTeam().getId() == team + 1 && v.getText().equalsIgnoreCase("x")) {
                        teamMOnVacation++;
                    }
                }
                intlist.add(teamMOnVacation);
                teamMOnVacation=0;
            }
            arr[week] = intlist;
        }

        String json = new Gson().toJson(arr);
        return json;
    }
}

