package com.example.vacationplanner.controller;

import ch.qos.logback.core.joran.conditional.IfAction;
import com.example.vacationplanner.model.Employee;
import com.example.vacationplanner.model.Team;
import com.example.vacationplanner.model.Vacation;
import com.example.vacationplanner.repository.EmployeeRepository;
import com.example.vacationplanner.repository.TeamRepository;
import com.example.vacationplanner.repository.VacationRepository;
import com.example.vacationplanner.repository.WeekRepository;
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
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private WeekRepository weekRepository;

    @GetMapping("/all")
    public Iterable<Vacation> findAll() {
        return vacationRepository.findAll();
    }

    //TODO change api call name
    @GetMapping("/empsonvacperweek")
    public String empsOnVacPerWeek() {
        int numberOfWeeks = weekRepository.findAll().size();
        int numberOfTeams = teamRepository.findAll().size();
        List<Integer>[] arr = new ArrayList[numberOfWeeks];
        int teamMOnVacation = 0;
        for (int week = 0; week < numberOfWeeks; week++) {
            List<Integer> intlist = new ArrayList<>();
            for (int team = 0; team< numberOfTeams; team++) {
                for (Vacation v : vacationRepository.findAll()) {
                    if (v.getWeek().getId() == week + 1 && v.getEmployee().getTeam().getId() == team + 1 && v.getText()!=("") && !v.getText().equalsIgnoreCase("Mngr") && !v.getText().equalsIgnoreCase("PO")){
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


    @GetMapping("/3")
    public String empsPerTeam() {
        ArrayList<Integer> list = new ArrayList<>();
        int count = 0;
        for (int team = 0; team < teamRepository.findAll().size(); team++) {
            for (Employee employee : employeeRepository.findAll()) {
                if (employee.getTeam().getId() == team+1){
                    count++;
                }
            }
            list.add(count);
            count=0;
        }
        String json = new Gson().toJson(list);
        return json;

    }

}

